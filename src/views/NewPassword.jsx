import React, { useRef } from 'react';
import FormField from '../components/FormField'; // Ajusta la ruta según tu estructura
import axiosClient from '../../config/axios';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';

const NewPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email'); // Puedes pasar el email como query param si es necesario

    const passwordRef = useRef(null);
    const passwordConfirmationRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const password = passwordRef.current.value;
        const passwordConfirmation = passwordConfirmationRef.current.value;

        axiosClient.post('/reset-password', {
            token,
            email,
            password,
            password_confirmation: passwordConfirmation,
        })
            .then((response) => {
                toast.success('Password successfully reset. You can now log in.');
                navigate('/auth/login');
            })
            .catch((error) => {
                console.error(error);
                toast.error(
                    error.response?.data?.message ||
                    'An error occurred. Please try again later.'
                );
            });
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-slate-800">Set New Password 🔒</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-gray-600">
                    Please enter your new password and confirm it.
                </p>

                <FormField
                    id="password"
                    label="New Password"
                    placeholder="Enter new password..."
                    type="password"
                    name="password"
                    ref={passwordRef}
                />

                <FormField
                    id="password_confirmation"
                    label="Confirm Password"
                    placeholder="Confirm your new password..."
                    type="password"
                    name="password_confirmation"
                    ref={passwordConfirmationRef}
                />

                <button
                    type="submit"
                    className="mt-4 self-end p-2 rounded-md shadow-md hover:bg-yellow-400 block min-w-20 font-bold border border-yellow-500 text-yellow-700 bg-yellow-300"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default NewPassword;
