// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn add_task(name: String, description: String, date: String) -> String {
    add_task_to_db(name, description, date)
}

fn open_database_connection() -> Connection {
    return Connection::open("sharqist.db").expect("Failed to open connection to the database");
}

#[derive(serde::Serialize)]
struct Task {
    name: String,
    description: String,
    date: String,
}

use rusqlite::{Connection, Result};

#[tauri::command]
fn get_all_tasks() -> Result<Vec<Task>, String> {
    get_all_tasks_from_db()
}

fn get_all_tasks_from_db() -> Result<Vec<Task>, String> {
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

    match tasks_iter.collect::<Result<Vec<_>, _>>() {
        Ok(tasks) => Ok(tasks),
        Err(_) => Err("Error while getting all tasks".into()),
    }
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
