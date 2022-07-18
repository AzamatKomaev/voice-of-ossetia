import React, {useEffect} from 'react';

const Captcha = () => {
  const handleCaptcha = (response: any) => {
    alert(response)
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true

    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div
      className="g-recaptcha"
      data-sitekey="6LeKffsgAAAAAMWElUlIuCCXiNUgIr21n6g3JEP6"
      data-callback="handleCaptcha"
    ></div>
  )
};

export default Captcha;