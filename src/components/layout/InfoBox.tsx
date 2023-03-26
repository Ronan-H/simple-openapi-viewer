import React from 'react';
import './InfoBox.css';

type InfoBoxProps = {
  children: React.ReactNode,
  style?: React.CSSProperties,
  onClick?: React.MouseEventHandler<Element>,
}

function InfoBox(props: InfoBoxProps) {
  const className = 'info-box' + (props.onClick ? ' clickable-info-box' : '');

  return (
    <>
      <div className={className} style={props.style} onClick={props.onClick}>
        {props.children}
      </div>
    </>
  );
}

export default InfoBox;
