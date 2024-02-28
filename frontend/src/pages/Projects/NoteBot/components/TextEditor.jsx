import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Stack, Menu, MenuItem, Paper, TextField, Toolbar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import DeleteIcon from '@mui/icons-material/Delete';
import ChatIcon from '@mui/icons-material/Chat';
import Chat from "./Chat"; // Importing the Chat component
import noteBotLogo from "../../../../assets/images/noteBot-logo.png"; // Importing the NoteBot logo
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

export default function TextEditor() {
    const navigate = useNavigate(); // Hook from react-router-dom for navigation
    const [title, setTitle] = useState(''); // State variable to store note title
    const [content, setContent] = useState(''); // State variable to store note content
    const [anchorEl, setAnchorEl] = useState(null); // State variable for anchor element of menu
    const [fontFamily, setFontFamily] = useState('Arial'); // State variable to store selected font family
    const [fontSize, setFontSize] = useState(12); // State variable to store selected font size
    const [open, setOpen] = useState(false); // State variable to control the visibility of a dialog
    const [openDialog, setOpenDialog] = useState(false); // State variable to control the visibility of a dialog for existing courses
    const [openNewCourseDialog, setOpenNewCourseDialog] = useState(false); // State variable to control the visibility of a dialog for creating a new course
    const [selectedCourseTitle, setSelectedCourseTitle] = useState('Select Course'); // State variable to store the selected course title
    const [newCourseTitle, setNewCourseTitle] = useState(''); // State variable to store the new course title
    const [courses, setCourses] = useState([]); // State variable to store the list of courses
    const [loading, setLoading] = useState(false); // State variable to control loading state
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState(false); // State variable to control the visibility of a delete confirmation dialog
    const [showChat, setShowChat] = useState(false); // State variable to control the visibility of the chat component

    const [sampleCourses, setSampleCourses] = useState([ // Sample list of courses (to be replaced with actual data)
        { id: 1, course: "HCI" },
        { id: 2, course: "Marketing" },
        { id: 3, course: "Math" },
        { id: 4, course: "Media Science" },
        { id: 5, course: "Programming" },
        { id: 6, course: "Statistics" },
    ]);

    // Function to handle menu click
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Function to handle menu close
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Function to handle saving the note
    const handleSaveNote = () => {
        setOpen(true);
    };

    // Function to handle closing the dialog
    const handleClose = () => {
        setOpen(false);
    };

    // Function to handle opening the delete confirmation dialog
    const handleDeleteConfirmation = () => {
      setOpenDeleteConfirmationDialog(true);
    };

    // Function to handle confirming the deletion of a note
    const handleConfirmDeleteNote = () => {
      // Add logic to delete the note from the backend
      console.log("Note deleted");
      setOpenDeleteConfirmationDialog(false); // Close the confirmation dialog after deletion
    };

    // Function to handle closing the delete confirmation dialog
    const handleCloseDeleteConfirmation = () => {
      setOpenDeleteConfirmationDialog(false);
    };

    // Function to handle adding note to an existing course
    const handleExistingCourse = () => {
        setOpenDialog(true);
    };

    // Function to handle creating a new course
    const handleCreateCourse = () => {
        setOpenNewCourseDialog(true);
    };

    // Function to handle closing the dialog for existing courses and new course creation
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setOpenNewCourseDialog(false);
    };

    // Function to handle saving a new course
    const handleSaveCourse = async () => {
        try {
            // Simulate creating a new course (replace with your actual logic)
            const newCourse = { id: courses.length + 1, course: newCourseTitle };
            setCourses([...courses, newCourse]); // Update the list of courses with the newly created course
            setNewCourseTitle(''); // Clear the course title field
        } 
        catch (error) {
            console.error('Error creating course:', error);
        } 
        finally {
            setOpenNewCourseDialog(false);
        }
    };  
    
    // Function to handle cancelling new course creation
    const handleCancelCourse = () => {
        setNewCourseTitle('');
        setOpenNewCourseDialog(false);
    };

    // Function to handle change in selected course title
    const handleSelectedCourseTitleChange = (e) => {
        setSelectedCourseTitle(e.target.value);
    };

    // Function to handle change in new course title
    const handleNewCourseTitleChange = (e) => {
        setNewCourseTitle(e.target.value);
    };

    // Function to handle change in note title
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    // Function to handle change in note content
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    // Function to toggle chat component visibility
    const toggleChat = () => {
        setShowChat(!showChat);
    };

    // Functions to redirect to different pages within the application
    const redirectToCourses = () => {
        navigate("/projects/notebot/mycourses");
    };

    const redirectToCreateNote = () => {
        navigate("/projects/notebot/createnote");
    };

    const redirectToNotes = () => {
        navigate("/projects/notebot/mynotes");
    };

    const redirectToMyFavorites = () => {
        navigate("/projects/notebot/myfavorites");
    };

    const redirectToDeleted = () => {
        navigate("/projects/notebot/deleted");
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
                            sx={{ width: "100%", pb: 2 }} />
                    </Grid>
                    {/* Header Section */}
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
                                <CreateButton redirectToCreateNote={redirectToCreateNote} />
                            </Stack>
                        </Grid>
                        <Grid item justifyContent="flex-end" spacing={2}>
                            {/* Search Bar Component */}
                            <SearchBar />
                        </Grid>
                    </Grid>
                    {/* Title and Action Buttons */}
                    <Grid item sx={{ marginTop: 4 }}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h5" gutterBottom>
                                Create Note
                            </Typography>
                            <Grid item>
                                <Button variant="contained" sx={{marginRight: 2}} onClick={handleSaveNote}>
                                    Save Note
                                </Button>
                                <IconButton onClick={handleDeleteConfirmation}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                            {/* Delete Confirmation Dialog */}
                            <Dialog open={openDeleteConfirmationDialog} onClose={handleCloseDeleteConfirmation}>
                              <DialogTitle>Delete Note</DialogTitle>
                              <DialogContent>
                                <Typography variant="body1">Are you sure you want to delete this note?</Typography>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleCloseDeleteConfirmation}>
                                    Cancel
                                </Button>
                                <Button onClick={handleConfirmDeleteNote} variant="contained" autoFocus>
                                    Confirm
                                </Button>
                              </DialogActions>
                            </Dialog>
                            {/* Dialog for Adding note to new or existing course */}
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Add Note to Course</DialogTitle>
                                <DialogContent>
                                    <Button variant="contained" sx={{ marginRight: 2 }} onClick={handleExistingCourse}>Add to Existing Course</Button>
                                    <Button variant="contained" onClick={handleCreateCourse}>Create New Course</Button>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                </DialogActions>
                            </Dialog>
                            {/* Dialog for choosing course from library */}
                            <Dialog open={openDialog} onClose={handleCloseDialog}>
                                <DialogTitle>Add to Course</DialogTitle>
                                <DialogContent>
                                    {loading ? (
                                        <CircularProgress />
                                    ) : (
                                        <FormControl fullWidth>
                                            <Select
                                                value={selectedCourseTitle}
                                                onChange={handleSelectedCourseTitleChange}>
                                                <MenuItem value="Select Course" disabled>
                                                    Select Course
                                                </MenuItem>
                                                {sampleCourses.map((course) => (
                                                    <MenuItem key={course.id} value={course.course}>
                                                        {course.course}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDialog}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSaveCourse} variant="contained" autoFocus>
                                        Save To Course
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            {/* Dialog for creating a new course */}
                            <Dialog open={openNewCourseDialog} onClose={handleCloseDialog}>
                                <DialogTitle>Create New Course</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        fullWidth
                                        label="Course Title"
                                        value={newCourseTitle}
                                        onChange={handleNewCourseTitleChange} />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCancelCourse}>Cancel</Button>
                                    <Button onClick={handleSaveCourse} variant="contained" autoFocus>
                                        Save Course
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Stack>
                    </Grid>
                    {/* Toolbar for text editing and text */}
                    <Grid item sx={{ marginTop: 4 }}>
                        <Toolbar sx={{ marginLeft: -4.5 }}>
                            <IconButton>
                                <FormatBoldIcon />
                            </IconButton>
                            <IconButton>
                                <FormatItalicIcon />
                            </IconButton>
                            <IconButton>
                                <FormatUnderlinedIcon />
                            </IconButton>
                            <FormControl sx={{ minWidth: 120 }}>
                                <Select
                                    value={fontFamily}
                                    onChange={(e) => setFontFamily(e.target.value)}>
                                    <MenuItem value="Arial">Arial</MenuItem>
                                    <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                                    {/* more fonts */}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ minWidth: 80 }}>
                                <Select
                                    value={fontSize}
                                    onChange={(e) => setFontSize(e.target.value)}>
                                    <MenuItem value={12}>12</MenuItem>
                                    <MenuItem value={14}>14</MenuItem>
                                    {/* more font sizes */}
                                </Select>
                            </FormControl>
                        </Toolbar>
                    </Grid>
                    {/* Text Fields for Note Title and Content */}
                    <Grid item sx={{ marginTop: 4 }}>
                        <Grid item sx={{ width: "100%" }}>
                            <TextField
                                fullWidth
                                placeholder="Enter Note Title"
                                value={title}
                                onChange={handleTitleChange} />
                        </Grid>
                        <Grid item sx={{ width: "100%", marginTop: 2 }}>
                            <TextField
                                fullWidth
                                multiline
                                minRows={10}
                                maxRows={20}
                                placeholder="Enter Note Content"
                                value={content}
                                onChange={handleContentChange} />
                        </Grid>
                    </Grid>
                    {/* Chatbot Icon */}
                    <ChatIcon
                        sx={{
                        position: 'fixed',
                        bottom: '60px',
                        right: '60px',
                        fontSize: '2rem',
                        color: '#2196F3', // Customize the color as needed
                        cursor: 'pointer'}}
                        onClick={toggleChat} />
                    {/* Conditionally render the Chat component based on state */}
                    {showChat && <Chat onClose={toggleChat} />}
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
export function NotesButton({ redirectToNotes }) {
    return (
        <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 8 }}>
            <Button variant="contained" onClick={redirectToNotes}>
                My Notes
            </Button>
        </Stack>
    );
}

// CoursesButton component
export function CoursesButton({ redirectToCourses }) {
    return (
        <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 8 }}>
            <Button variant="contained" onClick={redirectToCourses}>
                My Courses
            </Button>
        </Stack>
    );
}

// CreateButton component
export function CreateButton({ redirectToCreateNote }) {
    return (
        <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 8 }} >
            <Button variant="outlined" onClick={redirectToCreateNote}>
                Create Note
            </Button>
        </Stack>
    )
}
