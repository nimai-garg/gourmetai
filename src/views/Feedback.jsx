import React from 'react';

const Feedback = () => {
  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', margin: 0 }}>
      <iframe
        src="https://tally.so/r/wv4Je0?transparentBackground=1"
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, border: 'none' }}
        title="Feedback Form"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      ></iframe>
    </div>
  );
};

export default Feedback;