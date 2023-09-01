const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Simulated user data (replace this with a database)
const users = [
	{ id: 1, username: "user1", password: "password1" },
	{ id: 2, username: "user2", password: "password2" },
];

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
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
