import {
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { FC, FormEvent, Fragment, useState } from "react";
import { FirebaseAuth, FirebaseFirestore } from "../../services/firebase";
import FormTextField from "../FormTextField";

interface NewChatModalProps {
  onClose: VoidFunction;
  currentChats?: string[];
}

const NewChatModal: FC<NewChatModalProps> = ({ onClose, currentChats }) => {
  const [chatName, setChatName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function createChat(e: FormEvent) {
    e.preventDefault();

    setIsLoading(true);

    try {
      const reference = await FirebaseFirestore.collection("chats").add({
        name: chatName,
      });
      const key = reference.id;
      reference.set({ lastModify: new Date(), name: chatName, key });

      const chats = currentChats?.concat([key]) || [key];

      const uid = FirebaseAuth.currentUser?.uid;
      await FirebaseFirestore.collection("users").doc(uid).set({ chats });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }

    onClose();
  }

  return (
    <Fragment>
      {isLoading ? (
        <CircularProgress color="secondary" />
      ) : (
        <Container maxWidth="sm">
          <Card style={{ padding: "1rem" }}>
            <Typography>Novo Chat</Typography>
            <form onSubmit={createChat}>
              <FormTextField
                onChange={(e) => setChatName(e.target.value)}
                helperText="Este campo é obrigatório"
                required
                label="Nome do chat"
                variant="outlined"
              />
              <Grid container wrap="nowrap">
                <Button
                  onClick={onClose}
                  variant="outlined"
                  color="primary"
                  fullWidth
                >
                  Cancelar
                </Button>
                <div style={{ width: "1rem" }} />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Criar
                </Button>
              </Grid>
            </form>
          </Card>
        </Container>
      )}
    </Fragment>
  );
};

export default NewChatModal;
