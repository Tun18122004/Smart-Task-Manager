export default function Stat({ title, value, danger }) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow transition">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p
        className={`text-2xl font-bold mt-1 ${
          danger ? "text-red-500" : "text-gray-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}