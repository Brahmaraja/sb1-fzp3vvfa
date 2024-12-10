import React from 'react';
import { Switch } from '@headlessui/react';

interface UnitToggleProps {
  isCelsius: boolean;
  onToggle: () => void;
}

export const UnitToggle: React.FC<UnitToggleProps> = ({ isCelsius, onToggle }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className={`text-sm ${isCelsius ? 'font-bold' : ''}`}>°C</span>
      <Switch
        checked={!isCelsius}
        onChange={onToggle}
        className={`${
          !isCelsius ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        <span
          className={`${
            !isCelsius ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
      <span className={`text-sm ${!isCelsius ? 'font-bold' : ''}`}>°F</span>
    </div>
  );
};