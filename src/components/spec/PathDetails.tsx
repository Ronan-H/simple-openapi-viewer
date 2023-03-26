import { Path } from '../../openapi-2-types';
import './PathDetails.css';

type PathDetailsProps = {
  url: string,
  path: Path,
};

function PathDetails(props: PathDetailsProps) {
  const pathMethods = Object.getOwnPropertyNames(props.path);

  return (
    <>
      {pathMethods.map((method) => {
        return <>
          <h2>{method.toUpperCase()} {props.url}</h2>
        </>;
      })}
    </>
  );
}

export default PathDetails;
