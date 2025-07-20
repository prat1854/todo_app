const db = require('../config/db');

class Task {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM tasks ORDER BY due_date ASC');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(task) {
    const { title, description, due_date, priority, completed } = task;
    const [result] = await db.query(
      'INSERT INTO tasks (title, description, due_date, priority, completed) VALUES (?, ?, ?, ?, ?)',
      [title, description, due_date, priority, completed || false]
    );
    return { id: result.insertId, ...task };
  }

  static async update(id, task) {
    const { title, description, due_date, priority, completed } = task;
    await db.query(
      'UPDATE tasks SET title = ?, description = ?, due_date = ?, priority = ?, completed = ? WHERE id = ?',
      [title, description, due_date, priority, completed, id]
    );
    return { id, ...task };
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Task; 