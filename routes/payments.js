const express = require("express");
const { createTransaction } = require("../controllers/paymentController");
const router = express.Router();

// Endpoint untuk membuat transaksi
router.post("/create", createTransaction);

module.exports = router;
