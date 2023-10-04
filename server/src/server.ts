import "express-async-errors";

import express from "express";
import cors from "cors";

import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(8000, () => {
	console.log("🚀 HTTP Server running at localhost:8000");
});

app.use(errorHandler);
