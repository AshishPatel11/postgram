function Button({ isLoading, type, children }) {
  return (
    <>
      <button
        className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:bg-slate-400 cursor-pointer disabled:cursor-not-allowed"
        type={type}
        disabled={isLoading ? true : false}
      >
        {children}
        {isLoading && (
          <div className="animate-spin ease-linear rounded-full size-6 border-t-2 border-b-2 border-white ml-3"></div>
        )}
      </button>
    </>
  );
}

export default Button;
