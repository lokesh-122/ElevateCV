import { ColorScheme } from '../types';

export const getColorClasses = (colorScheme: ColorScheme) => {
  switch (colorScheme) {
    case 'blue':
      return {
        bgClass: 'bg-blue-600 dark:bg-blue-700',
        textClass: 'text-blue-600 dark:text-blue-400',
        borderClass: 'border-blue-600 dark:border-blue-400',
      };
    case 'green':
      return {
        bgClass: 'bg-green-600 dark:bg-green-700',
        textClass: 'text-green-600 dark:text-green-400',
        borderClass: 'border-green-600 dark:border-green-400',
      };
    case 'purple':
      return {
        bgClass: 'bg-purple-600 dark:bg-purple-700',
        textClass: 'text-purple-600 dark:text-purple-400',
        borderClass: 'border-purple-600 dark:border-purple-400',
      };
    case 'red':
      return {
        bgClass: 'bg-red-600 dark:bg-red-700',
        textClass: 'text-red-600 dark:text-red-400',
        borderClass: 'border-red-600 dark:border-red-400',
      };
    case 'gray':
      return {
        bgClass: 'bg-gray-600 dark:bg-gray-700',
        textClass: 'text-gray-600 dark:text-gray-400',
        borderClass: 'border-gray-600 dark:border-gray-400',
      };
    default:
      return {
        bgClass: 'bg-blue-600 dark:bg-blue-700',
        textClass: 'text-blue-600 dark:text-blue-400',
        borderClass: 'border-blue-600 dark:border-blue-400',
      };
  }
};