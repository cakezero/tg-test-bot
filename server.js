// import * as dotenv from "dotenv"
import express from "express"
// import mongoose from "mongoose"
// import cookieParser from "cookie-parser"
// import appRoutes from './src/routes/appRoutes'

// dotenv.config();

const app = express();

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser())

const PORT = 7000

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))

const userDict = {
	username: "molley",
	password: "bright23",
};

app.post('/login', (req, res) => {
	const { username, password } = req.body;

	if (username === userDict.username && password === userDict.password)
		return res.json({ username });

	return res.json({ error: "User does not exist" });
});

app.get('/login', (req, res) => {
  const id = req.query.id
	res.render("login", { id });
});
