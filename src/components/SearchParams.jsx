import { useQuery } from "@tanstack/react-query";
import {
  useContext,
  useDeferredValue,
  useMemo,
  useState,
  useTransition,
} from "react";
import fetchSearch from "../api/fetchSearch";
import AdoptedPetContext from "../context/AdoptedPetContext";
import useBreedList from "../hooks/useBreedList";
import Results from "./Results";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);

  const [isPending, startTransition] = useTransition();

  const results = useQuery(["pets", requestParams], fetchSearch);
  const pets = results.data?.pets || [];

  const deferredPets = useDeferredValue(pets);
  const renderedPets = useMemo(
    () => <Results pets={deferredPets} />,
    [deferredPets]
  );

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formDta = new FormData(e.target);
          const obj = {
            animal: formDta.get("animal") ?? "",
            breed: formDta.get("breed") ?? "",
            location: formDta.get("location") ?? "",
          };

          startTransition(() => {
            setRequestParams(obj);
          });
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
          >
            (
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
            )
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select id="breed" name="breed" disabled={breeds.length === 0}>
            <option />
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        {isPending ? (
          <div className="min loading-pane">
            <h2 className="loader">🐩</h2>
          </div>
        ) : (
          <button>Submit</button>
        )}
      </form>
      {renderedPets}
    </div>
  );
};

export default SearchParams;
