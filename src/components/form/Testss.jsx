import React, { useState, useEffect } from 'react';

const Testss = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Update the progress value over time (for demonstration purposes)
    const progressInterval = setInterval(() => {
      setProgress(prevProgress => (prevProgress < 100 ? prevProgress + 10 : 0));
    }, 1000); // Update every second

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div style={{ width: '200px', height: '100px' }}>
    <svg width={200} height={100} style={{transform: 'rotateY(180deg)', overflow: 'hidden'}}><circle cx={100} cy={100} r={90} fill="none" stroke="#D0D0CE" strokeWidth={10} strokeDasharray="282.7433388230814" style={{strokeDashoffset: '282.743'}} /><circle cx={100} cy={100} r={90} fill="none" stroke="#02B732" strokeWidth={10} strokeDasharray="282.7433388230814" style={{transition: 'stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s ease 0s', strokeDashoffset: '205.022'}} /></svg>
    </div>
  );
};

export default Testss;
