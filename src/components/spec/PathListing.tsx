import { Paths } from '../../openapi-2-types';
import PathSummary from './PathSummary';

function PathListing(props: {paths: Paths, onPathClicked: any}) {
  const pathEntries = Object.entries(props.paths);

  return (
    <>
      {pathEntries
        // Sort paths alphabetically by URL
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([url, path]) => {
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
