import React from "react";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import ReactPaginate from "react-paginate";

const Pagination = ({ handlePageClick, pageCount }) => {
    return (
        <>
            <ReactPaginate
                breakLabel='...'
                nextLabel={
                    <span className='w-8 h-8 mx-2 hover:text-amber-400 flex items-center justify-center rounded-lg bg-gray-400'>
                        <BiSolidRightArrow />
                    </span>
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel={
                    <span className='w-8 h-8 mx-2  hover:text-amber-400 flex items-center justify-center rounded-lg bg-gray-400'>
                        <BiSolidLeftArrow />
                    </span>
                }
                renderOnZeroPageCount={null}
                containerClassName='flex items-center justify-center my-4'
                pageClassName='block mx-2 text-lg hover:bg-gray-400 flex items-center justify-center rounded-lg w-8 h-8'
                activeClassName='bg-amber-400 text-white'
            />
        </>
    );
};

export default Pagination;
