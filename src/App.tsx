import { useEffect, useState } from 'react';
import './App.css';
import { OpenAPISpec } from './openapi-2-types';
import { Routes, Route, useNavigate, useParams} from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import PathListing from './components/spec/PathListing';
import InfoBox from './components/layout/InfoBox';
import CenteredDiv from './components/layout/CenteredDiv';
import PathDetails from './components/spec/PathDetails';
import encodings from './encodings';

const SPEC_STORAGE_KEY = 'spec';

function App() {
  const [spec, setSpec] = useState<OpenAPISpec | null>(null);
  const navigate = useNavigate();

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

  const onPathClicked = (path: string) => {
    const pathAsBase64 = encodings.unicodeToBase62(path);
    console.log(pathAsBase64)
    navigate(`/${pathAsBase64}`);
  }

  if (spec == null) {
    return (
      <p>Loading...</p>
    );
  }

  const specTitle = `${ spec.info.title } v.(${spec.info.version})`;
  document.title = specTitle;

  const getDecodedPathUrl = (encodedUrl: string): string | null => {
    let decodedUrl: string;

    try {
      decodedUrl = encodings.base62Unicode(encodedUrl);
    }
    catch(e) {
      // Not a valid URL encoding
      return null;
    }
    console.log('decoded:', decodedUrl)

    const validPaths = Object.getOwnPropertyNames(spec.paths);
    if (!validPaths.includes(decodedUrl)) {
      // Not a valid path
      return null;
    }

    return decodedUrl;
  };

  const PathDetailsForEncodedUrl = () => {
    const navigate = useNavigate();
    const { pathBase64 } = useParams();

    // Cast to string because we know pathBase64 will be defined at this point
    const pathUrl = getDecodedPathUrl(pathBase64 as string);

    console.log('url:', pathUrl)

    if (pathUrl === null) {
      // If the url is invalid, let's just bring them to the home page.
      navigate('/');
      return null;
    }

    const path = spec.paths[pathUrl as string];

    return <PathDetails url={pathUrl} path={path} />
  };

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
          <Route path="/" element={
            <PathListing paths={spec.paths} onPathClicked={onPathClicked} />
          } />
          <Route path="/:pathBase64" element={
            <PathDetailsForEncodedUrl />
          } />
        </Routes>
      </CenteredDiv>
    </div>
  );
}

export default App;
