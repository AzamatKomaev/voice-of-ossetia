import React from 'react';
import {ICategory} from "../../../interfaces";
import {getMediaFullPath} from "../../../api/media";
import {Link} from "react-router-dom";

interface ICategoryCard {
  category: ICategory
}

const CategoryCard = ({category}: ICategoryCard) => {
  return (
    <div className="card">
      <Link to={`/posts?category_id=${category.id}`} className="text-dark">
        <img
          className={`category-${category.id}`}
          src={getMediaFullPath(category.avatar)}
          alt={`category-${category.id}`}
          style={{width: "100%", height: "200px"}}
        />
        <div className="card-body" style={{height: "220px"}}>
          <h5 className="card-title">{category.name}</h5>
          <p className="card-text">{category.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;