import { Link } from "react-router-dom";
import FormField from "../components/FormField";
import { createRef, useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import { useFieldError } from "../context/FieldErrorsContext";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const password_confirmationRef = createRef();
  const navigate = useNavigate();

  const { setErrors } = useFieldError();

  useEffect(() => {
    return () => {
      // Esta función se ejecutará al desmontar el componente
      setErrors({});
    };
  }, []);

  const handleSubmit = async (e) => {
    console.log(e.preventDefault());
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: password_confirmationRef.current.value,
    };

    try {
      const response = await axiosClient.post("/register", data);
      setErrors({});
      toast.success("Account register success", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate('/auth/login');
    } catch (error) {
      if (error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
      if (error.response.data.error) {
        toast.error(error.response.data.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      if (error.response.data.message) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  }


  return (
    <div>
      <p className="text-3xl font-bold text-slate-800">Create account 🍩</p>
      <form
        action=""
        className="mt-5 flex flex-col"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* {errors ? errors.map((error) => <p key={error}>{error}</p>) : null} */}

        <FormField
          id="name"
          label="Name"
          placeholder="Your name..."
          type="text"
          name="name"
          ref={nameRef}
        />
        <FormField
          id="email"
          label="Email"
          placeholder="Your email... mail@example.com"
          type="email"
          name="email"
          ref={emailRef}
        />
        <FormField
          id="password"
          label="Password"
          placeholder="Minimum 8 characters"
          type="password"
          name="password"
          ref={passwordRef}
        />
        <FormField
          id="password_confirmation"
          label="Repeat Password"
          placeholder="Repeat same password"
          type="password"
          name="password_confirmation"
          ref={password_confirmationRef}
        />
        <button
          type="submit"
          className="mt-4 self-end p-2 rounded-md shadow-md hover:bg-yellow-400 block min-w-20 font-bold border border-yellow-500 text-yellow-700 bg-yellow-300"
        >
          Save
        </button>
        <nav className="mt-5 flex gap-10 justify-between">
          <Link
            to="/auth/login"
            className="text-slate-600 text-sm hover:text-yellow-600 "
          >
            Already registered? Log in now.
          </Link>
          <Link
            to="/auth/reset-password"
            className="text-slate-600 text-sm hover:text-yellow-600 "
          >
            Forgot your password, reset it
          </Link>
        </nav>
      </form>
    </div>
  );
}
