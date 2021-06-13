import {
  Button,
  Card,
  CircularProgress,
  Container,
  Fade,
  Grid,
  Modal,
  Typography,
} from "@material-ui/core";
import { FC, FormEvent, Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import FormTextField from "../../components/FormTextField";
import { FirebaseAuth } from "../../services/firebase";
import { buttonStyle } from "./style";
import style from "./style.module.scss";

const SignIn: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState("");
  const [invalidAuth, setInvalidAuth] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const history = useHistory();

  const styled = buttonStyle();

  function onSubmit(e: FormEvent) {
    setIsLoading(true);
    e.preventDefault();
    FirebaseAuth.signInWithEmailAndPassword(email, password)
      .finally(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setInvalidAuth(true);
      });
  }

  function sendRecoveryPass(e: FormEvent) {
    setIsLoading(true);
    e.preventDefault();
    FirebaseAuth.sendPasswordResetEmail(recoverEmail).finally(() => {
      setIsLoading(false);
      closeModal();
    });
  }

  function closeModal() {
    setRecoverEmail("");
    setShowModal(false);
  }

  return (
    <Container style={{ height: "100%" }} maxWidth="sm">
      <Grid
        style={{ height: "100%" }}
        container
        justify="center"
        alignItems="center"
      >
        <div
          style={{
            background: "#f0f0f5",
            borderRadius: ".4rem",
            padding: "1rem",
          }}
        >
          <Typography variant="h6">Login</Typography>
          <form onSubmit={onSubmit}>
            <FormTextField
              helperText="Esse campo precisa ser um e-mail válido"
              onChange={(e) => setEmail(e.target.value)}
              label="E-mail"
              type="email"
              required
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <FormTextField
              helperText="Esse campo é obrigatório"
              onChange={(e) => setPassword(e.target.value)}
              label="Senha"
              type="password"
              required
              margin="normal"
              variant="outlined"
              fullWidth
            />
            {invalidAuth ? (
              <div className={style.invalidAuth}>
                Nome de usuário ou senha inválidos
              </div>
            ) : (
              <Fragment />
            )}
            <Button
              className={styled.formButton}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Entrar
            </Button>
          </form>
          <Button
            className={styled.formButton}
            onClick={() => history.push("/sign-up")}
            fullWidth
            variant="outlined"
            color="primary"
          >
            Cadastrar-se
          </Button>
          <Button
            className={styled.formButton}
            onClick={() => setShowModal(true)}
            variant="text"
          >
            Esqueceu sua senha?
          </Button>
        </div>
      </Grid>

      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={showModal}
        onClose={closeModal}
      >
        <Fade in={showModal}>
          {isLoading ? (
            <CircularProgress color="secondary" />
          ) : (
            <Container maxWidth="xs">
              <Card style={{ padding: "1rem" }}>
                <Typography>Recuperação de senha</Typography>
                <form onSubmit={sendRecoveryPass}>
                  <FormTextField
                    onChange={(e) => setRecoverEmail(e.target.value)}
                    helperText="Este campo precisa ser um e-mail válido"
                    required
                    type="email"
                    label="E-mail"
                    variant="outlined"
                  />
                  <Grid container wrap="nowrap">
                    <Button
                      onClick={closeModal}
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
                      Enviar
                    </Button>
                  </Grid>
                </form>
              </Card>
            </Container>
          )}
        </Fade>
      </Modal>
    </Container>
  );
};

export default SignIn;
