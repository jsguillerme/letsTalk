import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseMessages = Record<string, {
  author: {
    avatar: string,
    id_user: string,
    name: string
  },
  content: string,
  created_at: number,
  sent_by: string
}>;

export type MessagesTypes = {
  id: string,
  author: {
    avatar: string,
    id_user: string,
    name: string
  },
  content: string,
  created_at: number,
  sent_by: string
}


export function useRoom(roomId: string | undefined) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<MessagesTypes[]>([])
  const [title, setTitle] = useState('');
  const [ownerRoom, setOwnerRoom] = useState('');

  useEffect(() => {

    if (!user) {
      return;
    }

    const db = database.getDatabase();
    const roomRef = database.ref(db, `/rooms/${roomId}`);

    database.onValue(roomRef, (room) => {
      const databaseRoom = room.val();
      const firebaseMessages: FirebaseMessages = databaseRoom.messages ?? {};

      const parsedMessages = Object.entries(firebaseMessages).map(([key, value]) => {
        return {
          id: key,
          author: value.author,
          content: value.content,
          sent_by: value.sent_by,
          created_at: value.created_at

        }
      })
      setMessages(parsedMessages);
      setTitle(databaseRoom.title);
      setOwnerRoom(databaseRoom.authorId);
    })

    return () => {
      database.off(roomRef);
    }

  }, [roomId, user?.id])

  return { 
    messages,
    title,
    ownerRoom
  }
}