import React, { useEffect } from "react";
import List from "@mui/material/List";
import axios from "axios";
import "./App.css";
import { Box, Button, ListItem, Modal, TextField, Typography } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const buttonStyle = {
  margin: 10,
};

const fieldStyle = {
  margin: 10,
};

function App() {
  const [issues, setIssues] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [id, setId] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getIssues = async () => {
    const res = await axios.get("http://localhost:5000/issue");
    console.log(res.data.data);
    setIssues(res.data.data);
  };

  const createIssue = async () => {
    console.log(id, title, description);
    await axios({
      method: "POST",
      url: "http://localhost:5000/issue",
      data: {
        id,
        title,
        description,
      },
    });
    await getIssues();
    handleClose();
  };

  const updateIssue = async (toUpdate) => {
    console.log(id, title, description);
    await axios({
      method: "PATCH",
      url: "http://localhost:5000/issue/" + id,
      data: {
        id,
        title,
        description,
      },
    });
    await getIssues();
    setOpenUpdate(false);
  };

  const deleteIssue = async (toDelete) => {
    await axios({
      method: "DELETE",
      url: "http://localhost:5000/issue/" + toDelete,
      data: {
        id,
        title,
        description,
      },
    });
    await getIssues();
    setOpenUpdate(false);
  };

  const handleUpdate = (toUpdate) => {
    const { id, title, description } = toUpdate;
    setId(id);
    setTitle(title);
    setDescription(description);
    setOpenUpdate(true);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/issue").then((res) => {
      console.log(res.data);
      setIssues(res.data.data);
    });
  }, []);

  return (
    <div style={{ margin: 15 }}>
      <h1>Issues</h1>
      <List sx={{ position: "50%", width: "50%", maxWidth: 360, bgcolor: "background.paper", alignContent: "center", alignItems:"center" }}>
        {issues.map((issue, i) => (
          <ListItem key={i}>
            <Button style={buttonStyle} variant="outlined" onClick={() => handleUpdate({ id: issue.id, title: issue.title, description: issue.description })}>
              {issue.title}
            </Button>
            <br />
            <Typography variant="body1">{issue.description}</Typography>
            <Button style={buttonStyle} color="warning" onClick={() => deleteIssue(issue.id)}>
              X
            </Button>
          </ListItem>
        ))}
      </List>
      <Button style={buttonStyle} variant="contained" onClick={handleOpen}>
        Create Issue
      </Button>
      <br />
      <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={{ ...modalStyle, width: 400 }}>
          <h2>New Issue</h2>
          <TextField style={fieldStyle} label="Id" value={id} onChange={(e) => setId(e.target.value)} />
          <TextField style={fieldStyle} label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField style={fieldStyle} label="Description" rows={3} multiline value={description} onChange={(e) => setDescription(e.target.value)} />
          <br/>
          <Button style={buttonStyle} variant="contained" onClick={createIssue}>
            Submit
          </Button>
        </Box>
      </Modal>

      <Modal open={openUpdate} onClose={() => setOpenUpdate(false)} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={{ ...modalStyle, width: 400 }}>
          <h2>Update</h2>
          <TextField style={fieldStyle} label="Id" value={id} onChange={(e) => setId(e.target.value)} />
          <TextField style={fieldStyle} label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField style={fieldStyle} label="Description" rows={3} multiline value={description} onChange={(e) => setDescription(e.target.value)} />
          <br/>
          <Button style={buttonStyle} variant="contained" onClick={updateIssue}>
            Submit
          </Button>
        </Box>
      </Modal>
      <Button style={buttonStyle} variant="contained" onClick={getIssues}>
        Refresh
      </Button>
    </div>
  );
}

export default App;
