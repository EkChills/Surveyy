import { cn } from '@/lib/utils';
import React from 'react';

const MaxWidthWrapper = ({  className, children }:{className:string; children:React.ReactNode}) => {
  return (
    <div className={cn('mx-auto px-4 sm:px-6 md:px-10 lg:px-[12rem] w-full', className)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
