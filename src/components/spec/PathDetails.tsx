import { Method, Parameter, Path, Response } from '../../openapi-2-types';
import CenteredDiv from '../layout/CenteredDiv';
import NavButton from './NavButton';
import './PathDetails.css';

function toTitleCase(str: string) {
  return str[0].toUpperCase() + str.substring(1);
}

const DEFAULT_RESPONSE_KEY = 'default';
function compareStatusCode(a: string, b: string) {
  if (a === DEFAULT_RESPONSE_KEY) {
    return -1;
  }
  else if (b === DEFAULT_RESPONSE_KEY) {
    return 1;
  }

  return parseInt(a) - parseInt(b);
}

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

        const paramLocations = endPoint.parameters.map((param) => param.in);
        const uniqueParamLocations = Array.from(new Set(paramLocations));

        return <>
          {uniqueParamLocations.map((paramLocation) => {
            return (
              <div key={paramLocation}>
                <h2 >{method.toUpperCase()} {props.url}</h2>

                <h3>{`${toTitleCase(paramLocation)} parameters:`}</h3>

                {parameters.filter((param) => param.in === paramLocation).map((parameter) => {
                  return (
                    <CenteredDiv key={parameter.name}>
                      <ParameterDetails parameter={parameter} />
                    </CenteredDiv>
                  );
                })}
              </div>
            );
          })}

          <h3>Responses:</h3>

          <CenteredDiv>
            <ResponseDetails response={responses} />
          </CenteredDiv>
        </>
      })}
    </>
  );
}

const HIDDEN_FIELDS = ['schema', 'in'];

function ParameterDetails(props: {parameter: Parameter}) {
  const parameterEntries = Object
    .entries(props.parameter)
    .filter(([key, _]) => !HIDDEN_FIELDS.includes(key))
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
    .map((status) => {
      return {
        status,
        details: props.response[status]
      }
    })
    // We can't assume responseEntries wil be in any particular order,
    // so let's sort them numerically by status code.
    .sort((a, b) => compareStatusCode(a.status, b.status));

  return (
    <div className="parameter-table">
      <table cellPadding="7">
        <tbody>
          {responseEntries.map(({status, details}) => {
            return (
              <tr key={status}>
                <th>{status.toString()}</th>
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
