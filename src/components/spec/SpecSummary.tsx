import { useEffect, useState } from 'react';
import './SpecSummary.css';
import { OpenAPISpec } from '../../openapi-2-types';
import { Routes, Route, useNavigate, useParams} from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import PathListing from '../../components/spec/PathListing';
import InfoBox from '../../components/layout/InfoBox';
import CenteredDiv from '../../components/layout/CenteredDiv';
import PathDetails from '../../components/spec/PathDetails';
import encodings from '../../encodings';
import NavButton from './NavButton';
import { SpecName, SPEC_URLS } from './SpecChooser';

function SpecSummary() {
  const specName = useParams().specName as SpecName | undefined;
  const [spec, setSpec] = useState<OpenAPISpec | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (specName === undefined || !Object.getOwnPropertyNames(SPEC_URLS).includes(specName)) {
      navigate('/');
      return;
    }

    // Let's use localStorage to cache the available specs.
    const localStorageSpec = localStorage.getItem(specName);

    if (localStorageSpec !== null) {
      setSpec(JSON.parse(localStorageSpec));
    }
    else {
      fetch(SPEC_URLS[specName])
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem(specName, JSON.stringify(data));
          setSpec(data);
        });
    }
  }, []);

  const onPathClicked = (path: string) => {
    const pathAsBase64 = encodings.unicodeToBase62(path);
    navigate(`/${specName}/${pathAsBase64}`);
  }

  if (spec == null) {
    return (
      <CenteredDiv>
        <h1>Loading...</h1>
      </CenteredDiv>
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

    useEffect(() => {
      if (pathUrl === null) {
        // If the url is invalid, let's just bring them to the home page.
        navigate('/');
      }
    }, []);

    if (pathUrl == null) {
      return null;
    }

    const path = spec.paths[pathUrl as string];

    return <PathDetails url={pathUrl} path={path} />
  };

  return (
    <div className="summary-container">
      <CenteredDiv>
        <div className="back-button">
          <NavButton route="/" displayText="Back to Spec Chooser"/>
        </div>

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

export default SpecSummary;
