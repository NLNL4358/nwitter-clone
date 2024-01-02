import React from 'react'
import { useState } from "react";
import { useNavigate , Link} from "react-router-dom";


/* css */
import "./css/Login.css"




/* 로그인을 위한 auth */
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from 'firebase/auth'; /* 로그인func */


function Login() {

  const navigate = useNavigate();
  
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(""); /* 에러초기화 */

    /* 로딩중이거나 비어있으면 return */
    if(isLoading  || email === "" || password === "")return;

    try{

      setLoading(true);

            /* log in an account */
      await signInWithEmailAndPassword(auth, email, password);

            /* redirect to the homepage */
      /* 로그인이 끝내면 다시금 root로 이동한다 */
      navigate("/");

    }catch(error){
      console.log(error.code, error.message);

      if(error instanceof FirebaseError){
        setError(error.message)
      }
    }
    finally{
      setLoading(false)
    }
  }


  return (
    <div className="LoginPage">
      <div className="LoginWrap">
        <h3 className="LoginTitle">Log-in to 𝕏</h3>
        <form className="LoginFrom" action="" onSubmit={(e)=>{onSubmit(e)}}>
          {/* required 는 form에서 submit 되기전 필수로 채워져있어야한다는 input 임을 알려주는 것! */}
          <input className="LoginInput " name="e-mail" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" type="email" required/>
          <input className="LoginInput " name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" type="password" required/>
          <input className="LoginInput " type="submit" value={isLoading ? "Loading..." : "Create account"} />
        </form>
        {error !== "" ? <h4 className="errorMessageInLogin">{error}</h4> : null}
        <div className="goToCreateAccountPageWrap">
          <span className='goToCreateAccountPageSpan'>Don't you have an account?</span>
          <Link className="goToCreateAccountPageLink" to='/create-account'>Create One</Link>
        </div>
      </div>
    </div>
  )
}

export default Login