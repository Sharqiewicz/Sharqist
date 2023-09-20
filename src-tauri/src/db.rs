use rusqlite::{Connection, Result};

use crate::structs::{NewTask, Task};

pub fn open_database_connection() -> Connection {
    return Connection::open("sharqist.db").expect("Failed to open connection to the database");
}

pub fn get_all_tasks_from_db() -> Result<Vec<Task>, String> {
    let connection: Connection = open_database_connection();

    let mut tasks: rusqlite::Statement<'_> = connection
        .prepare("SELECT id, name, description, date FROM tasks")
        .expect("Failed to prepare query");

    let tasks_iter = tasks
        .query_map([], |row| {
            Ok(Task {
                id: row.get(0)?,
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

pub fn add_task_to_db(name: String, description: String, date: String) -> String {
    let new_task: NewTask = NewTask {
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

pub fn delete_task_from_db(id: i32) -> String {
    let connection: Connection = open_database_connection();

    match connection.execute("DELETE FROM tasks WHERE id = ?1", &[&id]) {
        Ok(_) => "Task deleted".to_string(),
        Err(_) => "Task deletion failed.".to_string(),
    }
}

pub fn does_table_exist(connection: &Connection, table_name: &str) -> Result<bool> {
    // SQLite query to check if a table exists
    let query: String = format!(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='{}'",
        table_name
    );

    // Execute the query and check if any rows are returned
    let result: Result<String, rusqlite::Error> = connection.query_row(&query, [], |row| {
        row.get(0) // Retrieve the first column of the first row
    });

    // Check the result to determine if the table exists
    match result {
        Ok(_) => Ok(true),   // Table exists
        Err(_) => Ok(false), // Table doesn't exist or an error occurred
    }
}
