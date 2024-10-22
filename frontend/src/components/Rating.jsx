import React from 'react'
import { FaStar ,FaRegStar,FaStarHalfAlt } from "react-icons/fa";

const Rating = ({value, text}) => {
    // console.log(value)
  return (
    <div className='d-flex align-items-center justify-content-center my-2' style={{fontSize:"14px"}}>
        <span className="ratingstar d-flex">
         {value>=1 ? <FaStar/> : value >= 0.5 ? <FaStarHalfAlt/>:<FaRegStar/>}
        </span>
        <span className="ratingstar d-flex">
         {value>=2 ? <FaStar /> : value >= 1.5 ?  <FaStarHalfAlt/>:<FaRegStar/> }
        </span>
        <span className="ratingstar d-flex">
         {value>=3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt/>:<FaRegStar/>  }
        </span>
        <span className="ratingstar d-flex">
         {value>=4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt/> : <FaRegStar/>}
        </span>
        <span className="ratingstar d-flex">
         {value>=5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt/>:<FaRegStar/>  }
        </span>
        <span className="text-rating fw-bolder ms-1 "  >{text&&text} reviews</span>
    </div>
  )
}

export default Rating