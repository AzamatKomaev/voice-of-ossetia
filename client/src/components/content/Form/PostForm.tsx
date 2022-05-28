import React, {useState} from 'react';
import {ContentAPI} from "../../../api/content";
import {ICategory} from "../../../interfaces";
import FileCard from "../Card/FileCard";
import {useDispatch, useSelector} from "react-redux";
import {ADD_FILES} from "../../../store/fileReducer";
import {IRootState} from "../../../store";

interface IPostForm {
  categories: Array<ICategory> | undefined | boolean
}

const PostForm = ({categories}: IPostForm) => {
  const dispatch = useDispatch()

  const files = useSelector((state: IRootState) => state.file.values)
  const [categoryId, setCategoryId] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [location, setLocation] = useState<string>("")

  const [errors, setErrors] = useState({
    title: null,
    description: null,
    location: null,
    category_id: null
  })

  const handleFilesInput = (e: any) => {
    dispatch({
      type: ADD_FILES,
      payload: {
        addedFiles: e.target.files
      }
    })
  }

  const handleCreatePostButton = async() => {
    const formData = new FormData();
    formData.append('title', title)
    formData.append('description', description)
    formData.append('location', location)
    formData.append('category_id', categoryId)

    files.forEach((file: any) => {
      formData.append('files[]', file)
    })
    console.log(formData)

    const response = await ContentAPI.createPost(formData)

    if (response.status === 201) alert('cool');
    else if (response.status === 422) setErrors(response.data.errors);
    else alert(`${response.status} status code`);
  }

  return (
    <div>
      <div className="container col-12 col-sm-8 col-md-7 col-lg-5">
        <h3 style={{textAlign: "center"}}>Создать пост</h3><br/>
        <div className="form-group">
          <label htmlFor="category_id">Категория</label>
          <select
            className="form-select"
            id="category_id"
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
          >
            <option value="">Выберите категорию</option>

            {typeof categories === 'object'
              ?
              categories.map((category, index) => (
                <option key={index} value={category.id}>{category.name}</option>
              ))
              :
              null
            }
          </select>
          {errors.category_id ? <p className="text-danger">{errors.category_id[0]}</p> : <p></p>}
        </div>
        <div className="form-group">
          <label htmlFor="title">Заголовок</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Введите заголовок"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          {errors.title ? <p className="text-danger">{errors.title[0]}</p> : <p></p>}
        </div>
        <div className="form-group">
          <label htmlFor="name">Описание</label>
          <textarea
            className="form-control"
            id="description"
            placeholder="Опишите проблему/суть поста"
            rows={2}
            value={description}
            onChange={e => setDescription(e.target.value)}
          >
          </textarea>
          {errors.description ? <p className="text-danger">{errors.description[0]}</p> : <p></p>}
        </div>
        <div className="form-group">
          <label htmlFor="location">Место действия</label>
          <input
            type="text"
            className="form-control"
            id="location"
            placeholder="Введите место действия"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <small className="text-muted">Необходимо указать город и улицу</small>
          {errors.location ? <p className="text-danger">{errors.location[0]}</p> : <p></p>}
        </div>
        <div className="form-group">
          <label htmlFor="files">Файлы* (необязательно, но желательно)</label>
          <input
            multiple={true}
            type="file"
            className="form-control"
            id="files"
            onChange={handleFilesInput}
          /><br/>
          {files && files.length > 0 ?
            <div style={{marginTop: "-15pt"}}>
              <p style={{fontSize: "20pt"}}>Всего: {files.length}</p>
              {files.map((file, index) => (
                <div key={index} className="card">
                  {file ? <FileCard file={file}/> : null}
                </div>
              ))}
            </div>
          :
            null
          }
        </div>
        <br/>
        <button className="btn btn-primary" onClick={handleCreatePostButton}>Зарегистрироваться!</button>
        <br/>
        <small>* - необязательные поля для заполнения</small>
      </div>
    </div>
  );
};

export default PostForm;