import React, { useState } from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import { toast } from "react-toastify";

function Register({ setRegister }) {
  console.log(setRegister);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = (e) => {
    e.preventDefault();
    if (username === "" || username === null) {
      toast.error("Username is Required.");
    } else if (email === "" || email === null) {
      toast.error("Email is Required");
    } else if (password === "") {
      toast.error("Password is Required");
    } else {
      const registerData = {
        username,
        email,
        password,
      };
      console.log(registerData);

      const url = `http://localhost:4000/api/user/register`;

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      }).then((res) => {
        console.log("reg", res);
        if (res.status === 200) {
          toast.success("Registration Successful");
        } else if (res.status !== 200) {
          toast.error("Please Enter Unique Username & Email");
        }
      });
    }
  };
  return (
    <div>
      <div>
        <Typography variant="h5" style={{ margin: "10px 0" }}>
          Register
        </Typography>
      </div>
      <form onSubmit={handleRegistration} action="">
        <div>
          <TextField
            style={{ width: "100%", marginBottom: "10px" }}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <TextField
            style={{ width: "100%", marginBottom: "10px" }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            style={{ width: "100%", marginBottom: "10px" }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Button type="submit" variant="contained" color="secondary">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Register;
