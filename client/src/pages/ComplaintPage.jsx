import { useState, useEffect } from "react";
import API from "../api";

function ComplaintPage() {
  const [form, setForm] = useState({
    issue_type: "",
    description: ""
  });

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch My Complaints
  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints/my");
      setComplaints(res.data);
    } catch (err) {
      console.error(err);

      if (err.response?.status === 403) {
        alert("Session expired. Login again.");
        localStorage.clear();
        window.location.href = "/";
      }
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // 🔹 Submit Complaint
  const submit = async () => {
    try {
      if (!form.issue_type || !form.description) {
        alert("Fill all fields");
        return;
      }

      setLoading(true);

      // ✅ CORRECT ROUTE
      await API.post("/complaints", form);

      alert("Complaint Submitted ✅");

      // reset form
      setForm({
        issue_type: "",
        description: ""
      });

      // refresh table
      fetchComplaints();

    } catch (err) {
      console.error(err);

      if (err.response?.status === 403) {
        alert("Unauthorized - Login again");
      } else {
        alert("Error submitting complaint");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 text-white">

      {/* FORM */}
      <div className="d-flex justify-content-center mb-4">
        <div className="glass card-3d p-4" style={{ width: "400px" }}>
          
          <h4 className="text-center mb-3">
            <i className="bi bi-pencil-square"></i> New Complaint
          </h4>

          <input
            className="form-control my-2"
            placeholder="Issue Type"
            value={form.issue_type}
            onChange={(e) =>
              setForm({ ...form, issue_type: e.target.value })
            }
          />

          <textarea
            className="form-control my-2"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button
            className="btn btn-success w-100 mt-2"
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="glass p-4 card-3d">
        <h4 className="mb-3">
          <i className="bi bi-list-check"></i> My Complaints
        </h4>

        <div className="table-responsive">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Issue</th>
                <th>Description</th>
                <th>Status</th>
                <th>Priority</th>
              </tr>
            </thead>

            <tbody>
              {complaints.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No complaints yet
                  </td>
                </tr>
              ) : (
                complaints.map((c, i) => (
                  <tr key={c.id}>
                    <td>{i + 1}</td>
                    <td>{c.issue_type}</td>
                    <td>{c.description}</td>
                    <td>
                      <span className="badge bg-info">
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-danger">
                        {c.priority}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default ComplaintPage;