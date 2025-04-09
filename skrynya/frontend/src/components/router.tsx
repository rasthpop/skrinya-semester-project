import { BrowserRouter, Routes, Route } from "react-router-dom";
import GatherList from "./GatherList";
import GatherDetails from "./GatherDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GatherList />} />
        <Route path="/gathering/:id" element={<GatherDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
