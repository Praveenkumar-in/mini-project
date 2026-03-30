import { useState } from "react";
import API from "../api";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const login = async () => {
    const res = await API.post("/auth/login", data);
console.log("login",login)

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    window.location.href = "/dashboard";
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="glass card-3d p-5" style={{ width: "350px" }}>
        <h3 className="text-center">
          <i className="bi bi-shield-lock"></i> Login
        </h3>

        <input className="form-control my-3" placeholder="Email"
          onChange={e => setData({...data, email:e.target.value})} />

        <input type="password" className="form-control my-3" placeholder="Password"
          onChange={e => setData({...data, password:e.target.value})} />

        <button className="btn btn-warning w-100 btn-custom" onClick={login}>
          Login
        </button>

        <p className="text-center mt-3">
          <a href="/register" className="text-white">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;