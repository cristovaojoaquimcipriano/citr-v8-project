import { QueryStatus, useQuery } from "@tanstack/react-query";
import fetchBreedList from "../api/fetchBreedList";
import { Animal } from "../api/ResponsesTypes";

 const  useBreedList = (animal: Animal) => {
  const results = useQuery(["breeds", animal], fetchBreedList);

  return [results?.data?.breeds ?? [], results.status] as [
    string[], 
    QueryStatus
  ]
}


export default useBreedList;
