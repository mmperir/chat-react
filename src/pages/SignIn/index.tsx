import { Button, Container, TextField, Typography } from "@material-ui/core";
import { FC, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseAuth } from "../../services/firebase";

const SignIn: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await FirebaseAuth.signInWithEmailAndPassword(email, password);

      history.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container maxWidth="sm">
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

        <Button type="submit" fullWidth variant="contained" color="primary">
          Entrar
        </Button>
      </form>
      <Button
        onClick={() => history.push("/sign-up")}
        fullWidth
        variant="outlined"
        color="primary"
      >
        Cadastrar-se
      </Button>
      <Button onClick={onSubmit} variant="text">
        Esqueceu sua senha?
      </Button>
    </Container>
  );
};

export default SignIn;
