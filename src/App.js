import React, { useState } from "react";
import "./App.css";
import { NameContainer } from "./components/NameContainer/NameContainer";
import { GameContainer } from "./components/GameContainer/GameContainer";
import { Overlay } from "./components/Overlay/Overlay";
import { MessageEnd } from "./components/MessageEnd/MessageEnd";

import { GlobalStateContext } from "./GlobalStateContext";
import { WINNER } from "./utils/constants";

function App() {
  const [globalState, setGlobalState] = useState({
    winners: WINNER,
    userPoints: 0,
    cpuPoints: 0,
    messageEndHTML: "",
    textWinnerHTML: "",
  });

  return (
    <GlobalStateContext.Provider value={[globalState, setGlobalState]}>
      <main>
        <h1>Piedra Papel o Tijeras</h1>
        <div className="main__container">
          <NameContainer />
          <GameContainer />
          <Overlay />
          <MessageEnd />
        </div>
      </main>
    </GlobalStateContext.Provider>
  );
}

export default App;
