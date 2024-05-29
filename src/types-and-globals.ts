import { RequestObj } from "./Request";

export type ActiveTab = "favorite" | "unFavorite" | "createDog" | "none";

export interface Dog {
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
  id: number;
}
export const requestDogs = new RequestObj<Dog>("http://localhost:3000/dogs");
