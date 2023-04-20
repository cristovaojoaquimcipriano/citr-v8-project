import { createRoot } from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Link } from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { useState, lazy, Suspense } from "react";
import AdaptedPetContext from "./context/AdoptedPetContext";


const Details = lazy(()=> import("./Details"));
const SearchParams = lazy(() => import("./components/SearchParams"));


const queryClient = new QueryClient({
  defaultOptions: {
    queries:{
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  }
})
export const App = () => {
  const adaptedPet = useState(null)
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdaptedPetContext.Provider value={adaptedPet}>
          <Suspense fallback={<div className="loading-pane">
            <h2 className="loader">&</h2>
          </div>}>
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
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
