use rusqlite::{Connection, Result};

use crate::structs::{NewProject, NewTask, Project, Task};

pub fn open_database_connection() -> Connection {
    return Connection::open("sharqist.db").expect("Failed to open connection to the database");
}

pub enum TaskVariants {
    Inbox,
    Today,
    History,
    Future,
    All,
}

pub fn get_all_tasks_from_db(variant: TaskVariants) -> Result<Vec<Task>, String> {
    let connection: Connection = open_database_connection();

    let mut tasks: rusqlite::Statement<'_> = match variant {
        TaskVariants::Inbox => connection
            .prepare("SELECT id, name, description, date, is_done, project_id FROM tasks WHERE is_done = 0 AND date(date) <= date('now') AND is_done = 0")
            .expect("Failed to prepare query"),
        TaskVariants::Today => connection
            .prepare(
                "SELECT id, name, description, date, is_done, project_id FROM tasks WHERE date(date) = date('now') AND is_done = 0",
            )
            .expect("Failed to prepare query"),
        TaskVariants::History => connection
            .prepare(
                "SELECT id, name, description, date, is_done, project_id FROM tasks WHERE is_done = 1",
            )
            .expect("Failed to prepare query"),
        TaskVariants::Future => connection
            .prepare(
                "SELECT id, name, description, date, is_done, project_id FROM tasks WHERE date(date) > date('now') AND is_done = 0",
            )
            .expect("Failed to prepare query"),
        _ => connection
            .prepare("SELECT id, name, description, date, is_done, project_id FROM tasks")
            .expect("Failed to prepare query"),
    };

    let tasks_iter = tasks
        .query_map([], |row| {
            Ok(Task {
                id: row.get(0)?,
                name: row.get(1)?,
                description: row.get(2)?,
                date: row.get(3)?,
                is_done: row.get(4)?,
                project_id: row.get(5)?,
            })
        })
        .expect("Failed to prepare query");

    match tasks_iter.collect::<Result<Vec<_>, _>>() {
        Ok(tasks) => Ok(tasks),
        Err(_) => Err("Error while getting all tasks".into()),
    }
}

pub fn add_task_to_db(
    name: String,
    description: String,
    date: String,
    project_id: Option<i32>,
) -> String {
    let new_task: NewTask = NewTask {
        name: name,
        description: description,
        date: date,
        is_done: false,
        project_id: project_id,
    };

    let connection: Connection = open_database_connection();

    println!("New Task: {:?}", new_task);

    match connection.execute(
        "INSERT INTO tasks (name, description, date, is_done, project_id) VALUES (?1, ?2, ?3, ?4, ?5)",
        (
            &new_task.name,
            &new_task.description,
            &new_task.date,
            &new_task.is_done,
            &new_task.project_id,
        ),
    ) {
        Ok(_) => "Task added".to_string(),
        Err(_) => "Task addition failed.".to_string(),
    }
}

pub fn edit_task_db(
    name: String,
    description: String,
    date: String,
    id: i32,
    project_id: Option<i32>,
) -> String {
    let new_task: Task = Task {
        name: name,
        description: description,
        date: date,
        is_done: false,
        id,
        project_id,
    };

    let connection: Connection = open_database_connection();

    match connection.execute(
        "UPDATE tasks SET name = ?1, description = ?2, date = ?3, project_id = ?4 WHERE id = ?5",
        (
            &new_task.name,
            &new_task.description,
            &new_task.date,
            &new_task.project_id,
            &new_task.id,
        ),
    ) {
        Ok(_) => "Task edited".to_string(),
        Err(_) => "Task editing failed.".to_string(),
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

pub fn set_task_done_db(id: i32) -> String {
    let connection: Connection = open_database_connection();

    match connection.execute("UPDATE tasks SET is_done = 1 WHERE id = ?1", &[&id]) {
        Ok(_) => "Task marked as done".to_string(),
        Err(_) => "Task marking as done failed.".to_string(),
    }
}

pub fn set_task_undone_db(id: i32) -> String {
    let connection: Connection = open_database_connection();

    match connection.execute("UPDATE tasks SET is_done = 0 WHERE id = ?1", &[&id]) {
        Ok(_) => "Task marked as undone".to_string(),
        Err(_) => "Task marking as undone failed.".to_string(),
    }
}

pub fn get_all_projects_from_db() -> Result<Vec<Project>, String> {
    let connection: Connection = open_database_connection();

    let mut projects: rusqlite::Statement<'_> = connection
        .prepare("SELECT id, name, description, color FROM projects")
        .expect("Failed to prepare query");

    let projects_iter = projects
        .query_map([], |row| {
            Ok(Project {
                id: row.get(0)?,
                name: row.get(1)?,
                description: row.get(2)?,
                color: row.get(3)?,
            })
        })
        .expect("Failed to prepare query");

    match projects_iter.collect::<Result<Vec<_>, _>>() {
        Ok(projects) => Ok(projects),
        Err(_) => Err("Error while getting all projects".into()),
    }
}

pub fn add_project_to_db(name: String, description: String, color: String) -> String {
    let new_project: NewProject = NewProject {
        name: name,
        description: description,
        color: color,
    };

    let connection: Connection = open_database_connection();

    match connection.execute(
        "INSERT INTO projects (name, description, color) VALUES (?1, ?2, ?3)",
        (
            &new_project.name,
            &new_project.description,
            &new_project.color,
        ),
    ) {
        Ok(_) => "Project added".to_string(),
        Err(_) => "Project addition failed.".to_string(),
    }
}

pub fn delete_project_from_db(id: i32) -> String {
    let connection: Connection = open_database_connection();

    match connection.execute("DELETE FROM projects WHERE id = ?1", &[&id]) {
        Ok(_) => "Project deleted".to_string(),
        Err(_) => "Project deletion failed.".to_string(),
    }
}
