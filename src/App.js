import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './index.css';
import { HiOutlineFilter } from 'react-icons/hi';

function App() {
  const [userArray, setUserArray] = useState([]);

  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    axios
      .get('https://randomuser.me/api/?results=25')
      .then((response) => {
        const responseArray = response.data.results;
        // const sortedArray = responseArray.sort((a, b) =>
        //   a.name.first.localeCompare(b.name.first),
        // );
        setUserArray(responseArray);
        setFilteredArray(responseArray);
      })
      .catch((err) => console.log(err));
  }, []);

function handleNameClickF(event) {
  event.preventDefault();
  const sortedArray = setUserArray.sort((a, b) =>
  a.name.first.localeCompare(b.name.first),
  setFilteredArray(sortedArray)
  );
}


  return (
    <div className=''>
      <header>
        <h1 className='text-5xl text-white text-center mt-0 p-10 bg-gray-800'>
          Employee Tracker
        </h1>
      </header>
      <div className='align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg'>
        <table className='min-w-full '>
          <thead className=''>
            <tr>
              <th className='tracking-wider px-6 py-3 ' scope='col'>
                First Name
                <HiOutlineFilter type='button' className='ml-2 my-auto float-right' onClick={handleNameClickF}/>
              </th>
              <th className='tracking-wider px-6 py-3 ' scope='col'>
                Last Name
                <HiOutlineFilter className='ml-2 my-auto float-right' />
              </th>

              <th className='tracking-wider px-6 py-3 ' scope='col'>
                Email
              </th>
              <th className='tracking-wider px-6 py-3 ' scope='col'>
                Phone
              </th>
              <th
                className='tracking-wider px-6 py-3 flex flex-row justify-center'
                scope='col'
              >
                Age
                <HiOutlineFilter className='ml-2 my-auto float-right' />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredArray.map((result) => (
              <tr key={result.login.uuid} className='hover:bg-gray-200'>
                <td className='text-center p-5 border-gray-300 border-t'>
                  {result.name.first}
                </td>
                <td className='text-center p-5 border-gray-300 border-t'>
                  {result.name.last}
                </td>
                <td className='text-center p-5 border-gray-300 border-t'>
                  {result.email}
                </td>
                <td className='text-center p-5 border-gray-300 border-t'>
                  {result.phone}
                </td>
                <td className='text-center p-5 border-gray-300 border-t'>
                  {result.dob.age}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
