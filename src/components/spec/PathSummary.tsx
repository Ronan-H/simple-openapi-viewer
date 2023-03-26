import { Path } from '../../openapi-2-types';
import InfoBox from '../layout/InfoBox';
import './PathSummary.css';

type PathSummaryProps = {
  url: string,
  path: Path,
  onClick: React.MouseEventHandler<Element>,
};

function PathSummary(props: PathSummaryProps) {
  const pathMethods = Object.getOwnPropertyNames(props.path);

  return (
    <InfoBox style={{width: '100%', padding: '15px'}} onClick={props.onClick}>
      <div className="details-grid">
        <h2 className="path-url">{props.url}</h2>
        <div className="methods-list">
          {pathMethods.map((method) => {
            return <InfoBox key={method}>{method.toUpperCase()}</InfoBox>
          })}
        </div>
      </div>
    </InfoBox>
  );
}

export default PathSummary;
