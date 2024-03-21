import { Link, useSearchParams } from 'react-router-dom';

const Pagination = ({ pages, currentPage }) => {
  const [, setPage] = useSearchParams();
  //if the page is 1 or less than one do not show pagination
  if (pages <= 1) {
    return;
  }

  //paginate to next page if available
  const incrementPage = () => {
    setPage(() => {
      if (currentPage < pages) {
        return { page: currentPage + 1 };
      } else return { page: currentPage };
    });
  };

  //paginate to previous page if available
  const decrementPage = () => {
    setPage(() => {
      if (currentPage > 1) {
        return { page: currentPage - 1 };
      } else return { page: currentPage };
    });
  };

  //css classes for active and not active links
  const activePageClass =
    'flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 pointer-events-none';
  const pageClass =
    'flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer';

  //pagiantion logic
  let pageList = [];
  let start = 1;
  let limit = 8;

  if (currentPage > 7) {
    start = currentPage - 6;
    limit = currentPage + 1;
  }

  for (let i = start; i < pages; i++) {
    if (i < limit) {
      pageList.push(
        <li key={i}>
          <Link
            to={`?page=${i}`}
            className={currentPage === i ? activePageClass : pageClass}
          >
            {i}
          </Link>
        </li>
      );
    } else {
      pageList.push(
        <li key={'...'}>
          <a className={pageClass}>{'...'}</a>
        </li>
      );
      break;
    }
  }

  //last page number
  pageList.push(
    <li key={pages}>
      <Link
        disabled
        to={`?page=${pages}`}
        className={currentPage === pages ? activePageClass : pageClass}
      >
        {pages}
      </Link>
    </li>
  );

  return (
    <div className="text-center w-full mb-8">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-base h-10">
          <li key={'previous'}>
            <button
              disabled={currentPage <= 1}
              onClick={decrementPage}
              className="flex cursor-pointer disabled:cursor-not-allowed items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Previous
            </button>
          </li>
          {pageList}
          <li key={'next'}>
            <button
              disabled={currentPage >= pages}
              onClick={incrementPage}
              className="flex  cursor-pointer disabled:cursor-not-allowed items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
