import { jogloHouse } from "./joglo";
import { omoHouse } from "./omo";
import { tongkonanHouse } from "./tongkonan";
import { gadangHouse } from "./gadang";
import { bolonHouse } from "./bolon";
import { honaiHouse } from "./honai";
import { betangHouse } from "./betang";

export const houses = [jogloHouse, omoHouse, tongkonanHouse, gadangHouse, bolonHouse, honaiHouse, betangHouse];

export const houseById = Object.fromEntries(houses.map((h) => [h.id, h]));
