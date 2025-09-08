
import UserProfile from "./component/UserProfile"

export default function App() {
  return (
    <div><h1>사용자목록</h1>
      <UserProfile name="Alice" age={30} isAdmin={true}/>
      <UserProfile name="Bob" age={25} isAdmin={false}/>
      </div>

  )
}

/*
<button onClick={() => {}}>버튼</button>
버튼 클릭 만들 때 onclick 이벤트는 함수로 전달해야한다
이유는 함수가 실행되는 시점이 다르기 때문이다

<button onClick={handleClick}></button>
1. 매개변수가 없으면 위의 방법으로
<button onClick={() => handleClick(1)}></button>
2. 매개변수가 있으면 화살표함수로 감싸서 전달한다


*/


