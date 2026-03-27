import { useState } from "react";
import API from "../api";

function Register() {
  const [data, setData] = useState({ name:"", email:"", password:"" });

  const register = async () => {
    await API.post("/auth/register", data);
    alert("Registered!");
    window.location.href = "/";
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="glass card-3d p-5" style={{ width: "350px" }}>
        <h3>Register</h3>

        <input className="form-control my-2" placeholder="Name"
          onChange={e => setData({...data, name:e.target.value})} />

        <input className="form-control my-2" placeholder="Email"
          onChange={e => setData({...data, email:e.target.value})} />

        <input type="password" className="form-control my-3" placeholder="Password"
          onChange={e => setData({...data, password:e.target.value})} />

        <button className="btn btn-success w-100" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;