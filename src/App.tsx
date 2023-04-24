import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import AdaptedPetContext from "./context/AdoptedPetContext";
import { Pet } from "./api/ResponsesTypes";

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./components/SearchParams"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      suspense: true,
    },
  },
});
export const App = () => {
  const adaptedPet = useState(null as Pet | null);
  return (
    <QueryClientProvider client={queryClient}>
      <AdaptedPetContext.Provider value={adaptedPet}>
        <Suspense
          fallback={
            <div className="loading-pane">
              <h2 className="loader">🐶</h2>
            </div>
          }
        >
          <header>
            <Link to="/"> Adopt Me! </Link>
          </header>

          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </Suspense>
      </AdaptedPetContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
