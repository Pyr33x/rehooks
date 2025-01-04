mod hook;
use hook::Hook;
use regex::Regex;
use std::fs::{self, OpenOptions};
use std::io::Write;
use std::path::Path;

pub fn import_hooks_from_src(src_dir: &str) -> Result<Vec<Hook>, String> {
    let mut entries: Vec<_> = fs::read_dir(src_dir)
        .map_err(|e| e.to_string())?
        .filter_map(Result::ok)
        .collect();

    entries.sort_by_key(|entry| entry.file_name());

    let hooks: Result<Vec<Hook>, _> = entries
        .into_iter()
        .enumerate()
        .filter_map(|(id, entry)| {
            let path = entry.path();
            if path.is_dir() {
                let title = path.file_name()?.to_str()?.to_string();
                let index_path = path.join("index.ts");

                if index_path.exists() {
                    let content = fs::read_to_string(&index_path).ok()?;
                    let description = extract_description(&content).ok()?;

                    return Some(Ok(Hook {
                        id: (id - 1) as u16,
                        title,
                        content,
                        description,
                    }));
                }
            }
            None
        })
        .collect();

    hooks
}

fn extract_description(content: &str) -> Result<String, String> {
    let re = Regex::new(r#"const description\s*=\s*"([^"]+)";"#).map_err(|e| e.to_string())?;
    re.captures(content)
        .map(|captures| captures[1].to_string())
        .ok_or_else(|| "No description found for the hook".to_string())
}

fn ensure_directory_exists(path: &Path) -> Result<(), String> {
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent).map_err(|e| e.to_string())?;
    }
    Ok(())
}

pub fn write_hooks_to_json(hooks: Vec<Hook>, output_path: &str) -> Result<(), String> {
    ensure_directory_exists(Path::new(output_path))?;

    let json_content = serde_json::to_string_pretty(&hooks).map_err(|e| e.to_string())?;
    let mut file = OpenOptions::new()
        .write(true)
        .create(true)
        .truncate(true)
        .open(output_path)
        .map_err(|e| e.to_string())?;

    file.write_all(json_content.as_bytes())
        .map_err(|e| e.to_string())
}
