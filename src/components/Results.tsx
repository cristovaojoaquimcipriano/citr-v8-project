import { Pet as PetType } from "../api/ResponsesTypes";
import Pet from "./Pet";

const Results = ({ pets }: {pets: PetType[]}) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => (
          <Pet
            animal={pet.animal}
            name={pet.name}
            images={pet.images}
            breed={pet.breed}
            id={pet.id}
            location={`${pet.city}, ${pet.state}`}
            key={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
