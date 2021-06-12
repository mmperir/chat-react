import {
  Fade,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import { Add, PowerOffOutlined, Search, Send } from "@material-ui/icons";
import firebase from "firebase";
import { FC, FormEvent, useEffect, useState } from "react";
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

  useEffect(() => {
    currentChat?.ref.collection("messages").onSnapshot((querySnapshot) => {
      setMessagesList(querySnapshot.docs);
    });
  }, [currentChat]);

  async function signOut() {
    await FirebaseAuth.signOut();
    history.push("/sign-in");
  }

  return (
    <div className={style.chat}>
      <div className={style.chatHeader}>
        <Typography style={{ color: "white" }}>
          {currentChat?.data()?.name}
        </Typography>
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
      <aside className={style.chatList}>
        <header>
          <TextField placeholder="Insira uma chatKey" />

          <IconButton color="primary" aria-label="Buscar">
            <Search />
          </IconButton>
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
                selectedChat={e === currentChat}
              />
            );
          })}
        </main>
        <footer>
          <IconButton onClick={signOut} color="secondary" aria-label="Enviar">
            <PowerOffOutlined />
          </IconButton>
        </footer>
      </aside>
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
    </div>
  );
};

export default Chat;
