import React, { useState, useEffect } from 'react';

 

import axios from 'axios';

 

 

 

interface Person {

 

  id: number;

 

  first_name: string;

 

  last_name: string;

 

  phone_number: string;

 

}

 

 

 

const CrudApp: React.FC = () => {

 

  const [persons, setPersons] = useState<Person[]>([]);

 

  const [first_name, setFirstName] = useState('');

 

  const [last_name, setLastName] = useState('');

 

  const [phone_number, setPhoneNumber] = useState('');

 

 

 

  const apiUrl = 'http://localhost:3333/persons'; // Replace with your REST API endpoint URL

 

 

 

  useEffect(() => {

 

    fetchPersons();

 

  }, []);

 

 

 

  const fetchPersons = async () => {

 

    try {

 

      const response = await axios.get(apiUrl);

 

      setPersons(response.data);

 

    } catch (error) {

 

      console.error('Error fetching persons:', error);

 

    }

 

  };

 

 

 

  const createPerson = async () => {

 

    try {

 

      const newPerson: Person = {

        first_name,

 

        last_name,

 

        phone_number,

        id: 0

      };

 

      const response = await axios.post(apiUrl, newPerson);

 

      setPersons([...persons, response.data]);

 

      setFirstName('');

 

      setLastName('');

 

      setPhoneNumber('');

 

    } catch (error) {

 

      console.error('Error creating person:', error);

 

    }

 

  };

 

 

 

  const updatePerson = async (id: number) => {

 

    try {

 

      const updatedPerson: Person = {

 

        id,

 

        first_name,

 

        last_name,

 

        phone_number,

 

      };

 

      await axios.put(`${apiUrl}/${id}`, updatedPerson);

 

      fetchPersons();

 

    } catch (error) {

 

      console.error('Error updating person:', error);

 

    }

 

  };

 

 

 

  const deletePerson = async (id: number) => {

 

    try {

 

      await axios.delete(`${apiUrl}/${id}`);

 

      setPersons(persons.filter((person) => person.id !== id));

 

    } catch (error) {

 

      console.error('Error deleting person:', error);

 

    }

 

  };

 

 

 

  return (

 

    <div>

 

      <h1>CRUD App with Speak-to-API</h1>

 

      <div>

 

        <input

 

          type="text"

 

          placeholder="First Name"

 

          value={first_name}

 

          onChange={(e) => setFirstName(e.target.value)}

 

        />

 

        <input

 

          type="text"

 

          placeholder="Last Name"

 

          value={last_name}

 

          onChange={(e) => setLastName(e.target.value)}

 

        />

 

        <input

 

          type="text"

 

          placeholder="Phone Number"

 

          value={phone_number}

 

          onChange={(e) => setPhoneNumber(e.target.value)}

 

        />

 

        <button onClick={createPerson}>Add Person</button>

 

      </div>

 

      <ul>

 

        {persons.map((person) => (

 

          <li key={person.id}>

 

            {person.first_name} {person.last_name} - {person.phone_number}

 

            <button onClick={() => updatePerson(person.id)}>Edit</button>

 

            <button onClick={() => deletePerson(person.id)}>Delete</button>

 

          </li>

 

        ))}

 

      </ul>

 

    </div>

 

  );

 

};

 

 

 

export default CrudApp;