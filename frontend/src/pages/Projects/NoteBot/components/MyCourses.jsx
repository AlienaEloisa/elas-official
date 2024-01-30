import React, { useState } from "react";
import { Grid, Typography, Button, Stack, Menu, MenuItem, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import noteBotLogo from "../../../../assets/images/noteBot-logo.png";
// import axios from "axios";

export default function MyCourses() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');

  const [sampleCourses, setSampleCourses] = useState([
    { id: 1, course: "HCI" },
    { id: 2, course: "Math" },
    { id: 3, course: "Marketing" },
    { id: 4, course: "Programming" },
    { id: 5, course: "Statistics" },
    { id: 6, course: "Digital Media" },
  ]);

  const handleCreateCourse = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveCourse = () => {
    // Create a new course object with a unique id and the entered course title
    const newCourse = {
      id: sampleCourses.length + 1, // Generate a unique id based on the current length of sampleCourses
      course: courseTitle
    };

    setSampleCourses(prevCourses => [...prevCourses, newCourse]);

  // Close the dialog and reset the courseTitle state
    handleCloseDialog();
    setCourseTitle('');
  };
  
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

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
              <CreateButton variant="contained" redirectToCreateNote={redirectToCreateNote} />
              </Stack>
            </Grid>
          <Grid item justifyContent="flex-end" spacing={2}>
                {/* Search Bar Component */}
                <SearchBar />
            </Grid>
            </Grid>
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
          <Grid container spacing={2} sx={{ marginTop: 4 }}>
              {sampleCourses
              .map((course) => (
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
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{justifyContent: "space-between"}} >
          <Button sx={{marginLeft:2}} onClick={handleCloseDialog}>Cancel</Button>
          <Button sx={{marginRight:2}} onClick={handleSaveCourse} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

function SearchBar() {
  return (
    <TextField
      variant="standard"
      placeholder="Search..."
      sx={{ width: 200 }} // Adjust the width based on your design
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
      <Button variant="outlined" onClick={redirectToCourses}>
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