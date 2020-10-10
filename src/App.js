import React, { useEffect } from "react";
import "./App.css";
import { CssBaseline, Typography, Container, Box } from "@material-ui/core";
import socketIOClient from "socket.io-client";
import { NameField } from "./components/NameField";

const fetch = require("node-fetch");

const serverUrl = "http://localhost:8080";
let socket;

function App() {
  const [status, setStatus] = React.useState(false);
  const [playerName, setPlayerName] = React.useState("Barry");
  const [nameError, setNameError] = React.useState(false);

  function updateName(n) {
    setPlayerName(n);
    setNameError(false);
  }

  function checkStatus(res) {
    if (res.ok) {
      // res.status >= 200 && res.status < 300
      setStatus(true);
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
        <Container mx={0}>
          <Typography variant="h1">Gam</Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="50vh"
          >
            <Box>
              <NameField
                status={status}
                update={updateName}
                nameError={nameError}
                cb={join}
              ></NameField>
            </Box>
          </Box>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default App;
