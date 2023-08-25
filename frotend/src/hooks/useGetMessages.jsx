// Importing necessary modules
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

// Custom hook for fetching messages between users
export const useGetMessages = () => {
  // Using the useAuthContext hook to access user data
  const { user } = useAuthContext();

  // Function to get messages between two users
  const getMessages = async (user1, user2) => {
    // Encoding the usernames for URL
    const encodedUser1 = encodeURIComponent(user1);
    const encodedUser2 = encodeURIComponent(user2);

    // Fetching messages from the server
    const response = await fetch(
      `http://localhost:4000/user/messages?user1=${encodedUser1}&user2=${encodedUser2}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    // Parsing response to JSON
    const json = await response.json();
    return json.messages;
  };

  // Returning the function for use
  return { getMessages };
};
