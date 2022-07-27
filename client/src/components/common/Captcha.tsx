import React, {useEffect} from 'react';
import Spinner from "./Spinner";
import Reaptcha from "reaptcha";
import {useDispatch, useSelector} from "react-redux";
import {setRecaptchaLoading, setRecaptchaResponse, setVerified} from "../../utils/Actions/captcha";
import {IRootState} from "../../store";

const Captcha = () => {
  const dispatch = useDispatch()
  const captcha = useSelector((state: IRootState) => state.captcha)

  const onLoad = () => {
    dispatch(setRecaptchaLoading(false))
  }

  const onVerify = (recaptchaResponse: string) => {
    dispatch(setVerified(true))
    dispatch(setRecaptchaResponse(recaptchaResponse))
  }

  useEffect(() => {
    return () => {
      dispatch(setRecaptchaLoading(true))
      dispatch(setVerified(false))
      dispatch(setRecaptchaResponse(""))
    }
  }, [])

  return (
    <div>
      {captcha.recaptchaLoading && <Spinner/>}
      <Reaptcha sitekey="6LeKffsgAAAAAMWElUlIuCCXiNUgIr21n6g3JEP6" onVerify={onVerify} onLoad={onLoad}/><br/>
    </div>
  );
};

export default Captcha;