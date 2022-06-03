import React, {useState} from 'react';

const CommentForm = () => {
  const [description, setDescription] = useState<string>("")

  const [errors, setErrors] = useState({
    description: null
  })

  return (
    <div>
      <div className="form-group">
        <label htmlFor="name">Описание</label>
        <div style={{display: "flex"}}>
          <textarea
            className="form-control"
            id="description"
            placeholder="Опишите проблему/суть поста"
            rows={5}
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
          <button className="btn btn-primary">Добавить</button>
        </div>
        {errors.description ? <p className="text-danger">{errors.description[0]}</p> : <p></p>}
      </div>
    </div>
  );
};

export default CommentForm;