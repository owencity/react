import React from 'react'

// 이벤트 객체 배우기

export default function Button() {
    const handleClick = (
        message: string,
        event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log('click');
        console.log(event);
    }
  return (
    <>
    <button onClick= {(event) => handleClick("click!", event)}>클릭</button>
    </>
  )
}
