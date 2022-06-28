import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PokeInfo from "./PokeInfo";
import { AppBar, Typography, CircularProgress, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import ErrorPage from "./ErrorPage";
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
}));

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
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, abilities, height, weight, types } = pokemon;
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
              alt="pokemon-img"
              style={{
                position: "relative",
                top: "55px",
                zIndex: "1",
                width: "55%",
                maxWidth: "300px",
                height: "auto",
              }}
              src={fullImageUrl}
            />
            <PokeInfo
              name={name}
              id={id}
              abilities={abilities}
              height={height}
              weight={weight}
              types={types}
            />
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
          </Button>
        </div>
      )}
    </>
  );
};

export default Pokemon;
