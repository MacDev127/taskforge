import pool from '../config/db.js';

// Create Task
export const createTask = async (req, res) => {
  const { title, description, assignedTo } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, assignedTo) VALUES ($1, $2, $3) RETURNING *',
      [title, description, assignedTo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Tasks
export const getTasks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
