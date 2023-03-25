import './CenteredDiv.css';

function CenteredDiv(props: {children: React.ReactNode, style?: React.CSSProperties}) {

  return (
    <>
      <div className={'centered-div'} style={props.style}>
        {props.children}
      </div>
    </>
  );
}

export default CenteredDiv;
