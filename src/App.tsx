import { useEffect, useState } from 'react';
import './App.css';
import { OpenAPISpec } from './openapi-2-types';
import { Routes, Route} from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import PathListing from './components/spec/PathListing';
import InfoBox from './components/layout/InfoBox';
import CenteredDiv from './components/layout/CenteredDiv';

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
    <div className="main-container">
      <CenteredDiv>
        <h1>{ specTitle }</h1>
        <InfoBox style={{width: '30em'}}>
          <ReactMarkdown>
            {spec.info.description}
          </ReactMarkdown>
        </InfoBox>
      </CenteredDiv>

      <hr />

      <CenteredDiv style={{width: '100%'}}>
        <Routes>
          <Route path="/" element={<PathListing paths={spec.paths} />} />
        </Routes>
      </CenteredDiv>
    </div>
  );
}

export default App;
