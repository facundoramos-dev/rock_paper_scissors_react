import { useContext, useState, useRef } from "react";
import { GlobalStateContext } from "../../GlobalStateContext";
import gsap from "gsap";

export const NameContainer = () => {
  const [data, setData] = useContext(GlobalStateContext);
  const [name, setName] = useState("");
  const containerName = useRef();
  const nickError = useRef();

  const handleChangeInput = (e) => {
    setName(e.target.value);
  };

  const handlePlayGame = async () => {
    if (!validateName()) return; // Validamos el nombre del jugador.

    const containerGame = document.querySelector("#containerGame");

    const nick = name.trim();
    setData({ ...data, winners: { ...data.winners, 1: nick } });

    containerName.current.classList.add("pointerNone");
    await gsap.to(containerName.current, { opacity: 0 });
    await gsap.to(containerGame, { opacity: 1 });
    containerGame.classList.remove("pointerNone");
  };

  const validateName = () => {
    nickError.current.innerHTML = "";
    if (name.trim() === "")
      nickError.current.innerHTML = "Por favor, introduzca un Nick";
    return nickError.current.innerHTML === "";
  };

  return (
    <div ref={containerName} id="containerName" className="wrapper__container">
      <p className="text__unique">Ingrese su nombre:</p>
      <input
        type="text"
        name="nick"
        id="nick"
        value={name}
        onChange={handleChangeInput}
      />
      <p ref={nickError} id="errorNick" className="error"></p>
      <button type="button" id="play" onClick={handlePlayGame}>
        Jugar
      </button>
    </div>
  );
};
