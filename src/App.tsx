import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ICard } from "./interfaces/ICard";
import { IPlayer } from "./interfaces/IPlayer";
import { GamePlay } from "./routes/GamePlay";
import { HomePage } from "./routes/HomePage";
import { generateCards } from "./utils/generateCards";
import { shuffleCards } from "./utils/shuffleCards";

function App(): JSX.Element {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const newCards = generateCards();
  const [cards, setCards] = useState<ICard[]>(shuffleCards(newCards));
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage {...{ players, setPlayers }} />} />
          <Route
            path="/start"
            element={<GamePlay {...{ players, cards, setCards }} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
