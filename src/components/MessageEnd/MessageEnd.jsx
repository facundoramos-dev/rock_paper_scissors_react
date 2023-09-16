import { useContext, useRef } from "react";
import { GlobalStateContext } from "../../GlobalStateContext";
import gsap from "gsap";

export const MessageEnd = () => {
  const [data, setData] = useContext(GlobalStateContext);
  const containerMessageEnd = useRef();

  // Función asincrónica para manejar el reinicio del juego.
  const handleResetGame = async () => {
    // Restablecer el valor del campo de entrada de nombre a una cadena vacía.
    const userSelection = document.querySelector(".user__selection");
    const containerName = document.querySelector("#containerName");
    document.querySelector("#nick").value = "";
    gsap.to(userSelection.children, { scale: 1, borderColor: "black" });
    await gsap.to(containerMessageEnd.current, { opacity: 0 });
    await gsap.to(containerName, { opacity: 1 });
    containerMessageEnd.current.classList.add("pointerNone");
    containerName.classList.remove("pointerNone");
  };
  return (
    <div
      ref={containerMessageEnd}
      id="containerMessageEnd"
      className="wrapper__container message__end"
    >
      <p dangerouslySetInnerHTML={{ __html: data.messageEndHTML }}></p>
      <button id="resetGame" onClick={handleResetGame}>
        Reiniciar
      </button>
    </div>
  );
};
