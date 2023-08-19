// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn open_connection() -> Connection {
    return Connection::open("sharqist.db").expect("Failed to open connection to the database");
}

#[derive(Debug)]
struct Task {
    name: String,
    description: String,
    date: String,
}

fn add_task(name: String, description: String, date: String) {
    let new_task: Task = Task {
        name: name,
        description: description,
        date: date,
    };

    let connection: Connection = open_connection();
}

use rusqlite::{Connection, Result};

fn main() -> Result<()> {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    let connection: Connection = open_connection();

    connection.execute(
        "CREATE TABLE tasks (
            id    INTEGER PRIMARY KEY,
            name  TEXT NOT NULL,
            description  TEXT
            date  TEXT
        )",
        (), // empty list of parameters.
    )?;

    // connection.execute(
    //     "INSERT INTO tasks (name, description, date) VALUES (?1, ?2, ?3)",
    //     (&new_task.name, &new_task.description, &new_task.date),
    // )?;

    // let mut stmt = conn.prepare("SELECT id, name, description, date FROM tasks")?;
    // let person_iter = stmt.query_map([], |row| {
    //     Ok(Task {
    //         id: row.get(0)?,
    //         name: row.get(1)?,
    //         description: row.get(2)?,
    //         date: row.get(2)?,
    //     })
    // })?;

    // for person in person_iter {
    //     println!("Found person {:?}", person.unwrap());
    // }
    Ok(())
}
