import { makeStyles } from "@material-ui/core";

const messageBoxStyle = makeStyles({
  sendMessage: {
    background: "#f0f0f5",
    width: "fit-content",
    padding: "0.5rem 1rem",
    margin: "1rem 0.5rem",
    maxWidth: "35rem",
    alignSelf: "flex-end",
  },
  receivedMessage: {
    background: "white",
    width: "fit-content",
    padding: "0.5rem 1rem",
    margin: "1rem 0.5rem",
    maxWidth: "35rem",
    alignSelf: "flex-start",
  },
});

export { messageBoxStyle };
