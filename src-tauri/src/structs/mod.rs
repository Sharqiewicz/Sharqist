#[derive(serde::Serialize, Debug)]
pub struct NewTask {
    pub name: String,
    pub description: String,
    pub date: String,
    pub is_done: bool,
    pub project_id: Option<i32>,
}

#[derive(serde::Serialize)]
pub struct Task {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub date: String,
    pub is_done: bool,
    pub project_id: Option<i32>,
}

#[derive(serde::Serialize)]
pub struct NewProject {
    pub name: String,
    pub description: String,
    pub color: String,
}

#[derive(serde::Serialize)]
pub struct Project {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub color: String,
}
