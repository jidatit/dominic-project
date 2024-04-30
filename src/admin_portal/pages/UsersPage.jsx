import React, { useState, useEffect, useMemo } from 'react'
import { Box } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../db';

const UsersPage = () => {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const ucollection = collection(db, 'users');
        const snapshot = await getDocs(ucollection);
        const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 100,
        Cell: ({ cell }) => (
          <Box >
            {cell.getValue().length > 100 ? cell.getValue().slice(0, 100) + '...' : cell.getValue()}
          </Box>
        )
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 100,
        Cell: ({ cell }) => (
          <Box >
            {cell.getValue().length > 100 ? cell.getValue().slice(0, 100) + '...' : cell.getValue()}
          </Box>
        )
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
        size: 100,
        Cell: ({ cell }) => (
          <Box >
            {cell.getValue().length > 100 ? cell.getValue().slice(0, 100) + '...' : cell.getValue()}
          </Box>
        )
      },
      {
        header: 'Actions',
        size: 200,
        Cell: ({ cell }) => (
          <Box display="flex" alignItems="center" gap="18px">
            <button
              className='bg-[#6D00F8] rounded-[18px] px-[26px] py-[4px] font-semibold text-white text-[14px]'>
              View Profile
            </button>
          </Box>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <div className='w-full flex flex-col justify-center items-center px-10'>
        <div className='w-full flex mb-[20px] flex-col justify-center items-start'>
          <h1 className='font-bold text-[24px]'>Users</h1>
        </div>
        <div className='w-full flex flex-col justify-center items-center'>
          {Users ? (
            <div className="table w-full">
              <MaterialReactTable
                columns={columns}
                data={Users}
              />
            </div>) : (null)}
        </div>

      </div>
    </>
  )
}

export default UsersPage