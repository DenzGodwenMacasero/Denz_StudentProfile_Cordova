const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
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

const sessions = new Map();

db.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        return;
    }

    console.log("MySQL database connected successfully.");
    connection.release();
});

function authenticate(req, res, next) {
    const authorization = req.headers.authorization || "";

    if (!authorization.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }

    const token = authorization.substring(7);
    const studentId = sessions.get(token);

    if (!studentId) {
        return res.status(401).json({
            message: "Invalid or expired session"
        });
    }

    req.studentId = studentId;
    req.token = token;
    next();
}

app.get("/", (req, res) => {
    res.json({
        message: "Denz Student Profile REST API is running"
    });
});

app.post("/api/login", (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({
            message: "Student ID or Email and Password are required"
        });
    }

    const sql = `
        SELECT
            sa.student_id,
            sa.email,
            sa.password_hash,
            p.id AS profile_id
        FROM student_accounts sa
        INNER JOIN profile p ON sa.profile_id = p.id
        WHERE sa.student_id = ? OR sa.email = ?
        LIMIT 1
    `;

    db.query(sql, [identifier, identifier], async (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid Student ID/Email or Password"
            });
        }

        const account = results[0];
        const passwordMatch = await bcrypt.compare(
            password,
            account.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid Student ID/Email or Password"
            });
        }

        const token = crypto.randomBytes(32).toString("hex");

        sessions.set(token, account.student_id);

        res.json({
            message: "Login successful",
            token,
            student_id: account.student_id
        });
    });
});

app.post("/api/logout", authenticate, (req, res) => {
    sessions.delete(req.token);

    res.json({
        message: "Logout successful"
    });
});

app.get("/api/profile/me", authenticate, (req, res) => {
    const sql = `
        SELECT
            id,
            student_id,
            name,
            email,
            age,
            course,
            year_level,
            bio,
            skills,
            projects,
            profile_image,
            created_at,
            updated_at
        FROM profile
        WHERE student_id = ?
    `;

    db.query(sql, [req.studentId], (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.json(results[0]);
    });
});

app.put("/api/profile/me", authenticate, (req, res) => {
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

    if (!name || !course || !year_level || !bio || !skills) {
        return res.status(400).json({
            message: "Name, Course, Year Level, About Me, and Skills are required"
        });
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
        WHERE student_id = ?
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
        req.studentId
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.json({
            message: "Profile updated successfully"
        });
    });
});

app.post("/api/profile", authenticate, (req, res) => {
    const {
        student_id,
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

    if (!student_id || !name || !course || !year_level) {
        return res.status(400).json({
            message: "Student ID, Name, Course, and Year Level are required"
        });
    }

    const sql = `
        INSERT INTO profile
        (student_id, name, email, age, course, year_level, bio, skills, projects, profile_image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        student_id,
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
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.status(201).json({
            message: "Profile created successfully",
            id: result.insertId
        });
    });
});

app.get("/api/profile", authenticate, (req, res) => {
    const sql = "SELECT * FROM profile ORDER BY id DESC";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json(results);
    });
});

app.get("/api/profile/:id", authenticate, (req, res) => {
    const sql = "SELECT * FROM profile WHERE id = ?";

    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.json(results[0]);
    });
});

app.delete("/api/profile/:id", authenticate, (req, res) => {
    const sql = "DELETE FROM profile WHERE id = ?";

    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.json({
            message: "Profile deleted successfully"
        });
    });
});

app.listen(PORT, () => {
    console.log(`REST API server running on http://localhost:${PORT}`);
});