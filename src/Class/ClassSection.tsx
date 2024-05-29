// you can use this type for react children if you so choose
import { Link } from "react-router-dom";
import { Dog, ActiveTab } from "../types-and-globals";
import { getFilteredDogs } from "../Helpers";
import { Component, ReactNode } from "react";

interface ClassSectionProps {
  activeTab: ActiveTab;
  setActiveTab: (activeTab: ActiveTab) => void;
  allDogs: Dog[];
  children: ReactNode;
}

const setActiveTabHandler = (
  setActiveTab: (activeTab: ActiveTab) => void,
  enumValue: ActiveTab,
  currentEnumValue: ActiveTab
) => {
  enumValue === currentEnumValue
    ? setActiveTab("none")
    : setActiveTab(currentEnumValue);
};

export class ClassSection extends Component<ClassSectionProps> {
  render() {
    const { activeTab, allDogs, children, setActiveTab } = this.props;
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>
          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>
          <div className="selectors">
            <div
              className={`selector ${activeTab === "favorite" ? "active" : ""}`}
              onClick={() => {
                setActiveTabHandler(setActiveTab, activeTab, "favorite");
              }}
            >
              favorited ( {getFilteredDogs("favorite", allDogs).length} )
            </div>

            <div
              className={`selector ${
                activeTab === "unFavorite" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTabHandler(setActiveTab, activeTab, "unFavorite");
              }}
            >
              unfavorited ({getFilteredDogs("unFavorite", allDogs).length} )
            </div>
            <div
              className={`selector ${
                activeTab === "createDog" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTabHandler(setActiveTab, activeTab, "createDog");
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}
