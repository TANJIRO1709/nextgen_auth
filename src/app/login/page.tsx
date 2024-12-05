'use client';
import React, { useState } from 'react';
import { client, account } from '../appwrite/appwrite';

export default function Login() {
    const [isLoggedInUser, setLoggedInUser] = useState<null | Record<string, any>>(null);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const login = async (email: string, password: string) => {
        try {
            const session = await account.createEmailPasswordSession(email, password);
            console.log('Session created:', session);
            const user = await account.get();
            setLoggedInUser(user);
            alert(`Welcome, ${user.name}! You are now logged in.`);
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession('current');
            setLoggedInUser(null);
            alert('You have been logged out successfully.');
        } catch (error) {
            console.error('Logout failed:', error);
            alert('Error during logout. Please try again.');
        }
    };

    if (isLoggedInUser) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
                <h1 className="text-2xl font-semibold mb-4">
                    Welcome, <span className="text-blue-500">{isLoggedInUser.name}</span>
                </h1>
                <button
                    onClick={logout}
                    className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition duration-300"
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
            <h1 className="text-3xl font-bold text-blue-500 mb-6">Login</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    login(email, password);
                }}
                className="w-full max-w-sm bg-gray-100 shadow-lg rounded-lg p-6"
            >
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
