mod checker;
mod finder;

use checker::{check_hook_health, report_health};
use finder::find_index_files;
use std::fs;
use std::path::Path;

fn check_hooks_health(hook_directory: &str) -> Vec<checker::HookHealth> {
    let index_files = find_index_files(hook_directory);
    let mut health_reports = Vec::new();

    for file in index_files {
        let hook_code = fs::read_to_string(&file).expect("Unable to read file");
        let title = Path::new(&file)
            .parent()
            .and_then(|p| p.file_name())
            .and_then(|n| n.to_str())
            .unwrap_or("Unknown Hook");

        let health = check_hook_health(&hook_code, title);
        health_reports.push(health);
    }

    health_reports
}

fn main() {
    let hook_directory = "../../packages/core/src";
    let health_reports = check_hooks_health(hook_directory);
    report_health(health_reports);
}
