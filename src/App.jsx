import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { Link, Route, Routes } from "react-router-dom";
import {Provider} from "react-redux"
import store from "./store"

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
  
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
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
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
