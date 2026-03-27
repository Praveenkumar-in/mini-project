import { useEffect, useState } from "react";
import API from "../api";

function StudentDashboard() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get("/complaints/my", {
      headers: { Authorization: token }
    }).then(res => setData(res.data));
  }, []);

  return (
    <div className="container mt-4 text-white">
      <h2>Student Dashboard</h2>

      <a href="/complaint" className="btn btn-warning mb-3">+ Complaint</a>

      {data.map(c => (
        <div key={c.id} className="glass card-3d p-3 mb-3">
          <h5>{c.issue_type}</h5>
          <p>{c.description}</p>
          <span className="badge bg-info">{c.status}</span>
          <span className="badge bg-danger ms-2">{c.priority}</span>
        </div>
      ))}
    </div>
  );
}

export default StudentDashboard;