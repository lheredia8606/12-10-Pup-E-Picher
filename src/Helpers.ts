import { ActiveTab, Dog } from "./types-and-globals";

export const getFilteredDogs = (filter: ActiveTab, dogs: Dog[]): Dog[] => {
  if (filter === "favorite") {
    return dogs.filter((dog) => {
      return dog.isFavorite === true;
    });
  } else if (filter === "unFavorite") {
    return dogs.filter((dog) => {
      return dog.isFavorite === false;
    });
  } else return dogs;
};
