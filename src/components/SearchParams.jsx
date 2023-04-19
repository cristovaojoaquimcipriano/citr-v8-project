import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import fetchSearch from "../api/fetchSearch";
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

  const results = useQuery(["pets", requestParams], fetchSearch);
  const pets = results.data?.pets || [];

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
          setRequestParams(obj);
        }}
      >
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
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
