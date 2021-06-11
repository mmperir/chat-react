import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { FC, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseAuth } from "../../services/firebase";
import { buttonStyle } from "./style";

const SignIn: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const style = buttonStyle();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await FirebaseAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container style={{ height: "100%" }} maxWidth="sm">
      <Grid
        style={{ height: "100%" }}
        container
        justify="center"
        alignItems="center"
      >
        <div>
          <Typography variant="h4">Login</Typography>
          <form onSubmit={onSubmit}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              label="E-mail"
              type="email"
              required
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              label="Senha"
              type="password"
              required
              margin="normal"
              variant="outlined"
              fullWidth
            />

            <Button
              className={style.formButton}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Entrar
            </Button>
          </form>
          <Button
            className={style.formButton}
            onClick={() => history.push("/sign-up")}
            fullWidth
            variant="outlined"
            color="primary"
          >
            Cadastrar-se
          </Button>
          <Button
            className={style.formButton}
            onClick={onSubmit}
            variant="text"
          >
            Esqueceu sua senha?
          </Button>
        </div>
      </Grid>
    </Container>
  );
};

export default SignIn;
