import React from "react";
import { Button, Box, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

function NameField({ update, cb, status, nameError, placeholderName }) {
  const classes = useStyles();

  return (
    <>
      {status ? (
        <form className={classes.root} noValidate autoComplete="off">
          <Box>
            <TextField
              error={nameError}
              helperText={nameError ? "Try a different name" : null}
              placeholder={placeholderName}
              required
              id="outlined-required"
              label="Name"
              variant="outlined"
              onChange={(e) => update(e.target.value)}
            />
          </Box>
          <Box>
            <Button onClick={cb} variant="contained" color="primary">
              Play
            </Button>
          </Box>
        </form>
      ) : (
        <Typography>Server is {status ? null : "not "}running</Typography>
      )}
    </>
  );
}

export { NameField };
