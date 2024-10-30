/* eslint-disable react-hooks/exhaustive-deps */
import { MutableRefObject, useEffect } from 'react';

export function useOutsideAlerter(
  ref: MutableRefObject<any>,
  handleFunction: (value: boolean) => void,
  variable: boolean,
  parentRef: MutableRefObject<any>
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleFunction(variable);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
