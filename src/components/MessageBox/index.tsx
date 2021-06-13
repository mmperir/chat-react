import firebase from "firebase";
import { FC, Fragment, useEffect, useState } from "react";
import { UserProps } from "../../pages/Chat";
import { FirebaseAuth } from "../../services/firebase";
import style from "./style.module.scss";

interface MessageBoxProps {
  message: firebase.firestore.QueryDocumentSnapshot;
}

const MessageBox: FC<MessageBoxProps> = ({ message }) => {
  const [user, setUser] = useState<UserProps>();

  const [myMessage, setMyMessage] = useState(false);

  useEffect(() => {
    const userData = message.data().user as UserProps;

    const uid = FirebaseAuth.currentUser?.uid;

    if (userData.uid === uid) {
      setMyMessage(true);
    }

    setUser(userData);
  }, [message]);

  return (
    <div
      className={`${style.messageBox} ${
        myMessage ? style.send : style.received
      }`}
    >
      {!myMessage ? <h1>{user?.displayName || "Anônimo"}</h1> : <Fragment />}
      <p>{message.data().text}</p>
    </div>
  );
};

export default MessageBox;
