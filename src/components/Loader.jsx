function Loader() {
  return (
    <>
      <div className="w-full h-full absolute top-0 left-0 z-50 bg-slate-800 bg-opacity-40 flex items-center justify-center backdrop-box">
        <div className="animate-spin ease-linear rounded-full size-28 border-t-4 border-b-4 border-blue-500 ml-3"></div>
      </div>
    </>
  );
}

export default Loader;
