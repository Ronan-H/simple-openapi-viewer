import { useEffect, useState } from 'react';
import './App.css';
import SpecInfoBox from './components/SpecInfoBox';
import { OpenAPISpec } from './openapi-2-types';

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
        .then((data) => {
          localStorage.setItem(SPEC_STORAGE_KEY, JSON.stringify(data));
          setSpec(data);
        });
    }
  }, []);

  if (spec == null) {
    return (
      <p>Loading...</p>
    );
  }

  const specTitle = `${ spec.info.title } v.(${spec.info.version})`;
  document.title = specTitle;

  return (
    <div className="main-content">
      <h1>{ specTitle }</h1>
      <SpecInfoBox {...spec.info} />
    </div>
  );
}

export default App;
