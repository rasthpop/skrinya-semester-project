import React from 'react';

export const UserPoints = ({ points }) => {
  return (
    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
      <span className="text-sm font-medium text-gray-700">{points} pts</span>
    </div>
  );
};