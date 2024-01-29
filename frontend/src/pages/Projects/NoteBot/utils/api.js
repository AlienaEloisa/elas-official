import { Backend } from "../../../../utils/apiConfig";

export const getUserInfo = async (userId) => {
  try {
    const response = await Backend.get(`/notebot/users/${userId}`);
    const {
      data: { message, user },
    } = response;

    const handleSaveNote = async (userId, noteId, title, content) => {
      try {
          const response = await Backend.post(`/notebot/users/${userId}/notes/${noteId}`, {
              title: title,
              content: content
          });
          
          if (response.status === 200) {
              // Note saved successfully, handle success scenario if needed
              console.log("Note saved successfully");
          } else {
              // Handle other status codes if needed
              console.error("Failed to save note");
          }
      } catch (error) {
          // Handle error scenario
          console.error("Error saving note:", error);
      }
  };

    return { message, user };
  } catch (err) {
    console.log(err);
    return {
      message: "Server not connected",
      user: {
        uid: "",
        name: "",
        username: "",
      },
    };
  }
};

