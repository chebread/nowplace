import { useState, useEffect } from 'react';

const useLongPress = (callback = () => {}, ms = 1000) => {
  // default ms = 1000
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId: any;
    if (startLongPress) {
      timerId = setTimeout(callback, ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [callback, ms, startLongPress]);

  // const stopLongPress = () => {
  //   setStartLongPress(false);
  //   console.log('중지됨');
  // };

  const stopLongPress = () => {
    setStartLongPress(false);
    console.log('중지됨');
  };

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false),
    stopLongPress,
  };
};

export default useLongPress;
