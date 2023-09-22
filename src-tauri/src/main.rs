// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rusqlite::{Connection, Result};

mod structs;

mod db;

use db::{does_table_exist, open_database_connection};

mod endpoints;

use endpoints::{add_task, delete_task, get_all_tasks};

fn main() -> Result<()> {
    let connection: Connection = open_database_connection();

    if !does_table_exist(&connection, "tasks")? {
        let create_task_table = "CREATE TABLE tasks (
            id    INTEGER PRIMARY KEY,
            name  TEXT NOT NULL,
            description  TEXT,
            date  TEXT,
            is_done  BOOLEAN NOT NULL DEFAULT FALSE
        )";
        connection.execute(
            create_task_table,
            (), // empty list of parameters.
        )?;
    }

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            add_task,
            get_all_tasks,
            delete_task
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
