#[derive(serde::Serialize)]
pub struct NewTask {
    pub name: String,
    pub description: String,
    pub date: String,
}

#[derive(serde::Serialize)]
pub struct Task {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub date: String,
}
