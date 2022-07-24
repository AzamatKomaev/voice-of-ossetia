import React from 'react';
import {Link, useParams} from "react-router-dom";
import {useFetch} from "../utils/hooks";
import Spinner from "../components/common/Spinner";
import Http404Error from "../components/common/Http404Error";

const ActivationUserPage = () => {
  const {uuid} = useParams();

  // eslint-disable-next-line
  const [activation, activationStatus, activationLoading]: ReturnType<typeof useFetch> = useFetch(
    `api/auth/activate/${uuid}/`, 'delete', {}
  )

  if (activationLoading) {
    return <Spinner/>
  }

  if (activationStatus === 404) {
    return <Http404Error/>
  }

  return (
    <div style={{marginLeft: "10px"}}>
      <h1>Вы успешно подтвердили ваш аккаунт!</h1>
      <Link to={`/`}>На главную</Link>
    </div>
  );
};

export default ActivationUserPage;