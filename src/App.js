import React from "react";
import logo from "./logo.svg";
import "./App.css";

import {
  CssBaseline,
  Typography,
  Container,
  Grid,
  Box,
} from "@material-ui/core";

import NameField from "./components/NameField";

function App() {
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
              <NameField></NameField>
            </Box>
          </Box>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default App;
