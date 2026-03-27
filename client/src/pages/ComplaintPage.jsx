import { useState } from "react";
import API from "../api";

function ComplaintPage() {
  const [form, setForm] = useState({});
  const token = localStorage.getItem("token");
console.log(token)
  const submit = async () => {
    await API.post("/complaints", form, {
      headers: { Authorization: token }
    });
    alert("Submitted");
    window.location.href = "/dashboard";
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="glass card-3d p-5" style={{ width: "400px" }}>
        <h3>New Complaint</h3>

        <input className="form-control my-2" placeholder="Issue Type"
          onChange={e => setForm({...form, issue_type:e.target.value})} />

        <textarea className="form-control my-2" placeholder="Description"
          onChange={e => setForm({...form, description:e.target.value})} />

        <button className="btn btn-success w-100" onClick={submit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default ComplaintPage;