import React, {useEffect, useState} from 'react';

export function ProgressBar({currentPageIndex, length}) {
  const[progress, setProgress] = useState(0);

  useEffect(() => { 
    setProgress(currentPageIndex/(length - 1) * 100);
  }, [currentPageIndex, length]);

  return (
    <div className="progress">
      <div className="progress-label">Step {currentPageIndex + 1} of {length}</div>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{width: `${progress}%`}}></div>
      </div>
    </div>
  )
}

