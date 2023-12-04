// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rusqlite::{Connection, Result};

mod structs;

mod db;

use db::{does_table_exist, open_database_connection};

mod endpoints;

use endpoints::{
    add_project, add_task, delete_project, delete_task, edit_project, edit_task, get_all_projects,
    get_all_tasks, get_future_tasks, get_history_tasks, get_inbox_tasks, get_today_tasks,
    set_task_done, set_task_undone,
};

fn main() -> Result<()> {
    let connection: Connection = open_database_connection();

    if !does_table_exist(&connection, "tasks")? {
        let create_task_table = "CREATE TABLE tasks (
            id    INTEGER PRIMARY KEY,
            name  TEXT NOT NULL,
            description  TEXT,
            date  TEXT,
            is_done  BOOLEAN NOT NULL DEFAULT FALSE,
            project_id INTEGER
        )";
        connection.execute(
            create_task_table,
            (), // empty list of parameters.
        )?;
    }

    if !does_table_exist(&connection, "projects")? {
        let create_projects_table = "CREATE TABLE projects (
            id    INTEGER PRIMARY KEY,
            name  TEXT NOT NULL,
            description  TEXT,
            color TEXT NOT NULL DEFAULT \"#a5aadf\"
        )";
        connection.execute(
            create_projects_table,
            (), // empty list of parameters.
        )?;
    }

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            add_task,
            get_all_tasks,
            delete_task,
            set_task_done,
            get_inbox_tasks,
            get_today_tasks,
            get_history_tasks,
            set_task_undone,
            get_future_tasks,
            edit_task,
            get_all_projects,
            add_project,
            delete_project,
            edit_project
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
