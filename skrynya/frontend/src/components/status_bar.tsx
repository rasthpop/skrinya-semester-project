export function StatusBar({ current, total }) {
    const percentage = Math.round((current / total) * 100);
  
    return (
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">User name</span>
          <span className="text-gray-600">Status</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between mt-2 text-sm">
          <span>{current.toLocaleString()}</span>
          <span>{total.toLocaleString()}</span>
        </div>
      </div>
    );
  }