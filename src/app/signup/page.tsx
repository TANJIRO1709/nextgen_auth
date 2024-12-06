'use client';

import React, { useState } from 'react';
import { account } from '../appwrite/appwrite'; 
const SignUp: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        gender: '',
        dob: '',
        address: '',
        pincode: '',
        postOffice: '',
        occupation: '',
        incomeCategory: '',
        acresOfLand: '',
        cropsGrown: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const parseDOB = () => {
        const [year, month, day] = formData.dob.split('-').map(Number);
        return year && month && day ? { year, month, day } : null;
    };

    const handleSignup = async () => {
        const { name, email, password, confirmPassword, ...rest } = formData;
        const dob = parseDOB();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (!dob) {
            alert('Please provide a valid date of birth.');
            return;
        }

        try {
            // Create user in Appwrite
            await account.create('unique()', email, password, name);

            // Send user data to MongoDB via API
            const userData = { ...rest, name, email, dob };
            const response = await fetch('/api/saveUserToMongo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userData }),
            });

            if (response.ok) {
                alert(`Account created successfully! Welcome, ${name}`);
            } else {
                const errorData = await response.json();
                alert(`Failed to save user to MongoDB: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Signup failed:', error);
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
            <h1 className="text-3xl font-bold text-blue-500 mb-6">Sign Up</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSignup();
                }}
                className="w-full max-w-lg bg-gray-100 shadow-lg rounded-lg p-6"
            >
                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                    <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Phone Number
                    </label>
                    <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Gender */}
                <div className="mb-4">
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>
                            Select Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Date of Birth */}
                <div className="mb-4">
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                    </label>
                    <input
                        id="dob"
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Address */}
                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Pincode */}
                <div className="mb-4">
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                        Pincode
                    </label>
                    <input
                        id="pincode"
                        name="pincode"
                        type="text"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Post Office */}
                <div className="mb-4">
                    <label
                        htmlFor="postOffice"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Post Office
                    </label>
                    <input
                        id="postOffice"
                        name="postOffice"
                        type="text"
                        value={formData.postOffice}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Occupation */}
                <div className="mb-4">
                    <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                        Occupation
                    </label>
                    <input
                        id="occupation"
                        name="occupation"
                        type="text"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Income Category */}
                <div className="mb-4">
                    <label
                        htmlFor="incomeCategory"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Income Category
                    </label>
                    <select
                        id="incomeCategory"
                        name="incomeCategory"
                        value={formData.incomeCategory}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>
                            Select Income Category
                        </option>
                        <option value="Low">Low</option>
                        <option value="Middle">Middle</option>
                        <option value="High">High</option>
                    </select>
                </div>

                {/* Acres of Land */}
                <div className="mb-4">
                    <label
                        htmlFor="acresOfLand"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Acres of Land
                    </label>
                    <input
                        id="acresOfLand"
                        name="acresOfLand"
                        type="text"
                        value={formData.acresOfLand}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Crops Grown */}
                <div className="mb-4">
                    <label
                        htmlFor="cropsGrown"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Crops Grown
                    </label>
                    <input
                        id="cropsGrown"
                        name="cropsGrown"
                        type="text"
                        value={formData.cropsGrown}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
