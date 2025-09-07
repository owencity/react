import Nav from './Nav'

export default function Header() {
  return (
    <>
    <div>Header</div>
    <Nav/>
    </>
  )
}

// 리액트에서 return 문안에 최상위요소는 하나여야한다.
// 최상위 요소가 여러개일 경우 fragment(<></>)로 감싸준다.
// fragment는 화면에 영향을 주지 않는다.
// fragment 대신 <div></div>로 감싸도 되지만, div가 불필요하게 많아지는 단점이 있다.