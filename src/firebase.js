import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";


/* 추가 import getAuth */
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDJXCmBfw4JHRT02dTabJHesdi-Au7gK8g",
  authDomain: "nwitter-d1bdc.firebaseapp.com",
  projectId: "nwitter-d1bdc",
  storageBucket: "nwitter-d1bdc.appspot.com",
  messagingSenderId: "836497218481",
  appId: "1:836497218481:web:b30a379f4a2813dd0a3b90",
  measurementId: "G-4K9SD8REE9"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); //사용 안해도됨


/* 로그인 구현 */
/* (중요!) npm install @firebase/auth   파이어배스는 굉장히 크기때문에 각 기능을 따로 import 해줘야한다!! */
export const auth = getAuth(app); /* 위에 만들어진 config(api등등들어있음)로 초기화해뒀던 app 을 이용함  다른곳에서 import해서 사용하기위해 export  */