import React, {useEffect, useState} from 'react';
import {ContentAPI} from "../../../api/content";
import {CategoryAPI} from "../../../api/categories";

interface ICategoryFormErrors {
  name: Array<string> | null,
  description: Array<string> | null,
  avatar: Array<string> | null
}

const CategoryForm = () => {
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [avatar, setAvatar] = useState("")

  const [errors, setErrors] = useState<ICategoryFormErrors>({
    name: null,
    description: null,
    avatar: null
  })

  const handleChangeFileInput = (e: any) => {
    const inputFiles = e.target.files
    if (inputFiles.length > 0) {
      setAvatar(inputFiles[0])
    }
  }

  const handleCreateCategoryButton = async() => {
    const formData = new FormData();
    formData.append('name', name)
    formData.append('description', description)
    formData.append('avatar', avatar)

    const response = await CategoryAPI.create(formData)

    if (response.status === 201) {
      alert('Категория была создана успешна')
    }
    else setErrors(response.data.errors)
  }

  return (
    <div>
      <div className="container col-12 col-sm-8 col-md-7 col-lg-5">
        <h3 style={{textAlign: "center"}}>Создать категорию</h3><br/>
        <div className="form-group">
          <label htmlFor="name">Название</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Введите название"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {errors.name ? <p className="text-danger">{errors.name[0]}</p> : <p></p>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Описание</label>
          <textarea
            className="form-control"
            id="description"
            placeholder="Введите описание"
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
          {errors.description ? <p className="text-danger">{errors.description[0]}</p> : <p></p>}
        </div>
        <div className="form-group">
          <input
            type="file"
            className="form-control"
            aria-label="Upload"
            onChange={handleChangeFileInput}
          />
          {errors.avatar ? <p className="text-danger">{errors.avatar[0]}</p> : <p></p>}
        </div>
        <br/><br/>
        <button className="btn btn-primary" onClick={handleCreateCategoryButton}>Создать</button>
      </div>
    </div>
  );
};

export default CategoryForm;