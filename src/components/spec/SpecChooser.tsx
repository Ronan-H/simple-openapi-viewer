import { useEffect, useState } from 'react';
import './SpecChooser.css';
import { OpenAPISpec } from '../../openapi-2-types';
import { Routes, Route, useNavigate, useParams} from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import PathListing from '../../components/spec/PathListing';
import InfoBox from '../../components/layout/InfoBox';
import CenteredDiv from '../../components/layout/CenteredDiv';
import { toTitleCase } from './PathDetails';

export const SPEC_URLS = {
  petstore: 'https://petstore.swagger.io/v2/swagger.json',
  uber: 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v2.0/json/uber.json',
};

export type SpecName = keyof typeof SPEC_URLS;

function SpecChooser() {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <CenteredDiv>
        <h1>Choose a spec:</h1>
      </CenteredDiv>

      <CenteredDiv>
        {
          Object.getOwnPropertyNames(SPEC_URLS)
            .map((specName) => {
              return (
                <InfoBox onClick={() => navigate(`/${specName}`)}>
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
