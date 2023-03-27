import { Routes, Route } from "react-router-dom";
import SpecChooser from './components/spec/SpecChooser';
import SpecSummary from './components/spec/SpecSummary';

function App() {

  return (
    <Routes>
      <Route path="/" element={
        <SpecChooser />
      } />
      <Route path="/:specName/*" element={
        <SpecSummary />
      } />
    </Routes>
  );
}

export default App;
