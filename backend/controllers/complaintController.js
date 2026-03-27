const db = require("../config/db");

// Submit Complaint
exports.createComplaint = (req, res) => {
  const { issue_type, description } = req.body;
console.log(issue_type,"error",description)
  db.query(
    "INSERT INTO complaints (user_id, issue_type, description, status) VALUES (?, ?, ?, 'Open')",
    [req.user.id, issue_type, description],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json("Complaint Submitted");
    }
  );
};

// Student: View own complaints
exports.getMyComplaints = (req, res) => {
  db.query(
    `SELECT *,
    CASE
      WHEN issue_type IN ('Water', 'Electricity') THEN 'High'
      WHEN issue_type = 'WiFi' THEN 'Medium'
      ELSE 'Low'
    END AS priority
    FROM complaints WHERE user_id = ?`,
    [req.user.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// Admin: Get all complaints
exports.getAllComplaints = (req, res) => {
  db.query(
    `SELECT *,
    CASE
      WHEN issue_type IN ('Water', 'Electricity') THEN 'High'
      WHEN issue_type = 'WiFi' THEN 'Medium'
      ELSE 'Low'
    END AS priority
    FROM complaints`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// Update Status
exports.updateStatus = (req, res) => {
  const { id, status } = req.body;

  db.query(
    "UPDATE complaints SET status=? WHERE id=?",
    [status, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json("Status Updated");
    }
  );
};

// Analytics
exports.getAnalytics = (req, res) => {
  db.query(
    `SELECT issue_type, COUNT(*) as count FROM complaints GROUP BY issue_type`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};