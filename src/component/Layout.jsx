import {Outlet} from 'react-router-dom'

export default function Layout(){
  return(
    <>
      <h1> layout </h1>
      {/* Outlet 중요!! Route의 자식(children) Route가 Outlet에 나옴 */}
      <Outlet></Outlet>
    </>
  )
}