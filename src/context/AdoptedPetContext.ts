import { createContext } from "react";
import { Pet } from "../api/ResponsesTypes";

const AdaptedPetContext = createContext<[Pet | null, (adoptedPet: Pet) => void]>([
  {
    id: 1333,
    name: "Pepito",
    animal: "dog",
    description: "Pepito es un perro muy bueno y cariñoso",
    breed: "Poodle",
    images: [],
    city: "Madrid",
    state: "Madrid",
  },
  () => {
    //
  },
]);

export default AdaptedPetContext;
