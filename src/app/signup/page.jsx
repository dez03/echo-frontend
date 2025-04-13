'use client';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase';
import { updateProfile } from 'firebase/auth';
import { handleFirstUpload, postUserAuth } from '../../lib/routes';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const router = useRouter();

    const [
        createUserWithEmailAndPassword,
        userCredential,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { name, email, password } = formData;
          const createdUser = await createUserWithEmailAndPassword(email, password);

        if (createdUser?.user) {
        await updateProfile(createdUser.user, { displayName: name });
        await createdUser.user.reload();

        await postUserAuth(createdUser.user.uid, name);

        const updatedUser = createdUser.user;

        const saved = JSON.parse(localStorage.getItem('preSignUpData'));
        if (saved?.entry && saved?.emotions && saved?.reflection) {
            await handleFirstUpload(updatedUser, saved.entry, saved.emotions, saved.reflection);
            localStorage.removeItem('preSignUpData');
        }

        console.log('User Info:', {
            name: updatedUser.displayName,
            email: updatedUser.email,
            uid: updatedUser.uid,
        });
        }
      
          router.push('/');
        } catch (e) {
          if (e.code === "auth/email-already-in-use") {
            alert("An account with this email already exists. Please log in instead.");
          } else {
            console.error("Error creating user:", e);
            alert("Something went wrong. Please try again.");
          }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Sign Up
                        </button>
                
                </form>
                <p className="text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <a href="/" className="text-blue-500 hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}