/* 기본적으로 체크하는 라우트 로그인한 사용자는 protected를 볼 수 있고 로그인 안되있으면 개정생성 페이지로 이동하도록 할것임 */
/* Home과 Profile을 보호하는 목적의 페이지인것임! */

import { useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

/* children 이라는 Route를 메개변수로 받고 user를 확인해서 로그인되었다면 Route를 반환할꺼임 */
export default function ProtectedRoute({children}){

  const navigate = useNavigate();

  /* 로그인되어있으면 유저정보를 줄것이고 아니면 null을 줌 */
  const user = auth.currentUser;

  useEffect(()=>{
    if(user === null){
      navigate("/login");
    }
  },[user, navigate])
  
  return user ? children : null;
}