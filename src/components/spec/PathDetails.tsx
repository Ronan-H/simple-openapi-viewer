import { Path } from '../../openapi-2-types';
import InfoBox from '../layout/InfoBox';
import './PathDetails.css';

function PathDetails(props: {url: string, path: Path}) {
  const pathMethods = Object.getOwnPropertyNames(props.path);

  return (
    <>
      <InfoBox style={{width: '100%'}}>
        <>
          <div className="details-grid">
            <h2 className="path-url">{props.url}</h2>
            <div className="methods-list">
              {pathMethods.map((method) => {
                return <InfoBox key={method}>{method.toUpperCase()}</InfoBox>
              })}
            </div>
          </div>
        </>
      </InfoBox>
    </>
  );
}

export default PathDetails;
