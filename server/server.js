import express from "express";
import cookieParser from "cookie-parser";
import routes from "./src/routes/twitterRoutes.js";
import { logger } from "./src/config/logger.js";
import { PORT } from "./src/utils/env.js";
import session from "express-session";

const app = express();

app.use(
	session({
		secret: "your-secret-key", // Replace with your secret key
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true }, // Set to true if using HTTPS
	})
);
app.set("view engine", "ejs");
app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", routes);


app.listen(PORT, () =>
	logger.info(`Server is running on port: ${PORT}`)
);
