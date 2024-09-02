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
  res.status(200).json({ message: "Success", data: issue });
});

app.get("/issue", (req, res) => {
  console.log([mockIssue]);
  res.status(200).json({ message: "Success", data: [mockIssue] });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
