import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Stack, Menu, MenuItem, Paper, TextField } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';

import noteBotLogo from "../../../../assets/images/noteBot-logo.png";

// MyArchive component definition
export default function MyArchive() {
  // React Router hook for navigation
  const navigate = useNavigate();
  
  // State hook for storing deleted notes
  const [deletedNotes, setDeletedNotes] = useState([]);

  // State hook for anchor element in menu
  const [anchorEl, setAnchorEl] = useState(null);

  // Sample notes data
  const [sampleNotes, setSampleNotes] = useState([
    { id: 1, title: "HCI 1", content: "Vorlesung 1: Die visuelle Wahrnehmung...", course: "course 1", favorite: false, deleted: false, restored: false },
    { id: 2, title: "Math 1", content: "Vorlesung 1: Grundlegende Rechenstrukturen...", course: "course 1", favorite: false, deleted: false, restored: false },
    { id: 3, title: "Math 2", content: "Vorlesung 2: Kurvendiskussion...", course: "course 1", favorite: false, deleted: false, restored: false },
    { id: 4, title: "Programming 1", content: "Vorlesung 1: Hello World...", course: "course 2", favorite: false, deleted: false, restored: false },
    { id: 5, title: "HCI summary", content: "Zusammenfassung HCI SS23", course: "course 2", favorite: false, deleted: false, restored: false },
    { id: 6, title: "Math summary", content: "Zusammenfassung Mathe SS23", course: "course 2", favorite: false, deleted: false, restored: false },
    { id: 7, title: "Marketing", content: "1. Grundlagen des Marketings...", course: "course 3", favorite: false, deleted: false, restored: false },
    { id: 8, title: "Programming 2", content: "Vorlesung 2: if-Bedingungen...", course: "course 3", favorite: false, deleted: false, restored: false },
    { id: 9, title: "Statistics", content: "Statistik 1 mit Jamovi...", course: "course 3", favorite: false, deleted: false, restored: false },
    { id: 10, title: "Digital Media", content: "Vorlesung 1: Digitale Medien...", course: "course 4", favorite: false, deleted: false, restored: false },
  ]);

  // Function to redirect to courses page
  const redirectToCourses = () => {
    navigate("/projects/notebot/mycourses")
  };

  // Function to redirect to create note page
  const redirectToCreateNote = () => {
    navigate("/projects/notebot/createnote")
  }

  // Function to redirect to notes page
  const redirectToNotes = () => {
    navigate("/projects/notebot/mynotes")
  };

  // Function to redirect to favorites page
  const redirectToMyFavorites = () => {
    navigate("/projects/notebot/myfavorites");
  };

  // Function to redirect to deleted notes page
  const redirectToDeleted = () => {
    navigate("/projects/notebot/deleted");
  };

  // Function to handle menu click
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Function to restore a deleted note
  const restoreNote = (noteId) => {
    // Find the note to be restored
    const restoredNote = deletedNotes.find(note => note.id === noteId);
    if (restoredNote) {
      // Filter out the restored note from deleted notes
      const updatedDeletedNotes = deletedNotes.filter(note => note.id !== noteId);
      setDeletedNotes(updatedDeletedNotes);
      // Update deleted notes in session storage
      sessionStorage.setItem("notebot-deleted-notes", JSON.stringify(updatedDeletedNotes));
  
      // Add the restored note to sample notes
      const updatedSampleNotes = [...sampleNotes, { ...restoredNote, deleted: false }];
      setSampleNotes(updatedSampleNotes);
      // Update sample notes in session storage
      sessionStorage.setItem("notebot-notes", JSON.stringify(updatedSampleNotes));
    }
  };

  // Fetch deleted notes from session storage on component mount
  useEffect(() => {
    let deletedNotes = JSON.parse(sessionStorage.getItem("notebot-deleted-notes"));
    setDeletedNotes(deletedNotes);
  }, []);

  // JSX rendering
  return (
    <Grid container justifyContent="center" sx={{ py: 4, px: 2 }}>
      <Grid container sx={{ maxWidth: 1500, width: "100%" }} spacing={2}>
        <Grid item xs={12}>
          {/* Header section */}
          <Grid container justifyContent={"center"}>
            <Grid
              item
              component="img"
              src={noteBotLogo}
              alt="NoteBot Logo"
              xs={12}
              sm={7}
              md={4}
              sx={{ width: "100%", pb: 2 }} />
          </Grid>
          {/* Navigation buttons */}
          <Grid container justifyContent="space-between" spacing={2}>
            <Grid item justifyContent="flex-start">
              <Stack direction="row" justifyContent="flex-start" spacing={2}>
                {/* Buttons for navigation */}
                <NotesButton redirectToNotes={redirectToNotes} />
                <CoursesButton redirectToCourses={redirectToCourses} /> 
                {/* Archive button with menu */}
                <Button variant="outlined"
                  endIcon={<KeyboardArrowDownIcon />}
                  onClick={handleMenuClick}>
                    Archive
                </Button>
                {/* Menu for archive options */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}>
                  <MenuItem onClick={redirectToMyFavorites}>Favorite Notes</MenuItem>
                  <MenuItem onClick={redirectToDeleted}>Recently Deleted</MenuItem>
                </Menu>
                {/* Button to create a new note */}
                <CreateButton redirectToCreateNote={redirectToCreateNote} />
              </Stack>
            </Grid>
            {/* Search bar */}
            <Grid item justifyContent="flex-end" spacing={2}>
              <SearchBar />
            </Grid>
          </Grid>
          {/* Title for recently deleted notes */}
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
                  {/* Button to restore a deleted note */}
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

// SearchBar component
function SearchBar() {
  return (
    <TextField
      variant="standard"
      placeholder="Search..."
      sx={{ width: 200 }} />
  );
}

// NotesButton component
export function NotesButton({redirectToNotes}) {
  return (
    <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 8 }}>
      <Button variant="contained" onClick={redirectToNotes}>
        My Notes
      </Button>
    </Stack>
  );
}

// CoursesButton component
export function CoursesButton({redirectToCourses}) {
  return (
    <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 8 }}>
      <Button variant="contained" onClick={redirectToCourses}>
        My Courses
      </Button>
    </Stack>
  );
}

// CreateButton component
export function CreateButton({redirectToCreateNote}) {
  return (
    <Stack direction="row" justifyContent="center" spacing={2} sx={{mt: 8}} >
      <Button variant="contained" onClick={redirectToCreateNote}>
        Create Note
      </Button>
    </Stack>
  )
}
