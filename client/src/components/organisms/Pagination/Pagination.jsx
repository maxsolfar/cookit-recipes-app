import React, {useState} from "react";
import styles from "./Pagination.module.css";

import { useDispatch } from "react-redux";
import { getPage } from "../../../redux/actions";

import previousIcon from "../../../assets/pagination/prev-active.png";
import previousIconD from "../../../assets/pagination/prev-disabled.png";
import nextIcon from "../../../assets/pagination/next-active.png";
import nextIconD from "../../../assets/pagination/next-disabled.png";

function Pagination({ recipesPerPage, totalRecipes, currentPage, paginate, numberLimit }) {
  const pages = [];
  const dispatch = useDispatch();
  const totalPages = Math.ceil(totalRecipes / recipesPerPage);

  const [maxLimitPage, setMaxLimitPage] = useState(numberLimit);
  const [minLimitPage, setMinLimitPage] = useState(0);

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const changePage = (number) => {
    paginate(number);
    dispatch(getPage(number));
  };

  const nextPage = (number) => {
    paginate(number);
    dispatch(getPage(number));

    if(currentPage+1 > maxLimitPage){
      setMaxLimitPage(maxLimitPage + numberLimit);
      setMinLimitPage(minLimitPage + numberLimit);
    }
  };

  const prevPage = (number) => {
    paginate(number);
    dispatch(getPage(number));

    if((currentPage-1)%numberLimit===0){
      setMaxLimitPage(maxLimitPage - numberLimit);
      setMinLimitPage(minLimitPage - numberLimit);
    }
  };

  const renderPages = pages.map((number) => {
    if(number < maxLimitPage+1 && number > minLimitPage){
      return(
        <li key={number}>
          <button className={number === currentPage ? styles.NumberActive : styles.Numbers} onClick={() => changePage(number)}>
          {number}
          </button>
        </li>
      )
    } 
    else{
      return null;
    }
  });

  return (
    <ul className={styles.Pagination}>
      <li>
        {currentPage !== 1
        ? (<button className={styles.ButtonPaginate} onClick={() => currentPage > 1 && prevPage(currentPage - 1)}><img src={previousIcon} alt="previous-icon-active"/></button>)
        : (<button className={styles.ButtonPaginate} disabled={true}><img src={previousIconD} alt="previous-icon-disabled"/></button>)
        }
      </li>
      {renderPages}
  
      <li>
        {currentPage !== totalPages
        ? (<button className={styles.ButtonPaginate} onClick={() => currentPage !== totalPages && nextPage(currentPage + 1)}><img src={nextIcon} alt="previous-icon-active"/></button>)
        : (<button className={styles.ButtonPaginate} disabled={true}><img src={nextIconD} alt="next-icon-disabled"/></button>)
        }
      </li>
    </ul>
  );
}

export default Pagination;
