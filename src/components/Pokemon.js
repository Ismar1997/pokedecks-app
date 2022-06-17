import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import {
  Paper,
  Box,
  Grid,
  AppBar,
  CircularProgress,
  Button,
} from "@mui/material";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";

//////////////////////////////////      Styles         ///////////////////////////////
const useStyles = makeStyles((theme) => ({
  appbarImg: {
    height: "150px",
    width: "220px",
  },
  pokemonAll: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  pokemonStats: {
    backgroundColor: "white",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    width: "50%",
  },
  pokeInfo: {
    textAlign: "center",
  },
  Item: {
    fontFamily: "Orbitron, sans-serif",
  },
}));
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
///////////////////////////////////////////////////////////////////////////////////////

const Pokemon = () => {
  const classes = useStyles();
  let navigate = useNavigate();
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(undefined);
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
        console.log(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, species, height, weight, types } = pokemon;
    const fullImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return (
      <>
        <AppBar
          style={{
            height: "140px",
            alignItems: "center",
            background: "RGB(255, 31, 31)",
          }}
          position="static"
        >
          <img
            className={classes.appbarImg}
            alt="pokedex-app-img"
            src="https://i.pinimg.com/originals/9e/39/23/9e3923825ba4a4fa967858f980b8460f.png"
          />
        </AppBar>
        <div className="pokemonInfos">
          <div className={classes.pokemonAll}>
            <img
              alt={"poke-img"}
              style={{
                zIndex: "1",
                position: "relative",
                margin: "auto",
                marginTop: "-20px",
                top: "60px",
                width: "300px",
                height: "300px",
              }}
              src={fullImageUrl}
            />

            <Box
              sx={{
                boxShadow:
                  "0 4px 25px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                display: "grid",
                alignItems: "center",
                padding: "20px",
                paddingTop: "80px",
              }}
              className={classes.pokemonStats}
            >
              <Grid container spacing={7} columnSpacing={2}>
                <Grid item xs={12}>
                  <Item
                    elevation={0}
                    style={{
                      color: "	#000000",
                      fontSize: "35px",
                      fontWeight: "bold",
                      fontFamily: "Orbitron",
                      margin: "auto",
                      width: "50%",
                    }}
                  >
                    {toFirstCharUppercase(name)}
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item
                    style={{
                      color: "	#000000",
                      fontSize: "15px",
                      fontFamily: "Orbitron",
                    }}
                    elevation={0}
                  >
                    Species:
                  </Item>
                  <Item
                    style={{
                      color: "	#000000",
                      fontSize: "20px",
                      fontWeight: "bold",
                      fontFamily: "Orbitron",
                    }}
                  >
                    {species.name}
                  </Item>
                </Grid>
                <Grid zeroMinWidth item xs={6}>
                  <Item
                    style={{
                      color: "	#000000",
                      fontSize: "15px",
                      fontFamily: "Orbitron",
                    }}
                    noWrap
                    elevation={0}
                  >
                    Types:
                  </Item>
                  <Item
                    style={{
                      color: "	#000000",
                      fontSize: "20px",
                      fontWeight: "bold",
                      fontFamily: "Orbitron",
                    }}
                  >
                    {toFirstCharUppercase(types[0].type.name)}/
                    {toFirstCharUppercase(types[1].type.name)}
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item
                    style={{
                      color: "	#000000",
                      fontSize: "15px",
                      fontFamily: "Orbitron",
                    }}
                    elevation={0}
                  >
                    Weight:
                  </Item>
                  <Item
                    style={{
                      color: "	#000000",
                      fontSize: "20px",
                      fontWeight: "bold",
                      fontFamily: "Orbitron",
                    }}
                  >
                    {weight} kg
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item
                    style={{
                      color: "	#000000",
                      fontSize: "15px",
                      fontFamily: "Orbitron",
                    }}
                    elevation={0}
                  >
                    Height:
                  </Item>
                  <Item
                    style={{
                      color: "	#000000",
                      fontSize: "20px",
                      fontWeight: "bold",
                      fontFamily: "Orbitron",
                    }}
                  >
                    {height} m
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {pokemon === undefined && (
        <div
          style={{
            position: "fixed",
            top: "35%",
            left: "45%",
          }}
        >
          <CircularProgress size={150} />
        </div>
      )}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}

      {pokemon === false && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ErrorPage />
        </div>
      )}

      {pokemon !== undefined && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              fontWeight: "bold",
              fontFamily: "Orbitron",
              marginTop: "100px",
              marginBottom: "100px",
            }}
            variant="contained"
            onClick={() => navigate("/")}
          >
            Back to pokedex
          </Button>{" "}
        </div>
      )}
    </>
  );
};

export default Pokemon;
