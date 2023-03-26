import { Paths } from '../../openapi-2-types';
import PathSummary from './PathSummary';

function PathListing(props: {paths: Paths, onPathClicked: any}) {
  const pathEntries = Object.entries(props.paths);

  return (
    <>
      {pathEntries.map(([url, path]) => {
        return (
          <PathSummary
            key={url}
            url={url}
            path={path}
            onClick={() => props.onPathClicked(url)}
          />
        );
      })}
    </>
  );
}

export default PathListing;
