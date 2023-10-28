import { Link } from "react-router-dom";
import s from "./Account.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = (props) => {
  let type = props.type;
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


  if (type === "Client") type = "/login-client";
  else type = "/login-seller";

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    city: "",
  });
  

  const [passwordValue, setPasswordValue] = useState("");
  const passwordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const [rpasswordValue, rsetPasswordValue] = useState("");
  const rpasswordChange = (e) => {
    rsetPasswordValue(e.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if(passwordValue.length <6){
    //   toast.error("Password must be more than 5 character", { autoClose: 2500 });
    }
    else if (passwordValue !== rpasswordValue) {
    //   toast.error("Passwords must be same", { autoClose: 2500 });
    }
    else if(!emailRegex.test(formData.email)){
    //   toast.error("Enter valid email address", { autoClose: 2500 });
    } 
    else {
      const newUser = {
        username: formData.username,
        email: formData.email,
        city: formData.city,
        password: passwordValue,
      };

      fetch("http://0.0.0.0:4000/api/createClient/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then(() => {
        //   toast.success("Your are logined successfully", { autoClose: 2500 });
          navigate("/login-client");
        })
        .catch((error) => {
          console.error("Error creating a new user:", error);
        });
    }
  };

  return (
    <div className={s.main}>
      <form onSubmit={handleSubmit}>
        <div className={s.container}>
          <h1>{props.type} Profile</h1>
          <p>You can change your profile datas</p>
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Tom777"
            name="username"
            id="username"
            required
            value={formData.username}
            onChange={handleInputChange}
          />

          <label ht="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="example@mail.com"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />

          <label htmlFor="city">
            <b>Full name</b>
          </label>
          <input
            type="text"
            placeholder="Tom Jerry"
            name="city"
            id="city"
            required
            value={formData.city}
            onChange={handleInputChange}
          />

          <label htmlFor="pwd">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="**********"
            name="pwd"
            id="pwd"
            required
            value={passwordValue}
            onChange={passwordChange}
            autoComplete="current-password"
          />

          <label htmlFor="pwd-repeat">
            <b>Repeat Password</b>
          </label>
          <input
            type="password"
            placeholder="**********"
            name="pwd-repeat"
            id="pwd-repeat"
            required
            value={rpasswordValue}
            onChange={rpasswordChange}
            autoComplete="current-password"
          />

          <button type="submit">Change Profile</button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
