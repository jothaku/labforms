import React, { useState } from "react";
import "./App.css";
import { registerUser } from "./services/registerUser";

function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [formValidation, setFormValidation] = useState({
    email: undefined,
    name: undefined,
    age: undefined,
    password: undefined,
    verifyPassword: undefined,
  });

  const isformValid = Object.keys(formValidation).every(
    (key) => formValidation[key] === ""
  );
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSumbit = (event) => {
    event.preventDefault();
    if (isformValid) {
      registerUser(email, name, age, password);
    }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setFormValidation({
      ...formValidation,
      email: value.length == 0 ? "email is required" : "",
    });

    setEmail(value);
  };
  const handleNameChange = (event) => {
    const value = event.target.value;
    setFormValidation({
      ...formValidation,
      name: value.length == 0 ? "name is required" : "",
    });

    setName(value);
  };

  const handleageChange = (event) => {
    const value = event.target.value;
    let errorMessage = "";

    if (value.length === 0) {
      errorMessage = "Age is required";
    } else if (value < 18) {
      errorMessage = "You must be above 18 to register";
    }

    setAge(value);
    setFormValidation({
      ...formValidation,
      age: errorMessage,
    });
  };

  const handlepasswordChange = (event) => {
    const value = event.target.value;

    if (value.length === 0) {
      setFormValidation({
        ...formValidation,
        password: "password is required",
      });
    } else if (value.length < 5) {
      setFormValidation({
        ...formValidation,
        password: "password is too short",
      });
    } else {
      setFormValidation({
        ...formValidation,
        password: "",
      });
    }

    setPassword(value);
  };

  const handleverifyPasswordChange = (event) => {
    const value = event.target.value;
    setFormValidation({
      ...formValidation,
      verifyPassword: value !== password ? "passwords do not match" : "",
    });

    setVerifyPassword(value);
  };

  return (
    <div>
      <form onSubmit={handleSumbit}>
        <div>
          <label> Email </label>
          <input
            value={email}
            placeholder="Email"
            type="Email"
            onChange={handleEmailChange}
          />
          {formValidation.email && (
            <span style={{ color: "red" }}>{formValidation.email}</span>
          )}
        </div>
        <div>
          <label>Name</label>
          <input
            value={name}
            placeholder="Name"
            type="Name"
            onChange={handleNameChange}
          />
          {formValidation.name && (
            <span style={{ color: "red" }}>{formValidation.name}</span>
          )}
        </div>
        <div>
          <label>Age</label>
          <input
            value={age}
            placeholder="Age"
            type="number"
            onChange={handleageChange}
            step="1"
          />
          {formValidation.age && (
            <span style={{ color: "red" }}>{formValidation.age}</span>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            value={password}
            placeholder="Password"
            type="Password"
            onChange={handlepasswordChange}
          />
          {formValidation.password && (
            <span style={{ color: "red" }}>{formValidation.password}</span>
          )}
        </div>
        <div>
          <label>Verify Password</label>
          <input
            value={verifyPassword}
            placeholder="Verify Password"
            type="password"
            onChange={handleverifyPasswordChange}
          />
        </div>
        <label>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(event) => setTermsAccepted(event.target.checked)}
          />
          Please read and accept the terms and conditions
        </label>
        <button disabled={!isformValid}>Sig up</button>
      </form>
    </div>
  );
}

export default App;
