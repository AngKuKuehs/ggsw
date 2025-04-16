import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import cors from 'cors';

import userRoutes from "./routes/userRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import checkoutRoutes from "./routes/checkoutRoutes.js"

dotenv.config();
dotenv.config({ path: '.env' }); 

const port = process.env.PORT || 5000;

connectDB();

const app = express();
const frontendUrl = process.env.CLIENT_URL

app.use(cors());

// app.use(cors({
//     origin: "http://localhost:5173",  // Vite's default dev server
//     credentials: true,                // Allow cookies to be sent/received
//   }));

// app.use(cors({
//   origin: frontendUrl,
//   credentials: true,                // Allow cookies to be sent/received
// }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors({ origin: 'http://localhost:5173' }));

// api routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/checkout", checkoutRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => {
    res.send("Root");
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
