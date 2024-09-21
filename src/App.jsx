import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import PlanetEarth from "./components/PlanetEarth";

const App = () => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 330) {
        window.resizeTo(330, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlanetEarth />} />
      </Routes>
    </Router>
  );
};

export default App;
