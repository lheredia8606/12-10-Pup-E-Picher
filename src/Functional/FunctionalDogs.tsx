import { getFilteredDogs } from "../Helpers";
import { DogCard } from "../Shared/DogCard";
import { ActiveTab, Dog, requestDogs } from "../types-and-globals";

type FunctionalDogsProps = {
  allDogs: Dog[];
  repopulateDogs: () => void;
  activeTab: ActiveTab;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const FunctionalDogs = ({
  allDogs,
  repopulateDogs,
  activeTab,
  isLoading,
  setIsLoading,
}: FunctionalDogsProps) => {
  return (
    <>
      {getFilteredDogs(activeTab, allDogs).map((dog) => {
        return (
          <DogCard
            dog={{
              id: dog.id,
              image: dog.image,
              description: dog.description,
              isFavorite: dog.isFavorite,
              name: dog.name,
            }}
            key={dog.id}
            onTrashIconClick={() => {
              setIsLoading(true);
              requestDogs.delete(dog.id).then(() => {
                repopulateDogs();
              });
            }}
            onHeartClick={() => {
              setIsLoading(true);
              requestDogs.update(dog.id, { isFavorite: false }).then(() => {
                repopulateDogs();
              });
            }}
            onEmptyHeartClick={() => {
              setIsLoading(true);
              requestDogs.update(dog.id, { isFavorite: true }).then(() => {
                repopulateDogs();
              });
            }}
            isLoading={isLoading}
          />
        );
      })}
    </>
  );
};
