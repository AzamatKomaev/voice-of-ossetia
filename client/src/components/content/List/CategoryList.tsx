import React from 'react';
import {ICategory} from "../../../interfaces";
import CategoryCard from "../Card/CategoryCard";

interface ICategoryList {
  list: Array<ICategory> | boolean | undefined
}

const CategoryList = ({list}: ICategoryList) => {
  return (
    <div className="row">
      {typeof list === 'object'
      ?
        list.map((category, index) => (
          <div key={index} className="col-md-6 col-lg-4 col-xl-3">
            <CategoryCard category={category}/><br/>
          </div>
        ))
      :
        null
      }
    </div>
  );
};

export default CategoryList;