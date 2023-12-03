use crate::{
    db::{
        add_project_to_db, add_task_to_db, delete_project_from_db, delete_task_from_db,
        edit_project_db, edit_task_db, get_all_projects_from_db, get_all_tasks_from_db,
        set_task_done_db, set_task_undone_db, TaskVariants,
    },
    structs::Project,
    structs::Task,
};

#[tauri::command]
pub fn delete_task(id: i32) -> String {
    delete_task_from_db(id)
}

#[tauri::command]
pub fn add_task(
    name: String,
    description: String,
    date: String,
    project_id: Option<i32>,
) -> String {
    add_task_to_db(name, description, date, project_id)
}

#[tauri::command]
pub fn edit_task(
    name: String,
    description: String,
    date: String,
    id: i32,
    project_id: Option<i32>,
) -> String {
    edit_task_db(name, description, date, id, project_id)
}

#[tauri::command]
pub fn get_all_tasks() -> Result<Vec<Task>, String> {
    get_all_tasks_from_db(TaskVariants::All)
}

#[tauri::command]
pub fn get_inbox_tasks() -> Result<Vec<Task>, String> {
    get_all_tasks_from_db(TaskVariants::Inbox)
}

#[tauri::command]
pub fn get_today_tasks() -> Result<Vec<Task>, String> {
    get_all_tasks_from_db(TaskVariants::Today)
}

#[tauri::command]
pub fn get_history_tasks() -> Result<Vec<Task>, String> {
    get_all_tasks_from_db(TaskVariants::History)
}

#[tauri::command]
pub fn get_future_tasks() -> Result<Vec<Task>, String> {
    get_all_tasks_from_db(TaskVariants::Future)
}

#[tauri::command]
pub fn set_task_done(id: i32) -> String {
    set_task_done_db(id)
}

#[tauri::command]
pub fn set_task_undone(id: i32) -> String {
    set_task_undone_db(id)
}

#[tauri::command]
pub fn get_all_projects() -> Result<Vec<Project>, String> {
    get_all_projects_from_db()
}

#[tauri::command]
pub fn add_project(name: String, description: String, color: String) -> String {
    add_project_to_db(name, description, color)
}

#[tauri::command]
pub fn delete_project(id: i32) -> String {
    delete_project_from_db(id)
}

#[tauri::command]
pub fn edit_project(name: String, description: String, color: String, id: i32) -> String {
    edit_project_db(name, description, color, id)
}
