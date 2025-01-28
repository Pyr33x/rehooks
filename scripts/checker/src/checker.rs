use colored::*;

#[derive(Debug)]
pub struct HookHealth {
    pub title: String,
    pub is_healthy: bool,
    pub issues: Vec<String>,
}

pub fn check_hook_health(hook_code: &str, title: &str) -> HookHealth {
    let mut issues = Vec::new();
    let export_function_count = hook_code.matches("export function").count();
    let use_function_count = hook_code.matches("export function use").count();

    if !hook_code.contains("const description") {
        issues.push("Missing constant description".to_string());
    }

    if export_function_count == 0 {
        issues.push("No exported functions found".to_string());
    }

    if use_function_count == 0 {
        issues.push("No exported functions start with 'use'".to_string());
    }

    HookHealth {
        title: title.to_string(),
        is_healthy: issues.is_empty(),
        issues,
    }
}

pub fn report_health(mut health_reports: Vec<HookHealth>) {
    health_reports.sort_by(|a, b| a.title.cmp(&b.title));
    let mut hooks_with_issues = Vec::new();
    let mut total_hooks = 0;
    let mut unhealthy_hooks = 0;

    for health in health_reports {
        total_hooks += 1;
        println!("Hook: {}", health.title);
        if health.is_healthy {
            println!("Status: {}", "Healthy".green());
        } else {
            println!("Status: {}", "Unhealthy".red());
            unhealthy_hooks += 1;
            hooks_with_issues.push(health.title.clone());
            println!("Issues: {:?}", health.issues);
        }
        println!("-------------------------");
    }

    if !hooks_with_issues.is_empty() {
        println!("Hooks with issues: {:?}", hooks_with_issues);
    }

    println!(
        "{} hooks checked, {} unhealthy hooks.",
        total_hooks.to_string().green(),
        unhealthy_hooks.to_string().red()
    );
}
