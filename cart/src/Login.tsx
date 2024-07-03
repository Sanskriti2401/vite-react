import { useState } from "react";
import { login, useLoggedIn } from "./cart";
import "./Login.css";

function Login(){
  const loggedIn = useLoggedIn();
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("sally");
  const [password, setPassword] = useState("123");

  if (loggedIn) return null;

  return (
    <>
      <span onClick={() => setShowLogin(!showLogin)}>
        <i className="ri-fingerprint-line login-icon" id="showlogin"></i>
      </span>
      {showLogin && (
        <div className="login-container" style={{ top: "2rem", left: -250 }}>
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            className="login-input mt-3"
          />
          <button
            className="login-button mt-5"
            onClick={() => login(username, password)}
            id="loginbtn"
          >
            Login
          </button>
        </div>
      )}
    </>
  );
};

export default Login;
