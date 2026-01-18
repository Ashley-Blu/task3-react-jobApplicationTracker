import React from "react";
import "./Login.css";
import image from "../../assets/signup.png";
import { useNavigate } from "react-router-dom";
import { getUsers, setActiveUser } from "../../utils/localStorage";
import type { LoginFormData } from "../../types/index";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (): void => {
    setError("");
    setSuccess(false);
    setLoading(true);
    setTimeout(() => {
      if (!formData.username || !formData.password) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }
      const users = getUsers();
      const user = users.find(
        (u) =>
          u.username === formData.username && u.password === formData.password,
      );
      if (!user) {
        setError("Invalid username or password");
        setLoading(false);
        return;
      }
      setActiveUser(user);
      setLoading(false);
      toast.success("Login successful!");
      setTimeout(() => navigate("/HomePage"), 1200);
    }, 1000);
  };

  return (
    <>
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
      <div className="signin-wrapper">
        <div className="sign-side">
          <h1>Log In</h1>
          <p>
            Don't have a account?{" "}
            <Link to="/SignupPage">
              <span className="login-option">Create an accout</span>
            </Link>
          </p>
          <form>
            <label htmlFor="username">Username:</label>
            <input
              name="username"
              type="text"
              placeholder="Enter your username here..."
              value={formData.username}
              onChange={handleInputChange}
            />
            <label htmlFor="password">Password:</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password here..."
              value={formData.password}
              onChange={handleInputChange}
            />
          </form>
          {loading && (
            <div
              style={{
                color: "#ef6960",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Logging in...
            </div>
          )}
          {success && (
            <div
              style={{
                color: "green",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Login successful!
            </div>
          )}
          {error && (
            <>
              <p style={{ color: "red" }}>{error}</p>
            </>
          )}
          <button onClick={handleLogin} style={{ color: "white" }}>
            Sign In
          </button>
        </div>
        <div className="image-side">
          <img src={image} alt="" className="image" />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
