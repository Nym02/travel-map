import React from "react";
import { TextField, Typography, Button } from "@material-ui/core";

function Login() {
  return (
    <div>
      <div>
        <Typography variant="h5" style={{ margin: "10px 0" }}>
          Login
        </Typography>
      </div>
      <form action="">
        <div>
          <TextField
            style={{ width: "100%", marginBottom: "10px" }}
            id="outlined-basic"
            label="Username"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            style={{ width: "100%", marginBottom: "10px" }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
          />
        </div>
        <div>
          <Button variant="contained" color="secondary">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
