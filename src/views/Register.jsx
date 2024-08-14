import { Link } from "react-router-dom";
import FormField from "../components/FormField";

export default function Register() {
  return (
    <div>
      <p className="text-3xl font-bold text-slate-800">Create account 🍩</p>
      <form action="" className="mt-5 flex flex-col">
        <FormField
          id="name"
          label="Name"
          placeholder="Your name..."
          type="text"
        />
        <FormField
          id="email"
          label="Email"
          placeholder="Your email... mail@example.com"
          type="email"
        />
        <FormField
          id="password"
          label="Password"
          placeholder="Minimum 8 characters"
          type="password"
        />
        <FormField
          id="repeat_password"
          label="Repeat Password"
          placeholder="Repeat same password"
          type="password"
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
