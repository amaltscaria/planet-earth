import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PlanetEarth from "./components/PlanetEarth";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlanetEarth />} />
      </Routes>
    </Router>
  );
};

export default App;
