import React from 'react';

export const SearchBar = ({ value, onChange, placeholder = "Пошук..." }) => {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full py-2 px-4 pr-16 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
        <UserPoints points={254} />
        <UserAvatar src="/path-to-avatar.jpg" />
      </div>
    </div>
  );
};