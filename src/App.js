import {Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

/* pages */
import Login from './page/Login';
import Home from './page/Home';
import CreateAccount from './page/CreateAccount';
import Profile from './page/Profile';

/* component */
import Layout from './component/Layout';
import LoadingScreen from './component/LoadingScreen';
import ProtectedRoute from './component/ProtectedRoute';


/* firebase.js 에서 받아오는 firebase 기능들 */
import { auth } from './firebase'; /* authentication */

function App() {

  const [isLoading, setIsLoading] = useState(true);
  
  const init = async() => {
    /* wait for firebase */
    
    /* 인증 상태가 준비되었는지 기다림, 최초 인증 상태가 완료될 때 실행되는 Promise 를 return함 즉, Firebase가 쿠키와 토큰을 읽고 백엔드와 소통해서 로그인 여부를 확인하는 동안 기다림 */
    await auth.authStateReady(); 

    setIsLoading(false);
  }
  useEffect(()=>{
    init();
  },[]);

  return (
    <div className="App">
      {isLoading ? <LoadingScreen/> : 
      <Routes>
        <Route path='/' element={<Layout></Layout>}> {/* Layout 은 children으로 Home과 Profile을 가짐 - 인증된 사용자만 볼 수 있도록 할것임*/}
          <Route index element={
            <ProtectedRoute> 
                  {/* ProtectedRoute를 사용하여 로그인된 유저만 Children인 Home를 리턴받음 아니면 계정생성으로 가게끔 함 */}
              <Home></Home>
            </ProtectedRoute>
          }/>
          <Route path='profile' element={
            <ProtectedRoute>
              <Profile></Profile>
            </ProtectedRoute>
          }/>
        </Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/create-account' element={<CreateAccount></CreateAccount>}></Route>
       </Routes>}
       
    </div>
  );
}

export default App;
