import {useState} from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  console.log('in side history', history);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (!replace) {
      setHistory([...history, newMode]);
    } else {
      history[history.length-1] = newMode;
      setHistory(history);
    }
  };
  
  const back = () => {
    if (history.length > 1) {
      history.pop();
      setHistory(history);
      setMode(history[(history.length)-1]);
    }
  };

  return { mode, transition, back };
};