import { Card, Typography } from "@material-ui/core";
import firebase from "firebase";
import { FC, Fragment, useEffect, useState } from "react";
import { FirebaseAuth } from "../../services/firebase";
import { messageBoxStyle } from "./style";

interface MessageBoxProps {
  message: firebase.firestore.QueryDocumentSnapshot;
}

interface UserInterface {
  uid: string;
  displayName?: string;
}

const MessageBox: FC<MessageBoxProps> = ({ message }) => {
  const [user, setUser] = useState<UserInterface>();

  const [myMessage, setMyMessage] = useState(false);

  useEffect(() => {
    const userData = message.data().user as UserInterface;

    if (userData.uid === FirebaseAuth.currentUser?.uid) {
      setMyMessage(true);
    }

    setUser(userData);
  }, [message]);

  const style = messageBoxStyle();

  return (
    <Card className={myMessage ? style.sendMessage : style.receivedMessage}>
      {myMessage ? (
        <Fragment />
      ) : (
        <Typography color="primary" variant="subtitle1">
          {user?.displayName || "Anônimo"}
        </Typography>
      )}
      <Typography variant="body1">{message.data().text}</Typography>
    </Card>
  );
};

export default MessageBox;
