

import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'

const SearchBar = () => {
    const navigate = useNavigate();
    const {keyword: urlKeyword} = useParams();
    const [keyword, setkeyword] = useState(urlKeyword || "");

    const submitHandler= (e) => {
      e.preventDefault();
      if(keyword.trim()){
        navigate(`/search/${keyword}`);
      }
      else{
        navigate('/page/1')
      }
      setkeyword("");
    }

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control  type='text' name='' 
        className='mr-sm-2 ml-sm-5 border-light'
        value={keyword} placeholder='Search Product...'
        onChange={(e)=> setkeyword(e.target.value)}>
        </Form.Control>
        <Button type='submit' className='btn-dark   border-light mx-2 p-2 btn-sm'>Search</Button>
    </Form>
  )
}

export default SearchBar