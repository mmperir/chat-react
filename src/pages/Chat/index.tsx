import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import { Add, ExitToApp, FileCopy, Search, Send } from "@material-ui/icons";
import firebase from "firebase";
import { FC, FormEvent, Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ChatsListItems from "../../components/ChatsListItem";
import MessageBox from "../../components/MessageBox";
import NewChatModal from "../../components/NewChatModal";
import { FirebaseAuth, FirebaseFirestore } from "../../services/firebase";
import style from "./style.module.scss";

export interface UserProps {
  uid: string;
  displayName?: string;
  chats?: string[];
}

const Chat: FC = () => {
  const [messagesList, setMessagesList] =
    useState<firebase.firestore.QueryDocumentSnapshot[]>();

  const [showDialog, setShowDialog] = useState(false);
  const [searchChat, setSearchChat] = useState("");

  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const [user, setUser] = useState<UserProps>({ uid: "" });
  const [chatsList, setChatsList] =
    useState<firebase.firestore.QueryDocumentSnapshot[]>();
  const [uid, setUid] = useState("a");

  const [currentChat, setCurrentChat] =
    useState<firebase.firestore.DocumentSnapshot>();

  FirebaseAuth.onAuthStateChanged((user) => {
    if (user) {
      setUid(user.uid);
    }
  });

  useEffect(() => {
    FirebaseFirestore.collection("users")
      .doc(uid)
      .onSnapshot((document) => {
        if (document) {
          const chats = document?.data()?.chats;
          const displayName = document?.data()?.displayName;

          setUser({
            chats,
            displayName,
            uid: uid,
          });
        }
      });
  }, [uid]);

  useEffect(() => {
    if (user.chats?.length) {
      FirebaseFirestore.collection("chats")
        .orderBy("lastModify")
        .where("key", "in", user?.chats)
        .onSnapshot((querySnapshot) => {
          if (!querySnapshot.empty) {
            setChatsList(querySnapshot.docs);
          }
        });
    }
  }, [user?.chats]);

  async function sendMessage(e: FormEvent) {
    e.preventDefault();

    currentChat?.ref.set({ ...currentChat.data(), lastModify: new Date() });
    currentChat?.ref.collection("messages").add({
      text,
      user: {
        displayName: FirebaseAuth.currentUser?.displayName,
        uid: FirebaseAuth.currentUser?.uid,
      },
      timestamp: new Date(),
    });

    setText("");
  }

  function addChat(e: FormEvent) {
    e.preventDefault();
    if (searchChat === "") return;

    FirebaseFirestore.collection("chats")
      .doc(searchChat)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const key = documentSnapshot?.data()?.key;

          const chats = user.chats?.concat([key]) || [key];
          FirebaseFirestore.collection("users")
            .doc(uid)
            .set({ chats })
            .then(() => {
              setSearchChat("");
            });
        } else {
          setShowDialog(true);
        }
      });
  }

  useEffect(() => {
    currentChat?.ref
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((querySnapshot) => {
        setMessagesList(querySnapshot.docs);
      });
  }, [currentChat]);

  async function signOut() {
    await FirebaseAuth.signOut();
    history.push("/sign-in");
  }

  function copyKeyToClipboard() {
    navigator.clipboard.writeText(currentChat?.id!);
  }

  return (
    <Container style={{ padding: 0 }} className={style.chat} maxWidth="lg">
      <Grid container style={{ height: "100%" }} direction="row" wrap="nowrap">
        <aside className={style.chatList}>
          <header>
            <form onSubmit={addChat}>
              <TextField
                value={searchChat}
                onChange={(e) => setSearchChat(e.target.value)}
                placeholder="Insira uma chatKey"
              />
              <IconButton type="submit" color="primary" aria-label="Buscar">
                <Search />
              </IconButton>
            </form>

            <IconButton
              onClick={() => setShowModal(true)}
              color="primary"
              aria-label="Criar novo chat"
            >
              <Add />
            </IconButton>
          </header>
          <main>
            {chatsList?.map((e) => {
              return (
                <ChatsListItems
                  key={e.id}
                  onClick={() => setCurrentChat(e)}
                  chatDocument={e}
                  selectedChat={e.id === currentChat?.id}
                />
              );
            })}
          </main>
          <footer>
            <IconButton onClick={signOut} color="secondary" aria-label="Enviar">
              <ExitToApp />
            </IconButton>
          </footer>
        </aside>
        <div className={style.chatContainer}>
          {!currentChat ? (
            <div
              style={{
                width: "fit-content",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography align="center">
                Crie chats, compartilhe a chave do chat.
                <br />E converse com varias pessoas ao mesmo tempo!
              </Typography>
            </div>
          ) : (
            <Fragment>
              <div className={style.chatHeader}>
                <Typography>{currentChat?.data()?.name}</Typography>

                <div>
                  <Typography>{currentChat?.id}</Typography>
                  <IconButton
                    color="inherit"
                    onClick={copyKeyToClipboard}
                    size="small"
                  >
                    <FileCopy />
                  </IconButton>
                </div>
              </div>
              <section className={style.messages}>
                {messagesList?.map((message) => {
                  return <MessageBox key={message.id} message={message} />;
                })}
              </section>
              <form onSubmit={sendMessage} className={style.form}>
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
              </form>
            </Fragment>
          )}
        </div>
        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClose={() => setShowModal(false)}
          open={showModal}
        >
          <Fade in={showModal}>
            <NewChatModal
              currentChats={user.chats}
              onClose={() => setShowModal(false)}
            />
          </Fade>
        </Modal>
        <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
          <DialogTitle>Chat não encontrado</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Verifique se a chatKey está correta.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={() => setShowDialog(false)}>
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Container>
  );
};

export default Chat;
