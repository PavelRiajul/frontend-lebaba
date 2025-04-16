// TextInput.jsx
const TextInput = ({ type, label, name, placeholder, value, onChange }) => {
    return (
      <div className="mb-4">
        <label className="block  text-sm font-medium">{label}</label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>
    );
  };
  
  export default TextInput; // Default export