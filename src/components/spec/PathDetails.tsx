import { Path } from '../../openapi-2-types';
import InfoBox from '../layout/InfoBox';
import './PathListing.css';

function PathDetails(props: {url: string, path: Path}) {
  const pathMethods = Object.getOwnPropertyNames(props.path);

  return (
    <>
      <InfoBox style={{width: '100%'}}>
        <>
          {props.url} {pathMethods.map((method) => {
            return <p key={method}>{method.toUpperCase()}</p>
          })}
        </>
      </InfoBox>
    </>
  );
}

export default PathDetails;
