import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Stack, Menu, MenuItem, Paper, TextField } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';

import noteBotLogo from "../../../../assets/images/noteBot-logo.png";

const sampleCourses = [
  { id: 1, title: "Course 1", content: "Content for Course 1" },
  { id: 2, title: "Course 2", content: "Content for Course 2" },
  { id: 3, title: "Course 3", content: "Content for Course 3" }, 
]

export default function MyCourses() {
  const navigate = useNavigate();
  
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
            <Typography variant="h5" gutterBottom>
              My Courses
            </Typography>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: 4 }}>
            {sampleCourses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2, height: "100%", backgroundColor: "#f5f5f5" }}>
              <Typography variant="h6">{course.title}</Typography>
              <Typography>{course.content}</Typography>
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
  useEffect(() => {
    axios
        .get('globalNotes.html')
        .then((response)=> {
          setPosts(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      }, []);

  return (
    <TextField
      variant="standard"
      placeholder="Search..."
      sx={{ width: 200 }} // Adjust the width based on your design
    />
  );
}

export function NotesButton({redirectToNotes}) {
  useEffect(() => {
    axios
        .get('userNotes.html')
        .then((response)=> {
          setPosts(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      }, []);

  return (
    <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 8 }}>
      <Button variant="contained" onClick={redirectToNotes}>
        My Notes
      </Button>
    </Stack>
  );
}

export function CoursesButton({redirectToCourses}) {
  useEffect(() => {
    axios
        .get('userCourses.html')
        .then((response)=> {
          setPosts(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      }, []);

  return (
    <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 8 }}>
      <Button variant="outlined" onClick={redirectToCourses}>
        My Courses
      </Button>
    </Stack>
  );
}

export function CreateButton({redirectToCreateNote}) {
  useEffect(() => {
    axios
        .get('latestInput.html')
        .then((response)=> {
          setPosts(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      }, []);

  return (
    <Stack direction="row" justifyContent="center" spacing={2} sx={{mt: 8}} >
      <Button variant="contained" onClick={redirectToCreateNote}>
        Create Note
      </Button>
    </Stack>
  )
}
