use walkdir::WalkDir;

pub fn find_index_files(dir: &str) -> Vec<String> {
    let mut results = Vec::new();

    for entry in WalkDir::new(dir).min_depth(1).max_depth(1) {
        let entry = entry.unwrap();
        if entry.file_type().is_dir() {
            let index_path = entry.path().join("index.ts");
            if index_path.exists() {
                results.push(index_path.to_string_lossy().to_string());
            } else {
                println!("Warning: No index.ts found in {:?}", entry.path());
            }
        }
    }
    results
}
