import { useEffect, useState } from 'react';
import './App.css';
import { OpenAPISpec } from './openapi-2-types';
import { Routes, Route, useNavigate, useParams} from "react-router-dom";
import SpecChooser from './components/spec/SpecChooser';
import SpecSummary from './components/spec/SpecSummary';

export const SPEC_URLS = {
  petstore: 'https://petstore.swagger.io/v2/swagger.json',
  uber: 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v2.0/json/uber.json',
};

export type SpecName = keyof typeof SPEC_URLS;

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
