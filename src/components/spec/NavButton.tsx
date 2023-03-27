import { useNavigate } from 'react-router-dom';

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
