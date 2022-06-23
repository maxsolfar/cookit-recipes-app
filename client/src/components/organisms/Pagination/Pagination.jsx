import React from "react";
import styles from "./Pagination.module.css";

import { useDispatch } from "react-redux";
import { getPage } from "../../../redux/actions";

import previousIcon from "../../../assets/pagination/prev-active.png";
import previousIconD from "../../../assets/pagination/prev-disabled.png";
import nextIcon from "../../../assets/pagination/next-active.png";
import nextIconD from "../../../assets/pagination/next-disabled.png";

function Pagination({ recipesPerPage, totalRecipes, currentPage, paginate }) {
  const pages = [];
  const dispatch = useDispatch();
  const totalPages = Math.ceil(totalRecipes / recipesPerPage);


  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const changePage = (number) => {
    paginate(number);
    dispatch(getPage(number));
  };

  return (
    <ul className={styles.Pagination}>
      <li>
        {currentPage !== 1
        ? (<button className={styles.ButtonPaginate} onClick={() => currentPage > 1 && changePage(currentPage - 1)}><b className={styles.PrevNext}>Previous</b><img src={previousIcon} alt="previous-icon-active"/></button>)
        : (<button className={styles.ButtonPaginate} disabled={true}><img src={previousIconD} alt="previous-icon-disabled"/></button>)
        }
      </li>
      {pages.map((number) => (
        <li key={number}>
          <button className={number === currentPage ? styles.NumberActive : styles.Numbers} onClick={() => changePage(number)}>
            {number}
          </button>
        </li>
      ))}
      <li>
        {currentPage !== totalPages
        ? (<button className={styles.ButtonPaginate} onClick={() => currentPage !== totalPages && changePage(currentPage + 1)}><img src={nextIcon} alt="previous-icon-active"/><b className={styles.PrevNext}>Next</b></button>)
        : (<button className={styles.ButtonPaginate} disabled={true}><img src={nextIconD} alt="next-icon-disabled"/></button>)
        }
      </li>
    </ul>
  );
}

export default Pagination;
