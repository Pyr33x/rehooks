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

    let mut hooks = Vec::new();
    let mut id_counter = 1;

    for entry in entries {
        let path = entry.path();
        if path.is_dir() {
            let title = path
                .file_name()
                .and_then(|name| name.to_str().map(String::from))
                .ok_or_else(|| "Invalid directory name".to_string())?;
            let index_path = path.join("index.ts");

            if index_path.exists() {
                let content = fs::read_to_string(&index_path).map_err(|e| e.to_string())?;
                let description = extract_description(&content)?;

                // Remove the description line from the content
                let cleaned_content = remove_description_line(&content);

                hooks.push(Hook {
                    id: id_counter,
                    title,
                    content: cleaned_content,
                    description,
                });

                id_counter += 1;
            }
        }
    }

    Ok(hooks)
}

fn extract_description(content: &str) -> Result<String, String> {
    let re = Regex::new(r#"const description\s*=\s*"([^"]+)";"#).map_err(|e| e.to_string())?;
    re.captures(content)
        .map(|captures| captures[1].to_string())
        .ok_or_else(|| "No description found for the hook".to_string())
}

fn remove_description_line(content: &str) -> String {
    let re = Regex::new(r#"(?m)^const description\s*=\s*"[^"]+";\s*$"#).unwrap();
    re.replace_all(content, "").to_string()
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
