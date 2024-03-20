const Pagination = ({ pages }) => {
  const activePageClass =
    'flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 ';
  const pageClass =
    'flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700';

  return (
    <div className="text-center w-full mb-8">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <a className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
              Previous
            </a>
          </li>
          <li>
            <a className={pageClass}>1</a>
          </li>
          <li>
            <a className={pageClass}>2</a>
          </li>
          <li>
            <a aria-current="page" className={activePageClass}>
              3
            </a>
          </li>
          <li>
            <a className={pageClass}>4</a>
          </li>
          <li>
            <a className={pageClass}>5</a>
          </li>
          <li>
            <a className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
