use crate::{
    db::{add_task_to_db, delete_task_from_db, get_all_tasks_from_db},
    structs::Task,
};

#[tauri::command]
pub fn delete_task(id: i32) -> String {
    delete_task_from_db(id)
}

#[tauri::command]
pub fn add_task(name: String, description: String, date: String) -> String {
    add_task_to_db(name, description, date)
}

#[tauri::command]
pub fn get_all_tasks() -> Result<Vec<Task>, String> {
    get_all_tasks_from_db()
}
