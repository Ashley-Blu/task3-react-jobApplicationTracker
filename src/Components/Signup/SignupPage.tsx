import React, { useState } from "react";
import "./Signup.css";
import sign from "../../assets/signup.png";
import { useNavigate, Link } from "react-router-dom";
import { saveUser, getUserByEmail } from "../../utils/localStorage";
import type { SignupFormData } from "../../types/index";
import toast, { Toaster } from "react-hot-toast";

export const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState<SignupFormData>({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSignUp = (e: React.FormEvent): void => {
    e.preventDefault();

    const newErrors: { [k: string]: string } = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (getUserByEmail(formData.email))
      newErrors.email = "User with the same email already exists";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password minimum length should be 6 characters";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
  };

  const handleSignup = (): void => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setTimeout(() => navigate("/LoginPage"), 1500);
    }, 1000);
  };

  return (
    <>
      {/* Global Toaster (top-level) */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            border: "1px solid #333",
            padding: "12px",
            color: "#fff",
            background: "#ef6960",
          },
        }}
      />

      <div className="signup-wrapper">
        <div className="left-side">
          <h1>Sign Up</h1>
          <p>
            Already have an account?{" "}
            <Link to="/LoginPage">
              <span className="login-option">Sign In</span>
            </Link>
          </p>

          <form>
            <label>Email:</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email..."
              value={formData.email}
              onChange={handleInputChange}
            />
            <label>Username:</label>
            <input
              name="username"
              type="text"
              placeholder="Enter your username..."
              value={formData.username}
              onChange={handleInputChange}
            />
            <label>Password:</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password..."
              value={formData.password}
              onChange={handleInputChange}
            />
          </form>

          {loading && <p style={{ color: "#ef6960" }}>Signing up...</p>}

          <button onClick={handleSignup} style={{ color: "white" }}>
            Sign Up
          </button>
        </div>

        <div className="right-side">
          <img src={sign} alt="" className="image" />
        </div>
      </div>
    </>
  );
};

export default SignupPage;
