import React from 'react';
import {ICategory} from "../../../interfaces";
import {getMediaFullPath} from "../../../api/media";

interface ICategoryCard {
  category: ICategory
}

const CategoryCard = ({category}: ICategoryCard) => {
  return (
    <div className="card" style={{position: "relative"}}>
      <img
        className="card-img-top"
        src={getMediaFullPath(category.avatar)}
        alt="Card image cap"
        style={{height: "200px"}}
      />
        <div className="card-body" style={{height: "250px"}}>
          <h5 className="card-title">{category.name}</h5>
          <p className="card-text">{category.description}</p>
          <a href="#" className="btn btn-primary" style={{position: "absolute", bottom: "20px"}}>Перейти</a>
        </div>
    </div>
  );
};

export default CategoryCard;