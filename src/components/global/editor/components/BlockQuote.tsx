'use client';

import { cn } from '@/lib/utils';
import { useSlideStore } from '@/store/useSlideStore';
import React from 'react';

interface BlockQuoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  children: React.ReactNode;
  className?: string;
};

const BlockQuote = ({ children, className, ...props }: BlockQuoteProps) => {
  const { currentTheme } = useSlideStore();

  return (
    <blockquote
      className={cn(
        'border-l-4 pl-4 italic',
        className
      )}
      style={{ borderColor: currentTheme?.fontColor }}
      {...props}
    >
      {children}
    </blockquote>
  );
};

export default BlockQuote;