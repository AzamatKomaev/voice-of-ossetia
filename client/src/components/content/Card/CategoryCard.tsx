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

          <div style={{position: "absolute", bottom: "20px"}}>
            <a href={`/posts?category_id=${category.id}`} className="btn btn-primary">Перейти</a>
            <a href="/posts/create" className="btn btn-warning" style={{marginLeft: "1px"}}>Создать пост</a>
          </div>
        </div>
    </div>
  );
};

export default CategoryCard;