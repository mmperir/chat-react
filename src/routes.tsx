import { FC } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Chat from "./pages/Chat";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { FirebaseAuth } from "./services/firebase";

const Routes: FC = () => {
  const history = useHistory();

  FirebaseAuth.onAuthStateChanged((user) => {
    if (user) {
      history.push("/");
    } else {
      history.push("/sign-in");
    }
  });

  return (
    <Switch>
      <Route path="/" exact component={Chat} />
      <Route path="/sign-in" exact component={SignIn} />
      <Route path="/sign-up" exact component={SignUp} />
    </Switch>
  );
};

export default Routes;
