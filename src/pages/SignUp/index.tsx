import { Button, Container, TextField, Typography } from "@material-ui/core";
import { FC, useState } from "react";
import { FirebaseAuth, FirebaseFirestore } from "../../services/firebase";

const SignUp: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function onSubmit() {
    try {
      if (password !== confirmPassword) {
        window.alert("Senhas não coinsidem");
      }

      const credential = await FirebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      const uid = credential.user?.uid;

      FirebaseFirestore.collection("users").doc(uid).set({ name });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Cadastro de usuário</Typography>

      <form onSubmit={onSubmit}>
        <TextField
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          label="Nome"
          required
          fullWidth
          variant="outlined"
        />
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          label="E-mail"
          required
          type="email"
          fullWidth
          variant="outlined"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          label="Senha"
          type="password"
          required
          fullWidth
          variant="outlined"
        />
        <TextField
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
          type="password"
          required
          label="Confirmar Senha"
          fullWidth
          variant="outlined"
        />
        <Button fullWidth type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
      </form>
    </Container>
  );
};

export default SignUp;
