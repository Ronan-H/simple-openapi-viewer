import { Method, Parameter, Path } from '../../openapi-2-types';
import CenteredDiv from '../layout/CenteredDiv';
import './PathDetails.css';

type PathDetailsProps = {
  url: string,
  path: Path,
};

function PathDetails(props: PathDetailsProps) {
  const pathMethods = Object.getOwnPropertyNames(props.path) as Method[];

  return (
    <>
      {pathMethods.map((method) => {
        const parameters = props.path[method].parameters;

        return <div key={method}>
          <h2 >{method.toUpperCase()} - {props.url}</h2>

          <h3>Parameters:</h3>

          {parameters.map((parameter) => {
            return (
              <CenteredDiv key={parameter.name}>
                <ParameterDetails parameter={parameter} />
              </CenteredDiv>
            );
          })}
        </div>;
      })}
    </>
  );
}

function ParameterDetails(props: {parameter: Parameter}) {
  const parameterEntries = Object.entries(props.parameter);
  // We can't assume parameterEntries wil be in any particular order,
  // so let's just sort them alphabetically by key to keep the order
  // consistant.
  parameterEntries.sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <div className="parameter-table">
      <table cellPadding="7">
        <tbody>
          {parameterEntries.map(([key, value]) => {
            return (
              <tr key={key}>
                <th>{key}</th>
                <td>{value.toString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PathDetails;
