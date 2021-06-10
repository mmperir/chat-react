import { Button, Container, TextField, Typography } from "@material-ui/core";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Login</Typography>
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        label="E-mail"
        margin="normal"
        variant="outlined"
        fullWidth
      />
      <TextField
        onChange={(e) => setSenha(e.target.value)}
        label="Senha"
        margin="normal"
        variant="outlined"
        fullWidth
      />

      <Button fullWidth variant="contained" color="primary">
        Entrar
      </Button>
      <Button fullWidth variant="outlined" color="primary">
        Cadastrar-se
      </Button>
      <Button variant="text">Esqueceu sua senha?</Button>
    </Container>
  );
};

export default SignIn;
