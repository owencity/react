import React from 'react'

interface UserProfileProps {
    name: string;
    age: number;
    isAdmin: boolean;
}

export default function UserProfile({name, age, isAdmin}: UserProfileProps) {
  return (
    <>  
    <p>이름 : {name}</p>
    <p>나이: {age}</p>
    <p>{isAdmin ? "admin" : "user"}</p>
    </>
  )
}
