import express from "express";
import { Issue } from "./models/issue";
import { mockIssue } from "./mocks/mockIssue";

const app = express();
const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, TypeScript Node Express!");
});

app.post("/issue", (req, res) => {
  const issue: Issue = req.body;
  console.log(issue);
  res.status(200).json({ message: "Success Create Issue", data: issue });
});

app.get("/issue", (req, res) => {
  console.log([mockIssue]);
  res.status(200).json({ message: "Success Get Issues", data: [mockIssue] });
});

app.patch("/issue/:id", (req, res) => {
  console.log('to be updated id:', req.params.id);
  const issue: Issue = req.body;
  console.log(issue);
  res.status(200).json({ message: "Success Updated", data: issue });
});

app.delete("/issue/:id", (req, res) => {
  console.log('to be deleted id:', req.params.id);
  res.status(200).json({ message: "Success Delete Issue", data: { id: req.params.id } });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
