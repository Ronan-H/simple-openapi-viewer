import React from 'react';
import './InfoBox.css';

function InfoBox(props: {children: React.ReactNode, style?: React.CSSProperties}) {

  return (
    <>
      <div className="info-box" style={props.style}>
        {props.children}
      </div>
    </>
  );
}

export default InfoBox;
