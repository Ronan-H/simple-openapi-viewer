import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { OpenAPISpec } from './types';

const SPEC_STORAGE_KEY = 'spec';

function App() {

  const [spec, setSpec] = useState<OpenAPISpec | null>(null);

  useEffect(() => {
    const localStorageSpec = localStorage.getItem(SPEC_STORAGE_KEY);

    if (localStorageSpec !== null) {
      setSpec(JSON.parse(localStorageSpec));
    }
    else {
      fetch('https://petstore.swagger.io/v2/swagger.json')
        .then((response) => response.json())
        .then((data) => setSpec(data));
    }
  }, []);

  if (spec == null) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <p>{ spec.swagger }</p>
  );
}

export default App;
