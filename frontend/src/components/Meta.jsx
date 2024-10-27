import React from 'react'
import { Helmet } from 'react-helmet-async';

const Meta = ({title,description, keyword}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keyword} />
    </Helmet>
  )
}

Meta.defaultProps= {
    title: "Welcome to Proshop",
    description: "We sell best rated products",
    keyword: "electronics, buy electronics, discounted electronics"
}

export default Meta