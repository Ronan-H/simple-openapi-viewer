import { Paths } from '../../openapi-2-types';
import PathDetails from './PathDetails';
import './PathListing.css';

function PathListing(props: {paths: Paths}) {
  const pathEntries = Object.entries(props.paths);

  return (
    <>
      {pathEntries.map(([url, path]) => {
        return (
          <PathDetails key={url} url={url} path={path} />
        );
      })}
    </>
  );
}

export default PathListing;
