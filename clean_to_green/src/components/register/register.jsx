import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
const Register = () => {
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [username, setUsername] = useState("");
  const [sector, setSector] = useState("");
  const [phone, setPhone] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasscodeChange = (e) => {
    setPasscode(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSectorChange = (e) => {
    setSector(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    const apiUrl =
      "https://sxykwezgeglfvvqt3lgariura40knbie.lambda-url.ca-central-1.on.aws/";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "User_email": email,
          "User_pass": passcode,
          "User_name": username,
          "Location": sector,
          "User_phone": phone,
        }),
        // console.log(JSON.stringify({ "email": email, "passcode":passcode, "username":username, "location": sector, "Phone": phone }))
      });

      if (response.ok) {
        console.log("Registration successful!");
      } else {
        console.error("Registration failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  return (
    <div className="register_body">
      <div className="title">
        {" "}
        <h2>Register</h2>
      </div>
      <div className="register-fields-container">
        <form onSubmit={handleRegistration}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>
          {/* <br /> */}
          <label>
            Passcode (Password):
            <input
              type="password"
              value={passcode}
              onChange={handlePasscodeChange}
              required
            />
          </label>
          {/* <br /> */}
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </label>
          {/* <br /> */}
          <label>
            Location:
            <input
              type="text"
              value={sector}
              onChange={handleSectorChange}
              required
            />
          </label>
          {/* <br /> */}
          <label>
            Phone:
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
          </label>
          {/* <br /> */}
          <button type="submit">Register</button>

          <Link className= "linkbutton"to="/login">Login</Link>
          {/* <button type="Login">Login</button> */}
        </form>
      </div>
    </div>
  );
};

export default Register;
