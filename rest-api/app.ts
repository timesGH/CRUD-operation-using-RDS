// Import necessary libraries and modules
import express, { Request, Response } from 'express';
import cors from 'cors';
const { Pool } = require('pg');

// Configuration for PostgreSQL
const pool = new Pool({
  user: 'postgre',
  host: 'database-1.cqsvlvbsidw3.ap-southeast-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'Masterpassword',
  port: 5432, // or your PostgreSQL port
  ssl: { rejectUnauthorized: false }
});

const app = express();
const port = 3333;

// Enable CORS middleware
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

// GET all persons
app.get('/persons', async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT * FROM person');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching persons:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET a person by ID
app.get('/persons/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const { rows } = await pool.query('SELECT * FROM person WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching person by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// CREATE a new person
app.post('/persons', async (req: Request, res: Response) => {
  const { firstName, lastName, phoneNumber } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO person (first_name, last_name, phone_number) VALUES ($1, $2, $3) RETURNING *',
      [firstName, lastName, phoneNumber]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error('Error creating a new person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// UPDATE a person by ID
app.put('/persons/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { firstName, lastName, phoneNumber } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE person SET first_name = $1, last_name = $2, phone_number = $3 WHERE id = $4 RETURNING *',
      [firstName, lastName, phoneNumber, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating a person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE a person by ID
app.delete('/persons/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const { rows } = await pool.query('DELETE FROM person WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error deleting a person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
