import React, { useState, useRef } from 'react';

const CopyButton = ({ text }) => {
  const textRef = useRef(null);

  const handleCopyClick = () => {
    if (textRef.current) {
      textRef.current.select();
      document.execCommand('copy');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        readOnly
        style={{ position: 'absolute', left: '-9999px' }}
        ref={textRef}
      />
      <button onClick={handleCopyClick}>
        {'העתק'}
      </button>
    </div>
  );
};

export default CopyButton;
