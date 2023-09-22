#[derive(serde::Serialize)]
pub struct NewTask {
    pub name: String,
    pub description: String,
    pub date: String,
    pub is_done: bool,
}

#[derive(serde::Serialize)]
pub struct Task {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub date: String,
    pub is_done: bool,
}
