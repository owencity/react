
import UserProfile from "./component/UserProfile"

export default function App() {
  return (
    <div><h1>사용자목록</h1>
      <UserProfile name="Alice" age={30} isAdmin={true}/>
      <UserProfile name="Bob" age={25} isAdmin={false}/>
      </div>

  )
}
