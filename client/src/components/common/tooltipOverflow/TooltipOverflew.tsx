'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TruncatedTextProps {
  text: string;
  className?: string;
  maxRows?: number;
}

const TooltipOverflow = ({ text, className = '', maxRows = 1 }: TruncatedTextProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        setIsOverflowing(textRef.current.scrollHeight > textRef.current.clientHeight);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [text]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <p
            ref={textRef}
            className={`overflow-hidden ${className}`}
            style={{
              display: '-webkit-box',
              WebkitLineClamp: maxRows,
              WebkitBoxOrient: 'vertical',
              wordBreak: 'break-word'
            }}
          >
            {text}
          </p>
        </TooltipTrigger>
        {isOverflowing && (
          <TooltipContent className='max-w-xs'>
            <p className='max-h-[200px] overflow-y-auto whitespace-pre-wrap'>{text}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipOverflow;
