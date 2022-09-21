import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { toFirstCharUppercase } from "./constants";

import axios from "axios";
const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "70px",
    paddingLeft: "150px",
    paddingRight: "150px",
  },
  cardMedia: {
    margin: "auto",
  },
  card: {
    alignItems: "center",
    textAlign: "center",
    paddingTop: "10px",
    width: "100%",
  },
  cardContent: {
    textAlign: "center",
    alignItems: "center",
    paddingTop: "5px",
  },
  searchContainer: {
    display: "block",
    backgroundColor: "white",
    paddingLeft: "15px",
    paddingRight: "15px",
    marginTop: "30px",
    marginBottom: "30px",
    alignItems: "center",
    borderRadius: "8px",
    justifyContent: "center",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "300px",
    margin: "5px",
  },
  appbarImg: {
    height: "210px",
    width: "300px",
    marginTop: "0px",
    marginBottom: "0px",
    padding: "0px",
  },
}));
const Pokedex = () => {
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        console.log(results);
        console.log(data);
        const newPokemonData = {};
        results.forEach(async (pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const handleSearchChange = (e) => {
    const serachResult = e.target.value;
    setFilter(serachResult.toLowerCase());
  };

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    return (
      <Grid item xs={12} sm={6} md={4} key={pokemonId}>
        <Card
          className={classes.card}
          onClick={() => navigate(`/pokedecks-app/${id}`)}
        >
          <Typography
            style={{
              color: "	#000000",
              fontFamily: "Orbitron",
              fontWeight: "bold",
            }}
          >{`#0${id}`}</Typography>
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{ width: "130px", height: "130px" }}
          />
          <CardContent className={classes.cardContent}>
            <Typography
              style={{
                color: "	#000000",
                fontFamily: "Orbitron",
                fontWeight: "bold",
              }}
            >{`${toFirstCharUppercase(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <AppBar
        style={{ alignItems: "center", background: "RGB(255, 31, 31)" }}
        position="static"
      >
        <img
          className={classes.appbarImg}
          alt="pokedex-app-img"
          src="https://i.pinimg.com/originals/9e/39/23/9e3923825ba4a4fa967858f980b8460f.png"
        />
        <Toolbar>
          <div className={classes.searchContainer}>
            <img
              alt="pokemontitle-img"
              style={{
                marginTop: "25px",
                marginRight: "5px",
                height: "25px",
                width: "23px",
              }}
              src="https://www.seekpng.com/png/detail/220-2200843_116kib-2000x1996-2000px-pokc3a9-ball-icon-pokeball-png.png"
            />
            <TextField
              className={classes.searchInput}
              onChange={handleSearchChange}
              label="Find Pokemon"
              variant="standard"
            />
          </div>
        </Toolbar>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={8} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map(
            (pokemonId) =>
              pokemonData[pokemonId].name.includes(filter) &&
              getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        <CircularProgress style={{ margin: "auto" }} />
      )}
    </>
  );
};
export default Pokedex;
