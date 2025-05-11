import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

export const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default',
  onPress,
  disabled = false,
  className = '',
  ...props 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'default':
        return 'bg-indigo-600 text-white';
      case 'destructive':
        return 'bg-red-600 text-white';
      case 'outline':
        return 'border border-gray-300 bg-transparent text-gray-800';
      case 'secondary':
        return 'bg-gray-200 text-gray-800';
      case 'ghost':
        return 'bg-transparent hover:bg-gray-100 text-gray-800';
      case 'link':
        return 'bg-transparent underline text-indigo-600';
      default:
        return 'bg-indigo-600 text-white';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'default':
        return 'py-2 px-4 text-base';
      case 'sm':
        return 'py-1 px-3 text-sm';
      case 'lg':
        return 'py-3 px-6 text-lg';
      case 'icon':
        return 'w-10 h-10 p-0';
      default:
        return 'py-2 px-4 text-base';
    }
  };

  const baseClasses = 'rounded-md font-medium transition-colors flex items-center justify-center';
  const disabledClasses = disabled ? 'opacity-50' : '';
  const combinedClasses = `${baseClasses} ${getVariantClasses()} ${getSizeClasses()} ${disabledClasses} ${className}`;

  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className={variant === 'default' || variant === 'destructive' ? 'text-white' : 'text-gray-800'}>
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export const Card = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <View 
      className={`bg-white rounded-lg shadow-sm p-4 ${className}`}
      {...props}
    >
      {children}
    </View>
  );
};

export const CardHeader = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <View 
      className={`mb-3 ${className}`}
      {...props}
    >
      {children}
    </View>
  );
};

export const CardTitle = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <Text 
      className={`text-xl font-bold text-gray-800 ${className}`}
      {...props}
    >
      {children}
    </Text>
  );
};

export const CardDescription = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <Text 
      className={`text-sm text-gray-600 ${className}`}
      {...props}
    >
      {children}
    </Text>
  );
};

export const CardContent = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <View 
      className={`${className}`}
      {...props}
    >
      {children}
    </View>
  );
};

export const CardFooter = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <View 
      className={`mt-3 pt-3 border-t border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </View>
  );
};

export const Spinner = ({ 
  size = 'default', 
  color = 'indigo-600',
  className = '',
  ...props 
}) => {
  const getSizeValue = () => {
    switch (size) {
      case 'sm': return 'small';
      case 'lg': return 'large';
      default: return 'small';
    }
  };

  return (
    <View className={`flex items-center justify-center ${className}`} {...props}>
      <ActivityIndicator 
        size={getSizeValue()} 
        color={color.includes('#') ? color : `#6366f1`} 
      />
    </View>
  );
}; 