import { Pagination } from "react-bootstrap";
import React from 'react'
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({page,pages,keyword='',isAdmin = false}) => {

    return (
    pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map(itm => (
                <LinkContainer to={!isAdmin? keyword ? `/search/${keyword}/page/${itm+1}` : `/page/${itm+1}` : `/admin/productlist/${itm+1}`} ><Pagination.Item  key={itm} active={page===(itm+1)}>{itm+1}</Pagination.Item></LinkContainer>
            ))}
        </Pagination>
    )
  )
}

export default Paginate;