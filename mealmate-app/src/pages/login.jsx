import { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { apiUrls } from "../api-url";
import useAuthStore from "../store/authStore";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const usernameRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const { login } = useAuthStore();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiUrls.AUTH_LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include", // Equivalent to withCredentials: true
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(JSON.stringify(data));

        login(username, true);
        setSuccess(true);
        setUsername("");
        setPassword("");
        navigate(from, { replace: true });
        // navigate("/order");
      } else {
        throw new Error("Login Failed");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive">
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "300px",
        }}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={usernameRef}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button>Sign In</button>
      </form>
    </section>
  );
};

export default Login;
