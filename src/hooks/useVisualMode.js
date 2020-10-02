import React, {useState, useEffect} from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode) => {
    setMode(newMode);
    setHistory([...history, newMode]);
  }
  
  const back = () => {
    if (history.length > 1) {
      console.log('before delete',history, mode);
      setHistory(history.filter(x => x != mode));
      console.log('after delete', history, mode)
      console.log('what is new mode', history[(history.length)-2])
      setMode(history[(history.length)-2]);
      console.log('after back', history, mode)
    }
  }

  return { mode, transition, back };
}