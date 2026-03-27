import { useEffect, useState } from "react";
import API from "../api";

function AdminDashboard() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const fetch = () => {
    API.get("/complaints", {
      headers: { Authorization: token }
    }).then(res => setData(res.data));
  };

  useEffect(fetch, []);

  const update = (id, status) => {
    API.put("/complaints", { id, status }, {
      headers: { Authorization: token }
    }).then(fetch);
  };

  return (
    <div className="container mt-4 text-white">
      <h2>Admin Dashboard</h2>

      {data.map(c => (
        <div key={c.id} className="glass card-3d p-3 mb-3">
          <h5>{c.issue_type}</h5>
          <p>{c.description}</p>

          <span className="badge bg-warning">{c.priority}</span>
          <span className="badge bg-info ms-2">{c.status}</span>

          <div className="mt-2">
            <button className="btn btn-primary btn-sm me-2"
              onClick={() => update(c.id, "In Progress")}>
              In Progress
            </button>

            <button className="btn btn-success btn-sm"
              onClick={() => update(c.id, "Resolved")}>
              Resolve
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;