import { createRoot } from "react-dom/client";
import SearchParams from "./components/SearchParams";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Details from "./Details";

export const App = () => {
  return (
    <BrowserRouter>
      <div>
        <h1>Adopt Me!</h1>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
