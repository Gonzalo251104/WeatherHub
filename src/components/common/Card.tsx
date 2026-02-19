/**
 * Card component with glass morphism effect
 */

import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  onClick 
}) => {
  const hoverClass = hover ? 'cursor-pointer hover:scale-[1.02]' : '';
  const clickableClass = onClick ? 'cursor-pointer' : '';
  
  return (
    <div
      className={`card ${hoverClass} ${clickableClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
