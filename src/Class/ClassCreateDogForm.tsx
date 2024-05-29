import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog, requestDogs } from "../types-and-globals";
import toast from "react-hot-toast";

interface ClassCreateDogFormProps {
  repopulateDogs: () => Promise<void>;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
}
interface ClassCreateDogFormState {
  nameInput: string;
  descriptionInput: string;
  imageInput: string;
}

export class ClassCreateDogForm extends Component<
  ClassCreateDogFormProps,
  ClassCreateDogFormState
> {
  state = {
    nameInput: "",
    descriptionInput: "",
    imageInput: "",
  };

  render() {
    const { isLoading, repopulateDogs, setIsLoading } = this.props;
    const onSubmitHandler = (): void => {
      setIsLoading(true);
      const dog: Omit<Dog, "id"> = {
        description: this.state.descriptionInput,
        image: this.state.imageInput,
        name: this.state.nameInput,
        isFavorite: false,
      };
      requestDogs.post(dog).then(() => {
        toast.success("Dog Created");
        repopulateDogs();
        this.setState({ nameInput: "", descriptionInput: "", imageInput: "" });
      });
    };

    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler();
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          disabled={false}
          value={this.state.nameInput}
          onChange={(e) => {
            this.setState({ nameInput: e.target.value });
          }}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          disabled={false}
          value={this.state.descriptionInput}
          onChange={(e) => {
            this.setState({ descriptionInput: e.target.value });
          }}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id=""
          onChange={(e) => {
            this.setState({ imageInput: e.target.value });
          }}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" disabled={isLoading} />
      </form>
    );
  }
}
