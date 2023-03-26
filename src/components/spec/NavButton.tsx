import { useNavigate } from 'react-router-dom';
import { Paths } from '../../openapi-2-types';
import PathSummary from './PathSummary';

function NavButton(props: {route: string, displayText: string}) {
  const navigate = useNavigate();

  function onClicked() {
    navigate(props.route);
  }

  return (
    <button onClick={onClicked}>{props.displayText}</button>
  );
}

export default NavButton;
