import { POSSIBILITIES } from "./constants";

export const getHand = (handSelect) => POSSIBILITIES[handSelect] ?? {};

export const generateRandomNumber = (min, max) =>
Math.floor(Math.random() * (max - min + 1)) + min;

