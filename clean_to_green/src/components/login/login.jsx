import React, { useState } from "react";
// import "./register.css";
import "./login.css";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasscodeChange = (e) => {
    setPasscode(e.target.value);
  };



  const handleLogin = async (e) => {
    e.preventDefault();

    const apiUrl =
      "https://birhe2sjf7c5mdek6qq3zm27li0lwhnf.lambda-url.ca-central-1.on.aws/";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": '*',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          User_email: email,
          User_pass: passcode,
        }),
        // console.log(JSON.stringify({ "email": email, "passcode":passcode, "username":username, "location": sector, "Phone": phone }))
      });

      if (response.ok) {
        console.log("Login successful!");
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  return (
    <div className="register_body">
      <div className="title">
        {" "}
        <h2>login </h2>
      </div>
      <div className="register-fields-container">
        <form onSubmit={handleLogin}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>
          <br />
          <label>
            Passcode (Password):
            <input
              type="password"
              value={passcode}
              onChange={handlePasscodeChange}
              required
            />
          </label>
          <br />

          {/* <Link className="linkbutton"to="/login">Login</Link> */}
          <button type="submit" className="linkbutton">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
