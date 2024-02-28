import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Stack, Menu, MenuItem, Paper, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
// import axios from "axios"; // Import axios for making HTTP requests

import noteBotLogo from "../../../../assets/images/noteBot-logo.png";

export default function MyNotes() {
  const navigate = useNavigate(); // Hook from react-router-dom for navigation
  
  // Functions to redirect to different pages
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

  // State variables initialization
  const [anchorEl, setAnchorEl] = useState(null);
  const [favoriteNotes, setFavoriteNotes] = useState([]); // State variable to store favorite notes
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State variable to control the delete confirmation dialog
  const [noteToDelete, setNoteToDelete] = useState(null); // State variable to store the note to be deleted
  const [deletedNotes, setDeletedNotes] = useState([]); // State variable to store deleted notes
  const [snackbarFavoritesOpen, setSnackbarFavoritesOpen] = useState(false); // State variable to control the Favorites Snackbar
  const [snackbarDeleteOpen, setSnackbarDeleteOpen] = useState(false); // State variable to control the Delete Snackbar

  // Event handlers for the Menu component
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  // Initialize sampleNotes state with initial data
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

  // useEffect hook to retrieve notes from session storage on component mount
  useEffect(() => {
    const storedNotes = JSON.parse(sessionStorage.getItem("notebot-notes"));
    setSampleNotes(storedNotes || []);
  }, []);

  // useEffect hook to retrieve favorite notes from session storage on component mount
  useEffect(() => {
    const storedFavNotes = JSON.parse(sessionStorage.getItem("notebot-favnotes"));
    setFavoriteNotes(storedFavNotes || []);
  }, []);

  // useEffect hook to retrieve deleted notes from session storage on component mount
  useEffect(() => {
    const storedDeletedNotes = JSON.parse(sessionStorage.getItem("notebot-deleted-notes"));
    setDeletedNotes(storedDeletedNotes || []);
  }, []);

  // Function to open the delete confirmation dialog for a specific note
  const openDeleteDialog = (note) => {
    setNoteToDelete(note);
    setDeleteDialogOpen(true);
  };

  // Function to close the delete confirmation dialog
  const closeDeleteDialog = () => {
    setNoteToDelete(null);
    setDeleteDialogOpen(false);
  };

  // Function to confirm the deletion of a note
  const confirmDelete = () => {
    if (noteToDelete.deleted) {
      // If the note is already deleted, handle accordingly (e.g., show a message)
      console.log("Note has already been deleted.");
      return;
    }
    
    // Update the note's deleted status in the sampleNotes array
    const updatedNotes = sampleNotes.map((note) => {
      if (note.id === noteToDelete.id) {
        return { ...note, deleted: true };
      }
      return note;
    });

    // Update the deletedNotes array with the deleted note
    const updatedDeletedNotes = [...deletedNotes, { ...noteToDelete, deleted: true }];
    setDeletedNotes(updatedDeletedNotes); // Update deletedNotes state
    sessionStorage.setItem("notebot-deleted-notes", JSON.stringify(updatedDeletedNotes)); // Store updated deleted notes in session storage

    // Update sampleNotes state and store in session storage
    setSampleNotes(updatedNotes);
    sessionStorage.setItem("notebot-notes", JSON.stringify(updatedNotes));

    // Show Snackbar for delete confirmation
    setSnackbarDeleteOpen(true);

    // Close the delete confirmation dialog
    closeDeleteDialog();
  };

  // Function to add or remove a note from favorites
  const addToFavorites = (note) => {
    const isNoteInFavorites = favoriteNotes.some((favNote) => favNote.id === note.id);
  
    if (!isNoteInFavorites) {
      // Add the note to favorites
      setFavoriteNotes((prevNotes) => {
        let tempFav = [...prevNotes, note];
        sessionStorage.setItem("notebot-favnotes", JSON.stringify(tempFav)); // Store updated favorite notes in session storage
        return tempFav;
      });
      setSnackbarFavoritesOpen(true); // Show Snackbar for favorites confirmation
    } 
    else {
      // Remove the note from favorites
      setFavoriteNotes((prevNotes) => {
        let tempFav = prevNotes.filter((n) => n.id !== note.id);
        sessionStorage.setItem("notebot-favnotes", JSON.stringify(tempFav)); // Store updated favorite notes in session storage
        return tempFav;
      });
    }
  };
  
  // Close Snackbar for favorites confirmation
  const closeSnackbarFavorites = () => {
    setSnackbarFavoritesOpen(false);
  };

  // Close Snackbar for delete confirmation
  const closeSnackbarDelete = () => {
    setSnackbarDeleteOpen(false);
  };

  return (
    <Grid container justifyContent="center" sx={{ py: 4, px: 2 }}>
      <Grid container sx={{ maxWidth: 1500, width: "100%" }} spacing={2}>
        <Grid item xs={12}>
          {/* NoteBot Logo */}
          <Grid container justifyContent={"center"}>
            <Grid
              item
              component="img"
              src={noteBotLogo}
              alt="NoteBot Logo"
              xs={12}
              sm={7}
              md={4}
              sx={{ width: "100%", pb: 2 }}/>
          </Grid>

          {/* Header with navigation buttons */}
          <Grid container justifyContent="space-between" spacing={2}>
            <Grid item justifyContent="flex-start">
              <Stack direction="row" justifyContent="flex-start" spacing={2}>
                <NotesButton redirectToNotes={redirectToNotes} />
                <CoursesButton redirectToCourses={redirectToCourses} /> 
                {/* Archive menu */}
                <Button variant="contained"
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

          {/* Title */}
          <Grid item sx={{marginTop: 4}}>
            <Typography variant="h5" gutterBottom>
              My Notes
            </Typography>
          </Grid>

          {/* Grid container for displaying notes */}
          <Grid container spacing={2} sx={{ marginTop: 4, marginLeft: 0.5 }}>
            {/* Map through sampleNotes array and render Paper component for each note */}
            {sampleNotes
              .filter(note => !note.deleted) // Filter out deleted notes
              .map((note) => (
              <Grid item key={note.id} xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ p: 2, height: "100%", backgroundColor: "#f5f5f5", position: 'relative' }}>
                  <Typography variant="h6">{note.title}</Typography>
                  <Typography>{note.content}</Typography>
                  {/* Favorite icon button */}
                  <IconButton sx={{ position: 'absolute', top: 0, right: 0, color: favoriteNotes.some((favNote) => favNote.id === note.id) ? 'red' : 'gray' }}
                    onClick={() => addToFavorites(note)}>
                    <FavoriteIcon />
                  </IconButton>
                  {/* Delete icon button */}
                  <IconButton sx={{ position: 'absolute', bottom: 0, right: 0, color: 'gray' }}
                    onClick={() => openDeleteDialog(note)}>
                    <DeleteIcon />
                  </IconButton>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Delete Confirmation Dialog */}
          <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this note?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDeleteDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={confirmDelete} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar for Favorites Confirmation */}
          <Snackbar
            open={snackbarFavoritesOpen}
            autoHideDuration={3000}
            onClose={closeSnackbarFavorites}
            message="Note added to favorites!"/>

          {/* Snackbar for Delete Confirmation */}
          <Snackbar
            open={snackbarDeleteOpen}
            autoHideDuration={3000}
            onClose={closeSnackbarDelete}
            message="Note deleted successfully!"/>
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
      <Button variant="outlined" onClick={redirectToNotes}>
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
