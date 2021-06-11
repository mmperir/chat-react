import { Container, Grid, IconButton, TextField } from "@material-ui/core";
import { PowerOffOutlined, Send } from "@material-ui/icons";
import firebase from "firebase";
import { FC, FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MessageBox from "../../components/MessageBox";
import { FirebaseAuth, FirebaseFirestore } from "../../services/firebase";

const Chat: FC = () => {
  const [messagesList, setMessagesList] =
    useState<firebase.firestore.QueryDocumentSnapshot[]>();
  const [text, setText] = useState("");

  const history = useHistory();

  useEffect(() => {
    FirebaseFirestore.collection("messages")
      .orderBy("timestamp")
      .onSnapshot((querySnapshot) => {
        setMessagesList(querySnapshot.docs);
      });
  }, []);

  async function sendMessage(e: FormEvent) {
    e.preventDefault();

    FirebaseFirestore.collection("messages").add({
      text,
      user: {
        displayName: FirebaseAuth.currentUser?.displayName,
        uid: FirebaseAuth.currentUser?.uid,
      },
      timestamp: new Date(),
    });

    setText("");
  }

  async function signOut() {
    await FirebaseAuth.signOut();
    history.push("/sign-in");
  }

  return (
    <Container maxWidth="md">
      <Grid>
        <Grid container direction="column">
          {messagesList?.map((message) => {
            return <MessageBox key={message.id} message={message} />;
          })}
        </Grid>
        <form onSubmit={sendMessage}>
          <Grid wrap="nowrap" container alignItems="center">
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              variant="outlined"
              placeholder="Digite uma mensagem"
              required
              fullWidth
              onInvalid={(e) => e.preventDefault()}
            />
            <IconButton type="submit" color="primary" aria-label="Enviar">
              <Send />
            </IconButton>
            <IconButton onClick={signOut} color="primary" aria-label="Enviar">
              <PowerOffOutlined />
            </IconButton>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default Chat;
