use serde::Serialize;

#[derive(Serialize)]
pub struct Hook {
    pub id: u8,
    pub title: String,
    pub description: String,
    pub content: String,
}
