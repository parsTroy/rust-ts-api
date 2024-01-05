import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CardComponent from './CardComponent';

type User = {
    id: number;
    name: string;
    email: string;
}

type UserInterfaceProps = {
    backendName: string;
}

const UserInterface: React.FC<UserInterfaceProps> = ({ backendName }) => {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState({ name: '', email: '' });
    const [updateUser, setUpdateUser] = useState({ id: '', name: '', email: '' });

    // Define Styles (Move Later)
    const backgroundColour: { [key: string]: string } = {
        calm: 'bg-emerald-800',
    }
    const buttonColour: { [key: string]: string } = {
        calm: 'bg-emerald-800',
    }

    const bgColour = backgroundColour[backendName as keyof typeof backgroundColour] || 'bg-gray-200';
    const btnColour = buttonColour[backendName as keyof typeof buttonColour] || 'bg-gray-500 hover:bg-gray-600';

    // Fetch Users
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/rust/users`);
                setUsers(response.data.reverse());
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, [apiUrl])

    // Create Users
    const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/api/rust/users`, newUser);
            setUsers([response.data, ...users]);
            setNewUser({ name: '', email: '' });
        } catch (error) {
            console.log('Error creating user:', error);
        }
    };

    // Update User
    const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.put(`${apiUrl}/api/${backendName}/users/${updateUser.id}`, { name: updateUser.name, email: updateUser.email });
            setUpdateUser({ id: '', name: '', email: '' });
            setUsers(
                users.map((user) => {
                    if (user.id === parseInt(updateUser.id)) {
                        return { ...user, name: updateUser.name, email: updateUser.email };
                    }
                    return user;
                })
            );
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Delete User
    const deleteUser = async (userId: number) => {
        try {
            await axios.delete(`${apiUrl}/api/rust/users/${userId}`);
            setUsers(users.filter((user) => user.id !== userId));
        } catch (error) {
            console.log('Error deleting user', error);
        }
    }


    return (
        <div className={`user-interface ${bgColour} ${backendName} w-full p-4 my-4 rounded`}>
            <div className='md:flex md:justify-between mb-2'>
                <div className='flex gap-2 mb-4'>
                    <img src={`/typescriptlogo.png`} alt={`TypeScript Logo`} className='w-20' />
                    <img src={`/rustlogo.png`} alt={`Rust Logo`} className='w-20' />
                </div>
                <p className='italic font-mono'>Rust && TypeScript API</p>
            </div>

            <div className='flex gap-4 justify-between w-full'>
                {/* Add New User Form */}
                <form onSubmit={createUser} className='mb-6 p-4 bg-gray-800 w-full rounded shadow'>
                    <input
                        placeholder='Name'
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className='mb-2 w-full p-2 border border-gray-900 rounded'
                    />
                    <input
                        placeholder='Email'
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className='mb-2 w-full p-2 border border-gray-900 rounded'
                    />
                    <button type='submit' className={`w-full p-2 text-white ${btnColour} rounded hover:bg-gray-900`}>
                        Add User
                    </button>
                </form>

                {/* Update User */}
                <form onSubmit={handleUpdateUser} className='mb-6 p-4 bg-gray-800 w-full rounded shadow'>
                    <input
                        placeholder="User ID"
                        value={updateUser.id}
                        onChange={(e) => setUpdateUser({ ...updateUser, id: e.target.value })}
                        className="mb-2 w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        placeholder='Name'
                        value={updateUser.name}
                        onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
                        className='mb-2 w-full p-2 border border-gray-900 rounded'
                    />
                    <input
                        placeholder='Email'
                        value={updateUser.email}
                        onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
                        className='mb-2 w-full p-2 border border-gray-900 rounded'
                    />
                    <button type='submit' className={`w-full p-2 text-white ${btnColour} rounded hover:bg-gray-900`}>
                        Update User
                    </button>
                </form>
            </div>

            {/* Display Users */}
            <div className='space-y-4'>
                {users.map((user) => (
                    <div key={user.id} className='flex items-center justify-between bg-white p-4 rounded'>
                        <CardComponent card={user} />
                        <button onClick={() => deleteUser(user.id)} className={`${btnColour} text-white rounded p-2 m-4 w-full md:w-64`}>
                            Delete User
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserInterface