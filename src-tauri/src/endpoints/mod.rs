use crate::{
    db::{
        add_task_to_db, delete_task_from_db, get_all_tasks_from_db, set_task_done_db,
        set_task_undone_db, TaskVariants,
    },
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
    get_all_tasks_from_db(TaskVariants::Future)
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
