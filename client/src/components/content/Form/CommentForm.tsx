import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../store";
import {HttpSender} from "../../../api/api-client";
import {ADD_COMMENTS} from "../../../store/commentReducer";
import {IPost} from "../../../interfaces";

interface ICommentForm {
  post: IPost
}

const CommentForm = ({post}: ICommentForm) => {
  const dispatch = useDispatch()
  const auth = useSelector((state: IRootState) => state.auth)
  const [description, setDescription] = useState<string>("")

  const handleCreateCommentButton = async() => {
    if (!description) {
      return ;
    }
    const sender = new HttpSender('comments')
    const response = await sender.create({
      description: description,
      post_id: post.id
    })
    if (response.status === 201) {
      dispatch({
        type: ADD_COMMENTS,
        payload: {
          addedComments: [response.data]
        }
      })
      setDescription("");
    } else {
      alert(`${response.status} error`)
    }
  }

  if (!auth.isAuth || !auth.data.is_active) {
    return (<div></div>)
  }

  return (
    <div>
      <div className="form-group">
        <label htmlFor="name">Описание</label>
        <div style={{display: "flex"}}>
          <textarea
            className="form-control"
            id="description"
            placeholder="Напишите комментарий"
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
          <button className="btn btn-primary" onClick={handleCreateCommentButton}>Добавить</button>
        </div>
      </div>
    </div>
  )
}

export default CommentForm;