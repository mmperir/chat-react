import { Button, Container, Grid, Typography } from "@material-ui/core";
import { FC, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import FormTextField from "../../components/FormTextField";
import { FirebaseAuth } from "../../services/firebase";

const SignUp: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        return window.alert("Senhas não coinsidem");
      }

      FirebaseAuth.createUserWithEmailAndPassword(email, password).then(
        async (credential) => {
          credential.user?.updateProfile({
            displayName: name,
          });
        }
      );
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
        <div
          style={{
            background: "#f0f0f5",
            borderRadius: ".4rem",
            padding: "1rem",
          }}
        >
          <Typography variant="h4">Cadastro de usuário</Typography>
          <form onSubmit={onSubmit}>
            <FormTextField
              onChange={(e) => setName(e.target.value)}
              helperText="Nome é obrigatório"
              label="Nome"
              variant="outlined"
              required
            />
            <FormTextField
              onChange={(e) => setEmail(e.target.value)}
              helperText="E-mail precisa ser válido"
              label="E-mail"
              type="email"
              variant="outlined"
              required
            />
            <FormTextField
              onChange={(e) => setPassword(e.target.value)}
              label="Senha"
              helperText="Essa senha não é inválida"
              type="password"
              required
              variant="outlined"
            />
            <FormTextField
              onChange={(e) => setConfirmPassword(e.target.value)}
              helperText="Essa senha não é inválida"
              type="password"
              required
              label="Confirmar Senha"
              variant="outlined"
            />
            <Button
              style={{
                marginTop: ".5rem",
                marginBottom: ".5rem",
              }}
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
            >
              Cadastrar
            </Button>
          </form>
          <Button
            style={{
              marginTop: ".5rem",
              marginBottom: ".5rem",
            }}
            fullWidth
            variant="outlined"
            color="primary"
            onClick={() => history.push("/sign-in")}
          >
            Já possui conta?
          </Button>
        </div>
      </Grid>
    </Container>
  );
};

export default SignUp;
