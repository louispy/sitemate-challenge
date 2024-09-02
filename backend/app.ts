import express from "express";
import { Issue } from "./models/issue";

const app = express();
const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, TypeScript Node Express!");
});

let issues: Issue[] = [];

app.post("/issue", (req, res) => {
  const issue: Issue = req.body;
  console.log(issue);
  issues.push(issue);
  res.status(200).json({ message: "Success Create Issue", data: issue });
});

app.get("/issue", (req, res) => {
  res.status(200).json({ message: "Success Get Issues", data: issues });
});

app.patch("/issue/:id", (req, res) => {
  console.log("to be updated id:", req.params.id);
  const issue: Issue = req.body;
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == req.params.id) {
      issues[i] = issue;
      res.status(200).json({ message: "Success Updated", data: issue });
      return;
    }
  }
  console.log(issue);
  res.status(404).json({ message: "Data Not Found" });
});

app.delete("/issue/:id", (req, res) => {
  console.log("to be deleted id:", req.params.id);
  const result = [];

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id != req.params.id) {
      result.push(issues[i]);
    }
  }
  issues = result;
  res.status(200).json({ message: "Success Delete Issue", data: { id: req.params.id } });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
