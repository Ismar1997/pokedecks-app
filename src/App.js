import React from "react";
import Pokedex from "./components/Pokedex";
import Pokemon from "./components/Pokemon";
import ErrorPage from "./components/ErrorPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pokedecks-app" element={<Pokedex />}></Route>
        <Route path="/pokedecks-app/:pokemonId" element={<Pokemon />}></Route>
        <Route path="/*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
