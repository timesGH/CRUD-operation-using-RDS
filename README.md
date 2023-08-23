# Express PostgreSQL CRUD App with React Frontend

This repository contains a simple web application built using Express.js, PostgreSQL, and React. The application allows users to perform CRUD (Create, Read, Update, Delete) operations on a list of persons. The backend is implemented using Express.js and PostgreSQL, while the frontend is developed using React.

## Features

- View a list of persons with their details.
- Add a new person to the list.
- Update existing person details.
- Delete a person from the list.

## Technologies Used

- **Backend:**
  - Express.js: A Node.js web application framework.
  - PostgreSQL: A powerful open-source relational database system.
  
- **Frontend:**
  - React: A popular JavaScript library for building user interfaces.
  - Axios: A promise-based HTTP client for making requests to the backend.
  
## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/express-postgresql-crud-app.git
   cd express-postgresql-crud-app
   ```

2. **Set Up the Database:**

   - Install PostgreSQL if not already installed.
   - Create a database named `postgres` (you can use another name if you prefer).
   - Update the database configuration in the backend code (`index.ts`) with your PostgreSQL credentials.

3. **Backend Setup:**

   ```bash
   cd react-crud-speech
   npm install
   npx ts-node app.ts
   ```

   The Express server will start running on http://localhost:3333.

4. **Frontend Setup:**

   ```bash
   cd rest-api
   npm install
   npm start
   ```

   The React development server will start running on http://localhost:3000.

5. **Access the App:**

   Open your web browser and navigate to http://localhost:3000 to access the frontend. You can use the provided UI to interact with the backend and perform CRUD operations on the persons list.

## Directory Structure

```
express-postgresql-crud-app/
├── backend/
│   ├── index.ts
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.js
│   │   └── ...
│   ├── public/
│   └── ...
└── README.md
```

## Screenshots

_Insert screenshots or GIFs of the application in action._

## Contributions

Contributions are welcome! If you find any issues or want to enhance the application, feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this README file to fit your specific repository and add any additional information you find necessary. Good luck with your project!
