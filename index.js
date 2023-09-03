const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT,
});
connection.connect(function (err) {
	if (err) console.log(err.message);
	console.log("Successfully connected");
});

// Simulated user data (replace this with a database)
const users = [
	{ id: 1, username: "user1", password: "password1" },
	{ id: 2, username: "user2", password: "password2" },
];

app.get("/", (req, res) => {
	res.status(200).send("Hello, World!");
});

app.post("/api/login", (req, res) => {
	const { username, password } = req.body;
	const user = users.find(
		(u) => u.username === username && u.password === password
	);

	if (user) {
		res.json({ success: true, message: "Login successful" });
	} else {
		res.status(401).json({ success: false, message: "Invalid credentials" });
	}
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
	console.log(`[INFO] Listening on http://localhost:${PORT}`);
});
