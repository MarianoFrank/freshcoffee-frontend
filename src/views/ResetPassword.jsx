import React, { useRef } from 'react';
import FormField from '../components/FormField';// Ajusta la ruta según sea necesario
import axiosClient from '../../config/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const emailRef = useRef(null);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        axiosClient.post('/forgot-password', { email })
            .then((response) => {
                toast.success('Password reset link sent to your email');
                navigate('/auth/login');
            })
            .catch((error) => {
                console.log(error)
                toast.error('An error occurred. Please try again later.');
            });
    };

    return (
        <div >
            <h2 className="text-3xl font-bold text-slate-800">Reset Password ✉️</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <p className=" text-gray-600">Please enter your email address to receive a link to reset your password.</p>

                <FormField
                    id="email"
                    label="Email"
                    placeholder="Your email..."
                    type="email"
                    name="email"
                    ref={emailRef}
                />
                <button
                    type="submit"
                    className="mt-4 self-end p-2 rounded-md shadow-md hover:bg-yellow-400 block min-w-20 font-bold border border-yellow-500 text-yellow-700 bg-yellow-300"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;