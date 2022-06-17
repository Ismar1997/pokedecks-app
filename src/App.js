import React from "react";
import Pokedex from "./components/Pokedex";
import Pokemon from "./components/Pokemon";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pokedecks-app" element={<Pokedex />}></Route>
        <Route path="/:pokemonId" element={<Pokemon />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
