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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-900 px-4">
            <div className="w-full max-w-md p-8 rounded-xl text-white">
                <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="p-3 rounded bg-slate-800 text-white border border-slate-700 w-full"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="p-3 rounded bg-slate-800 text-white border border-slate-700 w-full"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="p-3 rounded bg-slate-800 text-white border border-slate-700 w-full"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 text-white font-bold py-2 px-4 w-full rounded transition"
                    >
                        Sign Up
                    </button>
        
                    <p className="text-center text-sm">
                        Already have an account?{" "}
                        <a href="/" className="text-blue-400 underline">
                            Log In
                        </a>
                        </p>  
                </form>
              
            </div>
        </div>
    );
}