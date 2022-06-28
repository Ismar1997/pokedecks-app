import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { toFirstCharUppercase } from "./constants";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles((theme) => ({
  pokeInfo: {
    borderRadius: "30px",
    margin: "15px, 15px",
    backgroundColor: "white",
    padding: "25px",
    width: "40%",
    height: "550px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function PokeInfo(props) {
  const classes = useStyles();
  return (
    <div className={classes.pokeInfo}>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          rowSpacing={{ xs: 6, sm: 6, md: 5 }}
          columnSpacing={{ xs: 2, sm: 4, md: 4 }}
        >
          <Grid item xs={12} sm={12}>
            <Item
              style={{
                color: "	#000000",
                fontSize: "3vw",
                fontWeight: "bold",
                fontFamily: "Orbitron",
                margin: "auto",
                width: "50%",
              }}
              elevation={0}
            >
              {toFirstCharUppercase(props.name)}
            </Item>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Item
              style={{
                color: "	#000000",
                fontSize: "2.5vw",
                fontFamily: "Orbitron",
              }}
              elevation={0}
            >
              Type :
            </Item>
            <Item
              style={{
                color: "	#000000",
                fontSize: "2.5vw",
                fontWeight: "bold",
                fontFamily: "Orbitron",
              }}
            >
              {toFirstCharUppercase(props.types[0].type.name)}
            </Item>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Item
              style={{
                color: "	#000000",
                fontSize: "2.5vw",
                fontFamily: "Orbitron",
              }}
              elevation={0}
            >
              Abilitiy :{" "}
            </Item>
            <Item
              style={{
                color: "	#000000",
                fontSize: "2.5vw",
                fontWeight: "bold",
                fontFamily: "Orbitron",
              }}
            >
              {toFirstCharUppercase(props.abilities[0].ability.name)}
            </Item>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Item
              style={{
                color: "	#000000",
                fontSize: "2.5vw",
                fontFamily: "Orbitron",
              }}
              elevation={0}
            >
              Height :
            </Item>
            <Item
              style={{
                color: "	#000000",
                fontSize: "2.5vw",
                fontWeight: "bold",
                fontFamily: "Orbitron",
              }}
            >
              {props.height} m
            </Item>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Item
              style={{
                color: "	#000000",
                fontSize: "2.5vw",
                fontFamily: "Orbitron",
              }}
              elevation={0}
            >
              Weight :
            </Item>
            <Item
              style={{
                color: "	#000000",
                fontSize: "2.5vw",
                fontWeight: "bold",
                fontFamily: "Orbitron",
              }}
            >
              {props.weight} kg
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default PokeInfo;
