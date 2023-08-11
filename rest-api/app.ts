import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import { Client } from 'pg';

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());

const pool = new Client({
  user: 'postgre',
  host: 'database-1.cqsvlvbsidw3.ap-southeast-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'Masterpassword',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(error => console.error('Error connecting to PostgreSQL:', error));

class Person {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;

  constructor(id: number, firstName: string, lastName: string, phoneNumber: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }
}

// GET all persons
app.get('/persons', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM persons');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching persons:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET a person by ID
app.get('/persons/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query('SELECT * FROM persons WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching person by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// CREATE a new person
app.post('/persons', async (req: Request, res: Response) => {
  const { firstName, lastName, phoneNumber } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO persons (first_name, last_name, phone_number) VALUES ($1, $2, $3) RETURNING *',
      [firstName, lastName, phoneNumber]
    );
    res.json(result.rows[0]);
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
    const result = await pool.query(
      'UPDATE persons SET first_name = $1, last_name = $2, phone_number = $3 WHERE id = $4 RETURNING *',
      [firstName, lastName, phoneNumber, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating a person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE a person by ID
app.delete('/persons/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query('DELETE FROM persons WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error deleting a person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
