import { useState } from "react";
import { useNavigate } from "react-router-dom";


/* css */
import "./css/CreateAccount.css"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


/* 로그인을 위한 auth */
import { auth } from "../firebase";

export default function CreateAccount(){
  const navigate = useNavigate();
  
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    /* 로딩중이거나 비어있으면 return */
    if(isLoading || name === "" || email === "" || password === "")return;

    try{

      setLoading(true);

            /* create an account */
      /* createUserWithEmailAndPassword 을 이용해 계정 생성하는데 성공하면 유저의 정보를 준다*/
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      console.log(credentials.user); /* 유저의 정보를 바로 볼 수 있다 이렇게하면 */


            /* set the name of the user. */
      await updateProfile(credentials.user, {
        displayName : name,
      })

            /* redirect to the homepage */
      /* 계정 등록이 끝내면 다시금 root로 이동한다 */
      navigate("/");

    }catch(error){
      setError(error.message);
    }
    finally{
      setLoading(false)
    }




  }

  return (
    <div className="CreateAccountPage">
      <div className="LoginWrap">
        <h3 className="LoginTitle">Join 𝕏</h3>
        <form className="LoginFrom" action="" onSubmit={(e)=>{onSubmit(e)}}>
          {/* required 는 form에서 submit 되기전 필수로 채워져있어야한다는 input 임을 알려주는 것! */}
          <input className="LoginInput " name="name" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Name" type="text" required /> 
          <input className="LoginInput " name="e-mail" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" type="email" required/>
          <input className="LoginInput " name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" type="password" required/>
          <input className="LoginInput " type="submit" value={isLoading ? "Loading..." : "Create account"} />
        </form>
        {error !== "" ? <h4 className="errorMessageInLogin">{error}</h4> : null}
      </div>
    </div>
  );
}