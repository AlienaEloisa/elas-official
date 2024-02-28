import React, { useState } from "react";
import { Grid, Typography, Button, Stack, Menu, MenuItem, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import noteBotLogo from "../../../../assets/images/noteBot-logo.png";

// MyCourses component definition
export default function MyCourses() {
  // React Router hook for navigation
  const navigate = useNavigate();

  // State hooks for managing dialog open state and course title input
  const [openDialog, setOpenDialog] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');

  // State hook for managing sample courses data
  const [sampleCourses, setSampleCourses] = useState([
    { id: 1, course: "HCI" },
    { id: 2, course: "Math" },
    { id: 3, course: "Marketing" },
    { id: 4, course: "Programming" },
    { id: 5, course: "Statistics" },
    { id: 6, course: "Digital Media" },
  ]);

  // Function to handle opening the dialog for creating a new course
  const handleCreateCourse = () => {
    setOpenDialog(true);
  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to handle saving a new course
  const handleSaveCourse = () => {
    const newCourse = {
      id: sampleCourses.length + 1, // Generate a unique id based on the current length of sampleCourses
      course: courseTitle
    };

    // Update sampleCourses state with the new course
    setSampleCourses(prevCourses => [...prevCourses, newCourse]);
    
    // Close the dialog and reset the courseTitle state
    handleCloseDialog();
    setCourseTitle('');
  };
  
  // Navigation functions
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

  // State hook for anchor element in menu
  const [anchorEl, setAnchorEl] = useState(null);

  // Function to handle menu click
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // JSX rendering
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
              sx={{ width: "100%", pb: 2 }}/>
          </Grid>
          <Grid container justifyContent="space-between" spacing={2}>
            <Grid item justifyContent="flex-start">
              <Stack direction="row" justifyContent="flex-start" spacing={2}>
                {/* Navigation buttons */}
                <NotesButton redirectToNotes={redirectToNotes} />
                <CoursesButton redirectToCourses={redirectToCourses} /> 
                {/* Archive button with menu */}
                <Button variant="contained"
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
                <CreateButton variant="contained" redirectToCreateNote={redirectToCreateNote} />
              </Stack>
            </Grid>
            <Grid item justifyContent="flex-end" spacing={2}>
              {/* Search Bar Component */}
              <SearchBar />
            </Grid>
          </Grid>
          {/* Heading and button to create new course */}
          <Grid item sx={{marginTop: 4}}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h5" gutterBottom>
                My Courses
              </Typography>
              <Button variant="contained" onClick={handleCreateCourse}>
                Create New Course
              </Button>
            </Stack>
          </Grid>
          {/* Display sample courses */}
          <Grid container spacing={2} sx={{ marginTop: 4 }}>
            {sampleCourses.map((course) => (
              <Grid item key={course.id} xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ p: 2, height: "100%", backgroundColor: "#f5f5f5", position: 'relative' }}>
                  <Typography variant="h6">{course.course}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      {/* Create Course Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create New Course</DialogTitle>
        <DialogContent>
          <TextField
            label="Course Title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            fullWidth />
        </DialogContent>
        <DialogActions sx={{justifyContent: "space-between"}} >
          <Button sx={{marginLeft:2}} onClick={handleCloseDialog}>Cancel</Button>
          <Button sx={{marginRight:2}} onClick={handleSaveCourse} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
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
      <Button variant="outlined" onClick={redirectToCourses}>
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
