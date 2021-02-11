import React, { useState, useEffect } from 'react';
// import axios from 'axios'
import ReactPaginate from 'react-paginate';
import '../../index.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getList } from '../../redux/lib/api';
import { getAccommList } from '../../redux/modules/accommodations';

function Pagination() {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const location = useLocation();

  const accommodations = useSelector(state => state.accommodations);
  
  const history = useHistory();
  const handlePageClick = e => {
    const url = new URL(window.location.href);
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
    if (!url.searchParams.get('page')) { 
      url.searchParams.append('page', selectedPage + 1);
      console.log('페이지 없을 경우 추가해서 값 넣어준다');
      history.push(url.search);
      window.scrollTo(0, 0);
    }
    
    if (url.searchParams.get('page')) { 
      console.log('페이지 있는 경우에는 덮어쓰기');

      url.searchParams.set('page', selectedPage + 1);
      history.push(url.search);
      window.scrollTo(0, 0);
    } 
  };

  useEffect(() => {
    // getData();
  }, [ offset]);

  return (
    <div>
      {/* {data} */}
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={accommodations.pageable.totalPages - 1}
        marginPagesDisplayed={1}
        pageRangeDisplayed={4}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default Pagination;