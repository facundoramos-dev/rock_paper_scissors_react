import { useContext, useRef } from "react";
import { GlobalStateContext } from "../../GlobalStateContext";
import gsap from "gsap";

export const Overlay = () => {
  const [data, setData] = useContext(GlobalStateContext);
  const overlay = useRef();
  const handleClickContinue = async () => {
    overlay.current.classList.add("pointerNone");
    const userSelection = document.querySelector(".user__selection");
    const containerGame = document.querySelector("#containerGame");
    const containerPopUp = document.querySelector("#containerPopUp");

    await Promise.all([
      gsap.to(userSelection.children, { scale: 1, borderColor: "black" }),
      gsap.to([containerPopUp, overlay.current], { opacity: 0 }),
      gsap.to(containerGame, { opacity: 1 }),
    ]);

    containerGame.classList.remove("pointerNone");
  };
  return (
    <div ref={overlay} id="overlay" className="overlay pointerNone">
      <div id="containerPopUp" className="wrapper__container pop__up">
        <p
          id="textWinner"
          dangerouslySetInnerHTML={{ __html: data.textWinnerHTML }}
        ></p>
        <button id="continueGame" onClick={handleClickContinue}>
          Continuar
        </button>
      </div>
    </div>
  );
};
