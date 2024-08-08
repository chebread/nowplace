import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

const useLongPress = (handleLongPress: any, ms = 3000, debounceMs = 300) => {
  const [startLongPress, setStartLongPress] = useState(false);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    let timerId: any;
    if (startLongPress && event) {
      timerId = setTimeout(() => handleLongPress(null, event), ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [handleLongPress, ms, startLongPress, event]);

  const startPress = (e: any) => {
    setEvent(e);
    setStartLongPress(true);
  };

  const stopLongPress = () => setStartLongPress(false);

  return {
    onMouseDown: startPress,
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: startPress,
    onTouchEnd: () => setStartLongPress(false),
    stopLongPress,
  };
};

export default useLongPress;
