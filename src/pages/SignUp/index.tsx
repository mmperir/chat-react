import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import { FC, useState } from "react";

const SignUp: FC = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  function onSubmit() {
    console.log({ nome, email, senha, confirmarSenha });
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Cadastro de usuário</Typography>

      <Avatar src="http://github.com/mayconsgs.png" />

      <TextField
        onChange={(e) => setNome(e.target.value)}
        margin="normal"
        label="Nome"
        fullWidth
        variant="outlined"
      />
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        label="E-mail"
        fullWidth
        variant="outlined"
      />
      <TextField
        onChange={(e) => setSenha(e.target.value)}
        margin="normal"
        label="Senha"
        fullWidth
        variant="outlined"
      />
      <TextField
        onChange={(e) => setConfirmarSenha(e.target.value)}
        margin="normal"
        label="Confirmar Senha"
        fullWidth
        variant="outlined"
      />
      <Button onClick={onSubmit} variant="contained" color="primary">
        Cadastrar
      </Button>
    </Container>
  );
};

export default SignUp;
