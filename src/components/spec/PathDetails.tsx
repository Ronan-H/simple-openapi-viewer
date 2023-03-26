import { Method, Parameter, Path, Response } from '../../openapi-2-types';
import CenteredDiv from '../layout/CenteredDiv';
import NavButton from './NavButton';
import './PathDetails.css';

type PathDetailsProps = {
  url: string,
  path: Path,
};

function PathDetails(props: PathDetailsProps) {
  const pathMethods = Object.getOwnPropertyNames(props.path) as Method[];

  return (
    <>
      <NavButton route="/" displayText="Back to Path Listing"/>

      {pathMethods.map((method) => {
        const endPoint = props.path[method];
        const parameters = endPoint.parameters;
        const responses = endPoint.responses;

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

          <h3>Responses:</h3>

          <CenteredDiv>
            <ResponseDetails response={responses} />
          </CenteredDiv>
        </div>;
      })}
    </>
  );
}

function ParameterDetails(props: {parameter: Parameter}) {
  const parameterEntries = Object
    .entries(props.parameter)
    // We can't assume parameterEntries wil be in any particular order,
    // so let's just sort them alphabetically by key to keep the order
    // consistant.
    .sort((a, b) => a[0].localeCompare(b[0]));

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

function ResponseDetails(props: {response: Response}) {
  const responseEntries = Object
    .getOwnPropertyNames(props.response)
    .map((code) => {
      const codeAsInt = parseInt(code);
      return {
        statusCode: codeAsInt,
        details: props.response[parseInt(code)]
      }
    })
    // We can't assume responseEntries wil be in any particular order,
    // so let's sort them numerically by status code.
    .sort((a, b) => a.statusCode - b.statusCode );

  return (
    <div className="parameter-table">
      <table cellPadding="7">
        <tbody>
          {responseEntries.map(({statusCode, details}) => {
            return (
              <tr key={statusCode}>
                <th>{statusCode.toString()}</th>
                <td>{details.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PathDetails;
