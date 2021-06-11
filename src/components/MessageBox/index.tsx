import { Card, Typography } from "@material-ui/core";
import firebase from "firebase";
import { FC, useEffect, useState } from "react";
import { FirebaseAuth, FirebaseFirestore } from "../../services/firebase";
import { messageBoxStyle } from "./style";

interface MessageBoxProps {
  message: firebase.firestore.QueryDocumentSnapshot;
}

interface UserInterface {
  name?: string;
}

const MessageBox: FC<MessageBoxProps> = ({ message }) => {
  const [user, setUser] = useState<UserInterface>({});

  const [myMessage, setMyMessage] = useState(false);

  useEffect(() => {
    const userId = message.data().user as string;

    if (userId === FirebaseAuth.currentUser?.uid) {
      setMyMessage(true);
    }

    FirebaseFirestore.collection("users")
      .doc(userId)
      .get()
      .then((document) => {
        const name = document.data()?.name as string;
        setUser({ name });
      });
  }, [message]);

  const style = messageBoxStyle();

  return (
    <Card className={myMessage ? style.sendMessage : style.receivedMessage}>
      <Typography variant="subtitle1">{user.name || "Anônimo"}</Typography>
      <Typography variant="body1">{message.data().text}</Typography>
    </Card>
  );
};

export default MessageBox;
