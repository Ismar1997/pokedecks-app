import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  allContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));
const ErrorPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.allContent}>
      <Box>
        <Typography
          style={{
            lineHeight: "32px",
            padding: "5px",
            width: "350px",
            margin: "auto",
            marginTop: "40px",
            marginBottom: "40px",
            color: "	#000000",
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: "Orbitron",
          }}
        >
          Pokemon is not found. Throw that pokeball again or go find other
          pokemon in Pokedex!!!
        </Typography>
      </Box>
      <img
        style={{ margin: "auto", height: "400px" }}
        alt="loading"
        src="https://giffiles.alphacoders.com/212/212514.gif"
      />
    </div>
  );
};

export default ErrorPage;
