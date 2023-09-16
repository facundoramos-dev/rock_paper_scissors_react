// Diccionario para almacenar los ganadores del juego.
export const WINNER = {
  0: "Empate",
  1: "Jugador",
  2: "CPU",
};

// Diccionario de las posibles manos y sus respectivos ganadores.
export const POSSIBILITIES = {
  0: { hand: "piedra", winner: "tijeras" },
  1: { hand: "papel", winner: "piedra" },
  2: { hand: "tijeras", winner: "papel" },
};
