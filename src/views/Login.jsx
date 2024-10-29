import FormField from "../components/FormField";
import { Link } from "react-router-dom";
import axiosClient from "../../config/axios";

import { useFieldError } from "../context/FieldErrorsContext";
import { createRef } from "react";

export default function Login() {
  const { setErrors } = useFieldError();

  const emailRef = createRef();
  const passwordRef = createRef();

  const handleSubmit = async (e) => {
    console.log(e.preventDefault());
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axiosClient.post("/login", data);
      setErrors({});
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.errors);
        console.log(error.response.data.errors);
      }
    }
  };

  return (
    <div>
      <p className="text-3xl font-bold text-slate-800">Login 🥐</p>
      <form
        action=""
        className="mt-5 flex flex-col"
        onSubmit={handleSubmit}
        noValidate
      >
        <FormField
          id="email"
          label="Email"
          placeholder="Your email..."
          type="email"
          name="email"
          ref={emailRef}
        />
        <FormField
          id="password"
          label="Password"
          placeholder="Your pass..."
          type="password"
          name="password"
          ref={passwordRef}
        />

        <button
          type="submit"
          className="mt-4 self-end p-2 rounded-md shadow-md hover:bg-yellow-400 block min-w-20 font-bold border border-yellow-500 text-yellow-700 bg-yellow-300"
        >
          GO !
        </button>
        <nav className="mt-5 flex gap-10 justify-between">
          <Link
            to="/auth/register"
            className="text-slate-600 text-sm hover:text-yellow-600 "
          >
            No account yet? Register now.
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
