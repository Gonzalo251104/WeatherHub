/**
 * Loading skeleton component for better UX
 */

import React from 'react';

export interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  className = '',
  variant = 'rectangular',
}) => {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };
  
  return (
    <div
      className={`animate-pulse bg-gray-300 dark:bg-gray-700 ${variantClasses[variant]} ${className}`}
      style={{ width, height }}
    />
  );
};
