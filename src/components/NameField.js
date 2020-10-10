import React from "react";
import { Button, Box, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

export default function NameField({ cb }) {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Box>
        <TextField
          required
          id="outlined-required"
          label="Name"
          variant="outlined"
        />
      </Box>
      <Box>
        <Button onClick={cb}>Play</Button>
      </Box>
    </form>
  );
}
