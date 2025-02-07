use importer::{import_hooks_from_src, write_hooks_to_json};

fn main() {
    let react_dir = "../../packages/core/src/react";
    let next_dir = "../../packages/core/src/next";


    let react_output_path = "../../apps/api/react.json";
    let next_output_path = "../../apps/api/next.json";


    match import_hooks_from_src(react_dir, next_dir) {
        Ok((react_hooks, next_hooks)) => {
            let mut sorted_react_hooks = react_hooks;
            sorted_react_hooks.sort_by(|a, b| a.title.cmp(&b.title));

            let mut sorted_next_hooks = next_hooks;
            sorted_next_hooks.sort_by(|a, b| a.title.cmp(&b.title));

            match write_hooks_to_json(sorted_react_hooks, react_output_path) {
                Ok(_) => println!("React hooks successfully written to {}", react_output_path),
                Err(e) => eprintln!("Error writing React hooks to JSON: {}", e),
            }

            match write_hooks_to_json(sorted_next_hooks, next_output_path) {
                Ok(_) => println!("Next hooks successfully written to {}", next_output_path),
                Err(e) => eprintln!("Error writing Next hooks to JSON: {}", e),
            }
        }
        Err(e) => eprintln!("Error importing hooks: {}", e),
    }
}