export default function Input({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
