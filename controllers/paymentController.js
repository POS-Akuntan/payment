const midtransClient = require("midtrans-client");

// Inisialisasi Midtrans client
const snap = new midtransClient.Snap({
  isProduction: false, // Set ke `true` untuk produksi
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

// Fungsi untuk membuat transaksi
const createTransaction = async (req, res) => {
  try {
    const { order_id, gross_amount, item_details, customer_details } = req.body;

    // Data untuk Snap Midtrans
    const transactionParams = {
      transaction_details: {
        order_id,
        gross_amount,
      },
      item_details,
      customer_details,
    };

    // Buat token transaksi
    const transaction = await snap.createTransaction(transactionParams);

    res.status(200).json({
      token: transaction.token,
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({
      message: "Failed to create transaction.",
      error: error.message,
    });
  }
};

module.exports = {
  createTransaction,
};
