const express = require("express");
const mongoose = require("mongoose");

const Task = require("./models/task");

const app = express();

mongoose
  .connect("mongodb+srv://nour:EqtwcHZVuA9bBh7T@cluster0.dpgxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

// app.use((req, res, next) => {
//   res.send("hello from express!");
//   next();
// });
// let list = [
//   { id: 0, date: "2021-09-13", content: "task1", completed: false },
//   { id: 2, date: "2021-09-13", content: "task2", completed: true },
//   { id: 3, date: "2021-09-29", content: "task 8", completed: false },
//   { id: 4, date: "2021-09-15", content: "thank you", completed: false },
// ];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");

  next();
});

app.post("/api/list", (req, res) => {
  // const task = req.body;
  const task = new Task({
    content: req.body.content,
    date: req.body.date,
  });
  // console.log(task);
  task.save().then((createdTask) => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdTask._id,
    });
  });
  // list.push(task);
});

app.get("/api/list", (req, res) => {
  Task.find().then((documents) => {
    res.status(200).json({
      message: "list fetched successfully",
      list: documents,
    });
  });
});

app.delete("/api/list/:id", (req, res) => {
  Task.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(202).json({
      message: "Task DELETED ",
    });
  });
});

app.put("/api/list/:id", (req, res) => {
  // const id = req.params.id;
  Task.updateOne(
    { _id: req.params.id },
    {
      content: req.body.content,
      date: req.body.date,
    }
  ).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "update the task successfuly",
    });
  });
});

app.put("/api/item/:id", (req, res) => {
  // const task = req.body;
  // const id = req.params.id;
  // console.log(task);
  // list = list.filter((v) => v.id != id);
  // list = list.map((v) => {
  //   if (v.id == id) v = task;

  //   return v;
  // });

  console.log(req.body);
  Task.updateOne(
    { _id: req.params.id },
    {
      completed: !req.body.completed,
    }
  ).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "update the task state",
    });
  });
});

module.exports = app;
