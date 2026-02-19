/**
 * Date and time formatting utilities
 */

/**
 * Format Unix timestamp to readable date
 */
export const formatDate = (timestamp: number, format: 'short' | 'long' = 'short'): string => {
  const date = new Date(timestamp * 1000);
  
  if (format === 'long') {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format Unix timestamp to time string
 */
export const formatTime = (timestamp: number, format: '12h' | '24h' = '12h'): string => {
  const date = new Date(timestamp * 1000);
  
  if (format === '24h') {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }
  
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

/**
 * Format Unix timestamp to day of week
 */
export const formatDayOfWeek = (timestamp: number, format: 'short' | 'long' = 'short'): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: format,
  });
};

/**
 * Get time of day from timestamp (morning, afternoon, evening, night)
 */
export const getTimeOfDay = (timestamp: number): 'morning' | 'afternoon' | 'evening' | 'night' => {
  const hour = new Date(timestamp * 1000).getHours();
  
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
};

/**
 * Check if timestamp is today
 */
export const isToday = (timestamp: number): boolean => {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Get relative time (e.g., "2 hours ago", "in 3 days")
 */
export const getRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diffMs = timestamp * 1000 - now;
  const diffMins = Math.floor(Math.abs(diffMs) / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  const isPast = diffMs < 0;
  const suffix = isPast ? 'ago' : 'from now';
  
  if (diffMins < 60) return `${diffMins} min ${suffix}`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ${suffix}`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ${suffix}`;
};
