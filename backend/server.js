const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        return;
    }

    console.log("MySQL database connected successfully.");
    connection.release();
});

app.get("/", (req, res) => {
    res.json({
        message: "Denz Student Profile REST API is running"
    });
});

app.get("/api/profile", (req, res) => {
    const sql = "SELECT * FROM profile ORDER BY id DESC";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
});

app.get("/api/profile/:id", (req, res) => {
    const sql = "SELECT * FROM profile WHERE id = ?";

    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json(results[0]);
    });
});

app.post("/api/profile", (req, res) => {
    const {
        name,
        email,
        age,
        course,
        year_level,
        bio,
        skills,
        projects,
        profile_image
    } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    const sql = `
        INSERT INTO profile
        (name, email, age, course, year_level, bio, skills, projects, profile_image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        name,
        email,
        age,
        course,
        year_level,
        bio,
        skills,
        projects,
        profile_image
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: "Profile created successfully",
            id: result.insertId
        });
    });
});

app.put("/api/profile/:id", (req, res) => {
    const {
        name,
        email,
        age,
        course,
        year_level,
        bio,
        skills,
        projects,
        profile_image
    } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    const sql = `
        UPDATE profile
        SET name = ?,
            email = ?,
            age = ?,
            course = ?,
            year_level = ?,
            bio = ?,
            skills = ?,
            projects = ?,
            profile_image = ?
        WHERE id = ?
    `;

    const values = [
        name,
        email,
        age,
        course,
        year_level,
        bio,
        skills,
        projects,
        profile_image,
        req.params.id
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json({
            message: "Profile updated successfully"
        });
    });
});

app.delete("/api/profile/:id", (req, res) => {
    const sql = "DELETE FROM profile WHERE id = ?";

    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json({
            message: "Profile deleted successfully"
        });
    });
});

app.listen(PORT, () => {
    console.log(`REST API server running on http://localhost:${PORT}`);
});