import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Person {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
}

const App: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      const response = await axios.get<Person[]>('http://localhost:3333/persons');
      setPersons(response.data);
    } catch (error) {
      console.error('Error fetching persons:', error);
    }
  };

  const createPerson = async () => {
    try {
      const newPersonData = {
        firstName,
        lastName,
        phoneNumber
      };

      await axios.post('http://localhost:3333/persons', newPersonData);

      fetchPersons(); // Refresh the list after adding a new person

      // Clear input fields
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
    } catch (error) {
      console.error('Error creating person:', error);
    }
  };

  return (
    <div>
      <h1>Person Data</h1>
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

export default App;