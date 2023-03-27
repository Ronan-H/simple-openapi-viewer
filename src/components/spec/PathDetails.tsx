import { useParams } from 'react-router-dom';
import { Method, Parameter, Path, Response } from '../../openapi-2-types';
import { compareStatusCode, toTitleCase } from '../../utils';
import CenteredDiv from '../layout/CenteredDiv';
import NavButton from './NavButton';
import './PathDetails.css';
import { SpecName } from './SpecChooser';

type PathDetailsProps = {
  url: string,
  path: Path,
};

function PathDetails(props: PathDetailsProps) {
  const specName = useParams().specName as SpecName;
  const pathMethods = Object.getOwnPropertyNames(props.path) as Method[];

  return (
    <>
      <NavButton route={`/${specName}`} displayText="Back to Path Listing"/>

      {pathMethods.map((method) => {
        const endPoint = props.path[method];
        const parameters = endPoint.parameters;
        const responses = endPoint.responses;

        return (
          <div key={method}>
            <h2 >{method.toUpperCase()} {props.url}</h2>

            <ParameterList parameters={parameters} />

            <h3>Responses:</h3>

            <CenteredDiv>
              <ResponseDetails response={responses} />
            </CenteredDiv>
          </div>
        );
      })}
    </>
  );
}

const HIDDEN_FIELDS = ['schema', 'in', 'items'];

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
            const renderedValue = (
              typeof value === 'object' ?
              JSON.stringify(value) : value.toString()
            );

            return (
              <tr key={key}>
                <th>{key}</th>
                <td>{renderedValue}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ParameterList(props: {parameters: Parameter[]}) {
  if (!props.parameters || props.parameters.length === 0) {
    return null;
  }

  const paramLocations = props.parameters.map((param) => param.in);
  const uniqueParamLocations = Array.from(new Set(paramLocations));

  return (
    <>
      {uniqueParamLocations.map((paramLocation) => {
        return (
          <div key={paramLocation}>
            <h3>{`${toTitleCase(paramLocation)} parameters:`}</h3>

            {props.parameters.filter((param) => param.in === paramLocation).map((parameter) => {
              return (
                <CenteredDiv key={parameter.name}>
                  <ParameterDetails parameter={parameter} />
                </CenteredDiv>
              );
            })}
          </div>
        );
      })}
    </>
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
