import { Component } from "react";
import { getFilteredDogs } from "../Helpers";
import { DogCard } from "../Shared/DogCard";
import { Dog, ActiveTab, requestDogs } from "../types-and-globals";

interface ClassDogsProps {
  allDogs: Dog[];
  repopulateDogs: () => void;
  activeTab: ActiveTab;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export class ClassDogs extends Component<ClassDogsProps> {
  render() {
    const { activeTab, allDogs, isLoading, repopulateDogs, setIsLoading } =
      this.props;
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
  }
}
