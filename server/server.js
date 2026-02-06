import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api/admin", adminAuthRoutes);
app.use("/api/admin", adminOrderRoutes);

/* DB */
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err=> console.log(err));

/* SERVER */
app.listen(process.env.PORT || 5000, ()=>{
 console.log("Server Running");
});
