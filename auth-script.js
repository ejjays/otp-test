// Import necessary Firebase functions
import {
  getDatabase,
  ref,
  onValue,
  set,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Function to monitor the Firebase Realtime Database for incoming messages
export function monitorFirebaseRealtime(rtdb) {
  const messageRef = ref(rtdb, "messages");
  onValue(messageRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const messageContainer = document.getElementById("message-container");
      messageContainer.innerHTML = `<p>New message received: ${data.message}</p>`;
      sendMessageToFirestore(data.message);
    }
  });
}

// Function to send the received message to Firestore
export async function sendMessageToFirestore(message) {
  try {
    const db = getFirestore();
    await addDoc(collection(db, "messages"), { message });
    console.log("Message added to Firestore");
  } catch (error) {
    console.error("Error adding message to Firestore:", error);
  }
}