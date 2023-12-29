import React from 'react'
import { auth } from '../firebase'

function Home() {


  /* 로그아웃 펑션 구현 또한 auth에서 가져옴 */
  const logOut = () =>{
    auth.signOut(); /* 이게 로그아웃 코드적을 것 다임... firebase에서 다해줌 Wow~ */
  }
  
  return (
    <div className='HomePage'>
      <h1>
        <button onClick={() => {logOut()}}>Log Out</button>
      </h1>
    </div>
  )
}

export default Home