import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './index.css';
import { HiArrowNarrowUp } from 'react-icons/hi';
import { HiArrowNarrowDown } from 'react-icons/hi';
import { HiSearch } from 'react-icons/hi';
import { HiPhone } from 'react-icons/hi';
import { HiOutlineMail } from 'react-icons/hi';
import { HiUserGroup } from 'react-icons/hi';


function App() {
  const [userArray, setUserArray] = useState([]);

  const [filteredArray, setFilteredArray] = useState([]);

  const [searchArray, setSearchArray] = useState([]);

  useEffect(() => {
    axios
      .get('https://randomuser.me/api/?results=25')
      .then((response) => {
        const responseArray = response.data.results;
        setUserArray(responseArray);
        setFilteredArray(responseArray);
      })
      .catch((err) => console.log(err));
  }, []);

  function sortAsc(key) {
    let ascArray = [...userArray].sort((a, b) =>
      a.name[key] > b.name[key] ? 1 : -1,
    );
    setFilteredArray(ascArray);
  }

  function sortDec(key) {
    let decArray = [...userArray].sort((a, b) =>
      b.name[key] > a.name[key] ? 1 : -1,
    );
    setFilteredArray(decArray);
    console.log('help');
  }

  function search(e) {
    setSearchArray(e.target.value);
    var newArray = [...userArray].filter((item) => {
      return item.name.first
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setFilteredArray(newArray);
  }

  return (
    <div className=''>
      <header className=''>
        <h1 className='text-5xl text-white text-center mt-0 p-10 bg-gray-800 flex flex-row justify-center'>
          Employee Tracker <HiUserGroup className='ml-5' />
        </h1>
      </header>
      <div class='relative text-gray-600 flex justify-center'>
        <HiSearch class='m-1 my-auto' />
        <input
          class='bg-gray-100 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none my-5 mr-5'
          placeholder='Search'
          value={searchArray}
          onChange={search}
        />
      </div>
      <div className='align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg'>
        <table className='min-w-full '>
          <thead className=''>
            <tr>
              <th className='tracking-wider px-6 py-3 ' scope='col'>
                First Name
                <HiArrowNarrowDown
                  type='button'
                  className='ml-2 my-auto float-right'
                  onClick={() => sortDec('first')}
                />
                <HiArrowNarrowUp
                  type='button'
                  className='ml-2 my-auto float-right'
                  onClick={() => sortAsc('first')}
                />
              </th>
              <th className='tracking-wider px-6 py-3 ' scope='col'>
                Last Name
                <HiArrowNarrowDown
                  type='button'
                  className='ml-2 my-auto float-right'
                  onClick={() => sortDec('last')}
                />
                <HiArrowNarrowUp
                  type='button'
                  className='ml-2 my-auto float-right'
                  onClick={() => sortAsc('last')}
                />
              </th>

              <th className='tracking-wider px-6 py-3 ' scope='col'>
                Email
                <HiOutlineMail className='ml-2 my-auto float-right space-x-0' />
              </th>
              <th className='tracking-wider px-6 py-3 ' scope='col'>
                <HiPhone className='ml-2 my-auto float-right space-x-0' />
                Phone
              </th>
              <th
                className='tracking-wider px-6 py-3 flex flex-row justify-center'
                scope='col'
              >
                Age
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
