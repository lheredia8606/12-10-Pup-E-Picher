import { Component } from "react";
import { ActiveTab, Dog, requestDogs } from "../types-and-globals";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";

interface ClassAppState {
  isLoading: boolean;
  allDogs: Dog[];
  activeTab: ActiveTab;
}

export class ClassApp extends Component<{}, ClassAppState> {
  state: ClassAppState = {
    isLoading: false,
    allDogs: [],
    activeTab: "none",
  };
  repopulateDogs = () => {
    return requestDogs
      .getAll()
      .then((response) => {
        this.setState({ allDogs: response });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  componentDidMount(): void {
    this.repopulateDogs();
  }

  render() {
    const { activeTab, allDogs, isLoading } = this.state;
    const setActiveTabHandler = (activeTab: ActiveTab) => {
      this.setState({ activeTab });
    };
    const setIsLoadingHandler = (isLoading: boolean) => {
      this.setState({ isLoading });
    };
    return (
      <div className="App" style={{ backgroundColor: "skyblue" }}>
        <header>
          <h1>pup-e-picker (Class)</h1>
        </header>
        <ClassSection
          activeTab={activeTab}
          setActiveTab={setActiveTabHandler}
          allDogs={allDogs}
        >
          {activeTab !== "createDog" && (
            <ClassDogs
              allDogs={allDogs}
              repopulateDogs={this.repopulateDogs}
              activeTab={activeTab}
              isLoading={isLoading}
              setIsLoading={setIsLoadingHandler}
            />
          )}
          {activeTab === "createDog" && (
            <ClassCreateDogForm
              repopulateDogs={this.repopulateDogs}
              setIsLoading={setIsLoadingHandler}
              isLoading={isLoading}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
