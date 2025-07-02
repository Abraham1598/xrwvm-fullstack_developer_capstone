import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import close_icon from "../assets/close.png";

const Register = () => {
  // State variables for form inputs
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Redirect to home
  const gohome = (e) => {
    e.preventDefault();
    window.location.href = window.location.origin;
  };

  // Handle form submission
  const register = async (e) => {
    e.preventDefault();
    let register_url = window.location.origin + "/djangoapp/register";
    // Send POST request to register endpoint
    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
        firstName,
        lastName,
        email,
      }),
    });
    const json = await res.json();
    if (json.status) {
      // Save username in session and reload home
      sessionStorage.setItem("username", json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("The user with the same username is already registered.");
      window.location.href = window.location.origin;
    }
  };

  return (
    <div className="register_container" style={{ maxWidth: "420px", margin: "3rem auto", background: "#fff", borderRadius: "12px", boxShadow: "0 0 12px #bbb", padding: "2rem" }}>
      <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <span className="text" style={{ fontSize: "1.7rem", fontWeight: "bold", color: "#333" }}>Sign Up</span>
        <button onClick={gohome} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <img style={{ width: "28px" }} src={close_icon} alt="Close" />
        </button>
      </div>
      <form onSubmit={register} autoComplete="off">
        <div className="inputs" style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          <label className="input" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <img src={user_icon} className="img_icon" alt="Username"/>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input_field"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </label>
          <label className="input" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <img src={user_icon} className="img_icon" alt="First Name"/>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              className="input_field"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label className="input" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <img src={user_icon} className="img_icon" alt="Last Name"/>
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="input_field"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label className="input" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <img src={email_icon} className="img_icon" alt="Email"/>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input_field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="input" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <img src={password_icon} className="img_icon" alt="Password"/>
            <input
              name="psw"
              type="password"
              placeholder="Password"
              className="input_field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="submit_panel" style={{ marginTop: "2rem", textAlign: "center" }}>
          <input className="submit" type="submit" value="Register" style={{ padding: "0.6rem 2.5rem", fontWeight: "bold", fontSize: "1.1rem", background: "#295be7", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }} />
        </div>
      </form>
    </div>
  );
};

export default Register;