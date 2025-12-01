require("dotenv").config();
const pool = require("../config/db");

(async () => {
  try {
    const res = await pool.query("SELECT NOW() as now");
    console.log("Connected to DB — server time:", res.rows[0].now);
    process.exit(0);
  } catch (err) {
    console.error("DB connection test failed:", err.message || err);
    process.exit(1);
  }
})();
