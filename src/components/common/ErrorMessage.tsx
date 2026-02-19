/**
 * Error message component
 */

import React from 'react';
import { Button } from './Button';

export interface ErrorMessageProps {
  message: string;
  title?: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  title = 'Oops! Something went wrong',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className="text-6xl">⚠️</div>
      
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          {message}
        </p>
      </div>
      
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          Try Again
        </Button>
      )}
    </div>
  );
};
