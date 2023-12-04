import React from 'react';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink, MDBBtn } from 'mdb-react-ui-kit';

const Pagination = ({currentPage, pageLimit, loadBlog, data, totalBlog}) => {

    const renderPagination = () => {

        if((!totalBlog) || (currentPage === 0 && data.length < 2) || (totalBlog === pageLimit && currentPage === 0))
            return null;

        if(currentPage === 0) {
            return (
                <MDBPagination center className='mb-0 align-items-center'>
                    <MDBPaginationItem>
                        <MDBPaginationLink>1</MDBPaginationLink>
                    </MDBPaginationItem>
                    
                    <MDBPaginationItem>
                        <MDBPaginationLink>
                            <MDBBtn rounded onClick={() => loadBlog(3, 10, 1)}>Next</MDBBtn>
                        </MDBPaginationLink>
                    </MDBPaginationItem>
                </MDBPagination>
            )
        } else if(currentPage < pageLimit - 1 && data.length === pageLimit) {
            return (
                <MDBPagination center className='mb-0 align-items-center'>
                    <MDBPaginationItem>
                        <MDBPaginationLink>
                            <MDBBtn rounded onClick={() => loadBlog((currentPage - 1) * 3, currentPage * 3, -1)}>Prev</MDBBtn>
                        </MDBPaginationLink>
                    </MDBPaginationItem>

                    <MDBPaginationItem>
                        <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
                    </MDBPaginationItem>

                    <MDBPaginationItem>
                        <MDBPaginationLink>
                            <MDBBtn rounded onClick={() => loadBlog((currentPage + 1) * 3, (currentPage + 2) * 3, 1)}>Next</MDBBtn>
                        </MDBPaginationLink>
                    </MDBPaginationItem>
                </MDBPagination>
            )
        } else {
            return (
                <MDBPagination center className='mb-0 align-items-center'>
                    <MDBPaginationItem>
                        <MDBPaginationLink>
                            <MDBBtn rounded onClick={() => loadBlog((currentPage - 1) * 3, currentPage * 3, -1)}>Prev</MDBBtn>
                        </MDBPaginationLink>
                    </MDBPaginationItem>

                    <MDBPaginationItem>
                        <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
                    </MDBPaginationItem>
                </MDBPagination>
            )
        }
    }

    return <div>{renderPagination()}</div>
}

export default Pagination