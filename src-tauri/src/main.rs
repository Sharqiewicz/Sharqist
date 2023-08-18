// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn add_task(name: String, description: String, date: String) -> String {
    add_task_to_db(name, description, date)
}

fn open_database_connection() -> Connection {
    return Connection::open("sharqist.db").expect("Failed to open connection to the database");
}

#[derive(Debug)]
struct Task {
    name: String,
    description: String,
    date: String,
}

#[tauri::command]
fn get_all_tasks() -> Result<Vec<Task>, rusqlite::Error> {
    let connection: Connection = open_database_connection();

    let mut tasks: rusqlite::Statement<'_> = connection
        .prepare("SELECT id, name, description, date FROM tasks")
        .expect("Failed to prepare query");

    let tasks_iter = tasks
        .query_map([], |row| {
            Ok(Task {
                name: row.get(1)?,
                description: row.get(2)?,
                date: row.get(3)?,
            })
        })
        .expect("Failed to prepare query");

    let result: Result<Vec<_>> = tasks_iter.collect();
    result
}

fn add_task_to_db(name: String, description: String, date: String) -> String {
    let new_task: Task = Task {
        name: name,
        description: description,
        date: date,
    };

    let connection: Connection = open_database_connection();

    match connection.execute(
        "INSERT INTO tasks (name, description, date) VALUES (?1, ?2, ?3)",
        (&new_task.name, &new_task.description, &new_task.date),
    ) {
        Ok(_) => "Task added".to_string(),
        Err(_) => "Task addition failed.".to_string(),
    }
}

use rusqlite::{Connection, Result};

fn main() -> Result<()> {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![add_task, get_all_tasks])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    let connection: Connection = open_database_connection();

    connection.execute(
        "CREATE TABLE tasks (
            id    INTEGER PRIMARY KEY,
            name  TEXT NOT NULL,
            description  TEXT
            date  TEXT
        )",
        (), // empty list of parameters.
    )?;

    Ok(())
}
