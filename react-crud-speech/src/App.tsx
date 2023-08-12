import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the Person interface to describe the structure of a person's data
interface Person {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
}

// Define the main App component
const App: React.FC = () => {
  // State hooks to manage persons data and form input values
  const [persons, setPersons] = useState<Person[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // UseEffect to fetch persons data when the component mounts
  useEffect(() => {
    fetchPersons();
  }, []);

  // Function to fetch persons data from the server
  const fetchPersons = async () => {
    try {
      const response = await axios.get<Person[]>('http://localhost:3333/persons');
      setPersons(response.data);
    } catch (error) {
      console.error('Error fetching persons:', error);
    }
  };

  // Function to create a new person and update the list
  const createPerson = async () => {
    try {
      // Prepare the data for the new person
      const newPersonData = {
        firstName,
        lastName,
        phoneNumber
      };

      // Send a POST request to add the new person
      await axios.post('http://localhost:3333/persons', newPersonData);

      // Refresh the list of persons after adding a new person
      fetchPersons();

      // Clear input fields after successful addition
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
    } catch (error) {
      console.error('Error creating person:', error);
    }
  };

  // Render the component
  return (
    <div>
      {/* Title */}
      <h1>Person Data</h1>
      
      {/* Form for adding a new person */}
      <div>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={createPerson}>Add Person</button>
      </div>
      
      {/* Table for displaying persons data */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through persons data to generate table rows */}
          {persons.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.first_name}</td>
              <td>{person.last_name}</td>
              <td>{person.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Export the App component as the default export
export default App;
