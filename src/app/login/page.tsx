'use client';

import React, { useState, useEffect } from 'react';
import { account } from '../appwrite/appwrite'; // Ensure this path is correct

// Define a type for user data
interface User {
    name: string;
    [key: string]: unknown; // For additional properties if needed
}

export default function Login() {
    // State for logged-in user information
    const [isLoggedInUser, setLoggedInUser] = useState<User | null>(null);

    // State for login credentials
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Check for an existing session on component mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user: User = await account.get();
                setLoggedInUser(user);
            } catch (error) {
                console.log('No active session found.');
            }
        };
        fetchUser();
    }, []);

    // Function to handle user login
    const login = async (email: string, password: string) => {
        try {
            // Check if a session already exists
            const existingSession = await account.getSession('current').catch(() => null);
            if (existingSession) {
                alert('You are already logged in.');
                return;
            }

            // Create a new session
            const session = await account.createEmailPasswordSession(email, password);
            console.log('Session created:', session);

            // Fetch and store the logged-in user's details
            const user: User = await account.get();
            setLoggedInUser(user);

            alert(`Welcome, ${user.name}! You are now logged in.`);
        } catch (error) {
            console.error('Login failed:', (error as Error).message || error);
            alert('Login failed. Please check your credentials.');
        }
    };

    // Function to handle user logout
    const logout = async () => {
        try {
            await account.deleteSession('current');
            setLoggedInUser(null);

            alert('You have been logged out successfully.');
        } catch (error) {
            console.error('Logout failed:', (error as Error).message || error);
            alert('Error during logout. Please try again.');
        }
    };

    // Render for logged-in users
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

    // Render for login form
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        id="password"
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
