export function ActionButtons() {
    const buttons = [
      "Транспорт",
      "Бронетехніка",
      "Логістика",
      "Детальніше"
    ];
  
    return (
      <div className="flex flex-wrap gap-4 mb-8">
        {buttons.map((text) => (
          <button
            key={text}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {text}
          </button>
        ))}
      </div>
    );
  }