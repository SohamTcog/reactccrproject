import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface CircularProgressBarProps {
  value: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ value }) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: 300 }}>
      <CircularProgress
        size={200}
        thickness={2}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        value={value}
      />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        {value}%
      </div>
    </div>
  );
};

export default CircularProgressBar;
