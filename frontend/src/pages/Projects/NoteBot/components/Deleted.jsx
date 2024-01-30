import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Stack, Menu, MenuItem, Paper, TextField } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';

import noteBotLogo from "../../../../assets/images/noteBot-logo.png";

export default function MyArchive() {
  const navigate = useNavigate();
  const [deletedNotes, setDeletedNotes] = useState([]);
  
  const redirectToCourses = () => {
    navigate("/projects/notebot/mycourses")
  };
  
  const redirectToCreateNote = () => {
    navigate("/projects/notebot/createnote")
  }

  const redirectToNotes = () => {
    navigate("/projects/notebot/mynotes")
  };

  const redirectToMyFavorites = () => {
    navigate("/projects/notebot/myfavorites");
  };

  const redirectToDeleted = () => {
    navigate("/projects/notebot/deleted");
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const [sampleNotes, setSampleNotes] = useState([
    { id: 1, title: "Note 1", content: "Content for Note 1", course: "course 1", favorite: false, deleted: false, restored: false },
    { id: 2, title: "Note 2", content: "Content for Note 2", course: "course 1", favorite: false, deleted: false, restored: false },
    { id: 3, title: "Note 3", content: "Content for Note 3", course: "course 1", favorite: false, deleted: false, restored: false },
    { id: 4, title: "Note 4", content: "Content for Note 4", course: "course 2", favorite: false, deleted: false, restored: false },
    { id: 5, title: "Note 5", content: "Content for Note 5", course: "course 2", favorite: false, deleted: false, restored: false },
    { id: 6, title: "Note 6", content: "Content for Note 6", course: "course 2", favorite: false, deleted: false, restored: false },
    { id: 7, title: "Note 7", content: "Content for Note 7", course: "course 3", favorite: false, deleted: false, restored: false },
    { id: 8, title: "Note 8", content: "Content for Note 8", course: "course 3", favorite: false, deleted: false, restored: false },
    { id: 9, title: "Note 9", content: "Content for Note 9", course: "course 3", favorite: false, deleted: false, restored: false },
    { id: 10, title: "Note 10", content: "Content for Note 10", course: "course 4", favorite: false, deleted: false, restored: false },
]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let deletedNotes = JSON.parse(sessionStorage.getItem("notebot-deleted-notes"));
    setDeletedNotes(deletedNotes);
  }, []);

  const restoreNote = (noteId) => {
    const restoredNote = deletedNotes.find(note => note.id === noteId);
    if (restoredNote) {
      const updatedDeletedNotes = deletedNotes.filter(note => note.id !== noteId);
      setDeletedNotes(updatedDeletedNotes);
      sessionStorage.setItem("notebot-deleted-notes", JSON.stringify(updatedDeletedNotes));
  
      const updatedSampleNotes = [...sampleNotes, { ...restoredNote, deleted: false }];
      setSampleNotes(updatedSampleNotes);
      sessionStorage.setItem("notebot-notes", JSON.stringify(updatedSampleNotes));
    }
  };

  return (
    <Grid container justifyContent="center" sx={{ py: 4, px: 2 }}>
      <Grid container sx={{ maxWidth: 1500, width: "100%" }} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent={"center"}>
            <Grid
              item
              component="img"
              src={noteBotLogo}
              alt="NoteBot Logo"
              xs={12}
              sm={7}
              md={4}
              sx={{ width: "100%", pb: 2 }}
            />
          </Grid>

          <Grid container justifyContent="space-between" spacing={2}>
          <Grid item justifyContent="flex-start">
              <Stack direction="row" justifyContent="flex-start" spacing={2}>
              <NotesButton redirectToNotes={redirectToNotes} />
              <CoursesButton redirectToCourses={redirectToCourses} /> 
               <Button variant="outlined"
               endIcon={<KeyboardArrowDownIcon />}
               onClick={handleMenuClick}>
                Archive
                </Button>
                <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}>
                <MenuItem onClick={redirectToMyFavorites}>Favorite Notes</MenuItem>
                <MenuItem onClick={redirectToDeleted}>Recently Deleted</MenuItem>
              </Menu>
              <CreateButton redirectToCreateNote={redirectToCreateNote} />
              </Stack>
            </Grid>
            <Grid item justifyContent="flex-end" spacing={2}>
                {/* Search Bar Component */}
                <SearchBar />
              </Grid>
          </Grid>
          <Grid item sx={{marginTop: 4}}>
            <Typography variant="h5" gutterBottom>
              Recently Deleted
            </Typography>
          </Grid>
          {/* Display recently deleted notes */}
          <Grid container spacing={2} sx={{ marginTop: 4 }}>
          {deletedNotes?.map((note) => (
          <Grid item key={note.id} xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2, height: "100%", backgroundColor: "#f5f5f5", position: 'relative' }}>
              <Typography variant="h6">{note.title}</Typography>
              <Typography>{note.content}</Typography>
              <Button sx={{marginTop: 2, marginLeft: -0.5}} variant="contained" onClick={() => restoreNote(note.id)}>
                Restore Note
              </Button>
              </Paper>
            </Grid>
          ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function SearchBar() {
    return (
      <TextField
        variant="standard"
        placeholder="Search..."
        sx={{ width: 200 }}
      />
    );
  }

export function NotesButton({redirectToNotes}) {
  return (
    <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 8 }}>
      <Button variant="contained" onClick={redirectToNotes}>
        My Notes
      </Button>
    </Stack>
  );
}

export function CoursesButton({redirectToCourses}) {
  return (
    <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 8 }}>
      <Button variant="contained" onClick={redirectToCourses}>
        My Courses
      </Button>
    </Stack>
  );
}

export function CreateButton({redirectToCreateNote}) {
  return (
    <Stack direction="row" justifyContent="center" spacing={2} sx={{mt: 8}} >
      <Button variant="contained" onClick={redirectToCreateNote}>
        Create Note
      </Button>
    </Stack>
  )
}
