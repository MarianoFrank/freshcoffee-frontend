import FormField from "../components/FormField";
import { Link } from "react-router-dom";
import { createRef, useState, useEffect } from "react";
import { useFieldError } from "../context/FieldErrorsContext";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const { setErrors } = useFieldError();
  const { login } = useAuth("/");

  const emailRef = createRef();
  const passwordRef = createRef();
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Cargar el valor de "rememberMe" de localStorage al montar el componente
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";
    setRememberMe(savedRememberMe);
    return () => {
      // Esta función se ejecutará al desmontar el componente
      setErrors({});
    };
  }, []);

  const handleRememberMeChange = () => {
    const newRememberMe = !rememberMe;
    setRememberMe(newRememberMe);
    localStorage.setItem("rememberMe", newRememberMe); // Guardar el valor en localStorage
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      remember_me: rememberMe,
    };
    await login(data, setErrors);
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

        <div className="flex items-center gap-x-2 ">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMeChange}
            id="remember_me"
            name="remember_me"
          />
          <label htmlFor="remember_me" className="text-sm text-gray-700">
            Remember Me
          </label>
        </div>

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
