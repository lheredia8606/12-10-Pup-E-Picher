import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog, ActiveTab, requestDogs } from "../types-and-globals";

export function FunctionalApp() {
  const [isLoading, setIsLoading] = useState(false);
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>("none");

  /*
    dont see the point for these function, I will ask about this on saturday, if I use
    the addDog, (CRUD in general) in more than 1 class then make sense to me :)
  */
  const addDog = () => {};

  const repopulateDogs = () => {
    return requestDogs
      .getAll()
      .then(setAllDogs)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    repopulateDogs();
  }, []);
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        allDogs={allDogs}
      >
        {activeTab !== "createDog" && (
          <FunctionalDogs
            allDogs={allDogs}
            repopulateDogs={repopulateDogs}
            activeTab={activeTab}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
        {activeTab === "createDog" && (
          <FunctionalCreateDogForm
            repopulateDogs={repopulateDogs}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
