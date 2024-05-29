import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog, requestDogs } from "../types-and-globals";
import toast from "react-hot-toast";

type FunctionalCreateDogFormProps = {
  repopulateDogs: () => Promise<void>;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
};

export function FunctionalCreateDogForm({
  repopulateDogs,
  setIsLoading,
  isLoading,
}: FunctionalCreateDogFormProps) {
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [imageInput, setImageInput] = useState("/assets/blue-heeler.png");

  const onSubmitHandler = (): void => {
    setIsLoading(true);
    const dog: Omit<Dog, "id"> = {
      description: descriptionInput,
      image: imageInput,
      name: nameInput,
      isFavorite: false,
    };
    requestDogs.post(dog).then(() => {
      toast.success("Dog Created");
      repopulateDogs();
      setNameInput("");
      setDescriptionInput("");
      setImageInput("");
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
        value={nameInput}
        onChange={(e) => {
          setNameInput(e.target.value);
        }}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={false}
        value={descriptionInput}
        onChange={(e) => {
          setDescriptionInput(e.target.value);
        }}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        onChange={(e) => {
          setImageInput(e.target.value);
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
