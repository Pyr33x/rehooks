use importer::{import_hooks_from_src, write_hooks_to_json};

fn main() {
    let src_directory = "../core/src";
    let output_path = "../../apps/docs/lib/hooks.json";

    match import_hooks_from_src(src_directory) {
        Ok(mut hooks) => {
            hooks.sort_by(|a, b| a.title.cmp(&b.title));
            match write_hooks_to_json(hooks, output_path) {
                Ok(_) => println!("Hooks successfully written to {}", output_path),
                Err(e) => eprintln!("Error writing hooks to JSON: {}", e),
            }
        }
        Err(e) => eprintln!("Error importing hooks: {}", e),
    }
}
