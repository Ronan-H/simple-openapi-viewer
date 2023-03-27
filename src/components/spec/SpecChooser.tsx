import './SpecChooser.css';
import { useNavigate } from "react-router-dom";
import InfoBox from '../../components/layout/InfoBox';
import CenteredDiv from '../../components/layout/CenteredDiv';
import { toTitleCase } from '../../utils';

export const SPEC_URLS = {
  petstore: 'https://petstore.swagger.io/v2/swagger.json',
  uber: 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v2.0/json/uber.json',
};

export type SpecName = keyof typeof SPEC_URLS;

function SpecChooser() {
  const navigate = useNavigate();

  document.title = 'OpenAPI 2.0 Viewer'

  return (
    <div className="main-container">
      <CenteredDiv>
        <h2>Choose a spec:</h2>
        {
          Object.getOwnPropertyNames(SPEC_URLS)
            .map((specName) => {
              return (
                <InfoBox key={specName} onClick={() => navigate(`/${specName}`)}>
                  {toTitleCase(specName)}
                </InfoBox>
              );
            })
        }
      </CenteredDiv>
    </div>
  );
}

export default SpecChooser;
