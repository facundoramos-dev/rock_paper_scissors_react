import { useContext, useRef, useEffect, useState } from "react";
import { GlobalStateContext } from "../../GlobalStateContext";
import img_rock from "../../assets/img/rock-min.png";
import img_paper from "../../assets/img/paper-min.png";
import img_scissors from "../../assets/img/scissors-min.png";
import gsap from "gsap";
import { getHand, generateRandomNumber } from "../../utils/functions";

export const GameContainer = () => {
  const [data, setData] = useContext(GlobalStateContext);
  const [userPoints, setUserPoints] = useState(0);
  const [cpuPoints, setCpuPoints] = useState(0);
  const userSelection = useRef();
  const containerGame = useRef();

  useEffect(() => {
    if (!userSelection.current) return;
    for (let child of userSelection.current.children) {
      child.addEventListener("mouseenter", () => eventMouseEnter(child));
      child.addEventListener("mouseleave", () => eventMouseLeave(child));
    }
  }, []);

  const eventMouseEnter = (child) =>
    gsap.to(child, { scale: 1.1, borderColor: "orange" });

  const eventMouseLeave = (child) =>
    gsap.to(child, { scale: 1, borderColor: "black" });

  const handleClickHand = async (e) => {
    const hand = e.target.dataset.hand;

    const containerMessageEnd = document.querySelector("#containerMessageEnd");
    const containerPopUp = document.querySelector("#containerPopUp");
    const overlay = document.querySelector("#overlay");

    const userHand = getHand(hand);
    const cpuHand = getHand(generateRandomNumber(0, 2));
    const winner = determineWinners(userHand, cpuHand);
    const points = updatePoints(winner);
    const text = getTextPopUp(winner);
    setData({ ...data, textWinnerHTML: text });

    containerGame.current.classList.add("pointerNone");

    // Comprobamos si un jugador o cpu han alcanzado 3 puntos para determinar el ganador final.
    if (points.user >= 3 || points.cpu >= 3) {
      let message =
        points.cpu > points.user
          ? `Fue una buena partida ${data.winners[1]}, pero esta vez gano el <br /><strong>CPU</strong>`
          : `Felicidades <strong>${data.winners[1]}</strong> has ganado.`;
      setData({ ...data, messageEndHTML: message });
      await gsap.to(containerGame.current, { opacity: 0 });
      await gsap.to(containerMessageEnd, { opacity: 1 });
      containerMessageEnd.classList.remove("pointerNone");
      const resetGame = document.querySelector("#resetGame");
      gsap.to(resetGame, { opacity: 1 });
      setCpuPoints(0);
      setUserPoints(0);
    } else {
      await gsap.to(containerGame.current, { opacity: 0.8 });
      await Promise.all([
        gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1 }),
        gsap.fromTo(
          containerPopUp,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1 }
        ),
      ]);
      overlay.classList.remove("pointerNone");
    }
  };

  const determineWinners = (user, cpu) => {
    if (user.hand === cpu.hand) return 0;
    return user.winner === cpu.hand ? 1 : 2;
  };

  // Función para actualizar los puntos
  const updatePoints = (winner) => {
    let newUserPoints = userPoints;
    let newCpuPoints = cpuPoints;
    if (winner === 1) setUserPoints(++newUserPoints);
    if (winner === 2) setCpuPoints(++newCpuPoints);
    return { user: newUserPoints, cpu: newCpuPoints };
  };

  const getTextPopUp = (winner) =>
    winner === 0
      ? "Esta ronda termina en un <strong>empate!!!</strong>"
      : `El ganador de esta ronda es <strong>${data.winners[winner]}</strong>`;

  return (
    <div
      ref={containerGame}
      id="containerGame"
      className="wrapper__container pointerNone"
    >
      <div className="container__pointers">
        <h2>Puntajes</h2>
        <div className="current__pointers">
          <p id="nickUserPlay">
            {data.winners[1]}: <span id="userPoints">{userPoints}</span>
          </p>
          <p>
            CPU: <span id="cpuPoints">{cpuPoints}</span>
          </p>
        </div>
      </div>
      <div className="hands__selection">
        <h2 className="title__selection">Selecciona tu mano</h2>
        <div ref={userSelection} className="container__fluid user__selection">
          <div id="rock" onClick={handleClickHand} data-hand="0">
            <img src={img_rock} alt="rock" data-hand="0" />
          </div>
          <div id="paper" onClick={handleClickHand} data-hand="1">
            <img src={img_paper} alt="paper" data-hand="1" />
          </div>
          <div id="scissors" onClick={handleClickHand} data-hand="2">
            <img src={img_scissors} alt="scissors" data-hand="2" />
          </div>
        </div>
      </div>
      <div className="hands__selection">
        <h2 className="title__selection">Mano del PC</h2>
        <div className="container__fluid">
          <div>
            <img src={img_scissors} alt="scissors" />
          </div>
          <div>
            <img src={img_rock} alt="rock" />
          </div>
          <div>
            <img src={img_paper} alt="paper" />
          </div>
        </div>
      </div>
    </div>
  );
};
