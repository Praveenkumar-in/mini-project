const router = require("express").Router();
const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateStatus,
  getAnalytics
} = require("../controllers/complaintController");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.post("/", verifyToken, createComplaint);
router.get("/my", verifyToken, getMyComplaints);
router.get("/", verifyToken, isAdmin, getAllComplaints);
router.put("/", verifyToken, isAdmin, updateStatus);
router.get("/analytics", verifyToken, isAdmin, getAnalytics);

module.exports = router;