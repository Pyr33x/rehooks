use serde::Serialize;

#[derive(Serialize)]
pub struct React {
    pub id: u8,
    pub title: String,
    pub description: String,
    pub content: String,
}

#[derive(Serialize)]
pub struct Next {
    pub id: u8,
    pub title: String,
    pub description: String,
    pub content: Opts,
}

#[derive(Serialize)]
pub struct Opts {
    pub server: String,
    pub client: String,
}