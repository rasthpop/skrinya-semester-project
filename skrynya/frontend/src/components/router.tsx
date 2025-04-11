import { BrowserRouter, Routes, Route } from "react-router-dom";
import GatherList from "./jar_list";
import GatherDetails from "./jar_details";

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
