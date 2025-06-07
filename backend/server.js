require("dotenv").config();
const express=require("express");
const cors = require("cors");
const path=require("path");
const connectDB=require("./config/db");
const authRoutes=require("./routes/authRoutes");
const incomeRoutes=require("./routes/incomeRoutes");
const expenseRoutes=require("./routes/expenseRoutes");
const dashboardRoutes=require("./routes/dashboardRoutes");

const app=express();

app.use(cors(
    {
        origin:process.env.CLIENT_URL || "*",
        methods: ["GET","POST","PUT","DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }
));

app.use(express.json());
connectDB();
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/income",incomeRoutes);
app.use("/api/v1/expense",expenseRoutes);
app.use("/api/v1/dashboard",dashboardRoutes);
// serve Uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../frontend/expense-tracker/dist")));

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/expense-tracker/dist/index.html"));
});



const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));