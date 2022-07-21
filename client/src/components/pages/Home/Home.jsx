import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, getPage} from "../../../redux/actions";

import CardsGrid from "../../organisms/CardsGrid/CardsGrid";

import styles from "./Home.module.css";

function Home() {
  const dispatch = useDispatch();
  const { allRecipes } = useSelector((state) => state);

  useEffect(() => {
    if (allRecipes.length === 0) {
      dispatch(getAllRecipes());
      dispatch(getPage(1));

    }
  }, [dispatch, allRecipes]);

  return (
    <>
      <section className={styles.MainContainer}>
        <CardsGrid />
      </section>
    </>
  );
}

export default Home;
