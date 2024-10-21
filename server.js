// 1. Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// 2. Create the Express app
const app = express();

// 3. Middleware for parsing requests
app.use(express.json()); // for parsing JSON requests
app.use(express.urlencoded({ extended: true })); // for parsing form data

// 4. Serve static files (CSS, JS, images, etc.)
app.use(express.static(__dirname)); // Serve static files from the current directory

// 5. Import your routes
const routes = require("./routes");
app.use(routes);

// 6. Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/restaurant-management", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Error connecting to MongoDB: ", err));

// 7. Define a simple route for the home page (index.html)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html")); // Change this to the correct path if needed
});

// 8. Handle 404 errors for undefined routes
app.use((req, res, next) => {
    res.status(404).send("Page not found");
});

// 9. Start the server and listen on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
