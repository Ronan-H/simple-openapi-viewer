import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Info } from '../openapi-2-types';
import './SpecInfoBox.css';

function SpecInfoBox(props: Info) {

  return (
    <>
      <div className="info-box">
        <ReactMarkdown>
          {props.description}
        </ReactMarkdown>
      </div>
    </>
  );
}

export default SpecInfoBox;
