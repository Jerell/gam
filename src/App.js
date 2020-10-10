import React, { useEffect } from "react";
import "./App.css";
import { CssBaseline, Typography, Container, Box } from "@material-ui/core";
import socketIOClient from "socket.io-client";
import { NameField } from "./components/NameField";
import Game from "./components/Game";

require("dotenv").config();

const fetch = require("node-fetch");

const serverUrl = process.env.DEV
  ? "http://localhost:8080"
  : "http://82.45.108.39:3001";
let socket;

function App() {
  const [serverAvailable, setServerAvailable] = React.useState(false);
  const [playerName, setPlayerName] = React.useState("Barry");
  const [nameError, setNameError] = React.useState(false);
  const [joined, setJoined] = React.useState(false);

  function updateName(n) {
    setPlayerName(n);
    setNameError(false);
  }

  function checkStatus(res) {
    if (res.ok) {
      // res.status >= 200 && res.status < 300
      setServerAvailable(true);
      return res;
    } else {
      throw res.statusText;
    }
  }
  function load() {
    fetch(serverUrl)
      .then(checkStatus)
      .then(() => {
        socket = socketIOClient(serverUrl);
        socket.on("nameTaken", (n) => {
          setNameError(true);
          console.log(`${n} is already taken`);
        });
        socket.on("joined", (n) => {
          console.log(`${n} joined`);
          setJoined(true);
        });
        return () => socket.disconnect();
      });
  }

  function join() {
    socket.emit("name", playerName);
  }

  useEffect(load, []);
  return (
    <div className="App">
      <React.Fragment>
        <CssBaseline />
        {joined ? (
          <Game socket={socket}></Game>
        ) : (
          <Container>
            <Box display="flex" flexDirection="column" height="100vh">
              <Box borderBottom={1}>
                <Typography variant="h2" component="h1">
                  Gam
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexGrow={1}
              >
                <NameField
                  status={serverAvailable}
                  update={updateName}
                  nameError={nameError}
                  placeholderName={playerName}
                  cb={join}
                ></NameField>
              </Box>
            </Box>
          </Container>
        )}
      </React.Fragment>
    </div>
  );
}

export default App;
