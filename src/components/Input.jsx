function Input({ type, name, placeholder, error, defaultValue, id }) {
  return (
    <div>
      <input
        className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ${error ? 'border-red-500 text-red-500' : ''}`}
        type={type || 'text'}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        id={id}
      />
      <small className="text-red-500 m-0 h-3 ml-1 block">{error}</small>
    </div>
  );
}

export default Input;
