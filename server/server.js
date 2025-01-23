const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ixLaq8Xe2Cjg2n!P",
  database: "students",
});

db.connect(function (err) {
  if (err) {
    return console.error("Ошибка: " + err.message);
  } else {
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});

app.post("/add_user", (req, res) => {
  sql =
    "INSERT INTO `student-details` (`name`, `email`, `age`, `gender`) VALUES (?, ?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.age, req.body.gender];

  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ message: "Student added successfully" });
  });
});

app.get("/students", (req, res) => {
  const sql = "SELECT * FROM `student-details`";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

app.get("/get_student/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `student-details` WHERE `id` = ?";
  db.query(sql, id, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

app.post("/edit_user/:id", (req, res) => {
  const id = req.params.id;
  sql =
    "UPDATE `student-details` SET `name`=?, `email`=?, `age`=?, `gender`=? WHERE `id`=?";
  const values = [
    req.body.name,
    req.body.email,
    req.body.age,
    req.body.gender,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ message: "Student added successfully" });
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  sql = "DELETE FROM `student-details` WHERE `id`=?";
  const values = [id];

  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ message: "Student added successfully" });
  });
});

app.listen(port, () => {
  console.log("listening");
});
