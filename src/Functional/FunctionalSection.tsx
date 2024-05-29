// you can use this type for react children if you so choose
import { Link } from "react-router-dom";
import { ActiveTab, Dog } from "../types-and-globals";
import { getFilteredDogs } from "../Helpers";
import { ReactNode } from "react";

type FunctionalSectionProps = {
  activeTab: ActiveTab;
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>;
  allDogs: Dog[];
  children: ReactNode;
};

export const FunctionalSection = ({
  activeTab,
  setActiveTab,
  allDogs,
  children,
}: FunctionalSectionProps) => {
  const setActiveTabHandler = (selectedActiveTab: ActiveTab) => {
    selectedActiveTab === activeTab
      ? setActiveTab("none")
      : setActiveTab(selectedActiveTab);
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          <div
            className={`selector ${activeTab === "favorite" ? "active" : ""}`}
            onClick={() => {
              setActiveTabHandler("favorite");
            }}
          >
            favorited ( {getFilteredDogs("favorite", allDogs).length} )
          </div>

          <div
            className={`selector ${activeTab === "unFavorite" ? "active" : ""}`}
            onClick={() => {
              setActiveTabHandler("unFavorite");
            }}
          >
            unfavorited ({getFilteredDogs("unFavorite", allDogs).length} )
          </div>
          <div
            className={`selector ${activeTab === "createDog" ? "active" : ""}`}
            onClick={() => {
              setActiveTabHandler("createDog");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
