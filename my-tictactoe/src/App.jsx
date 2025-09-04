import { useState } from "react";

/*
[읽기 순서 가이드]
1) Game: 최상위 상태(히스토리/현재수)와 렌더 트리 시작점
2) Board: 클릭 처리, 불변성, 승자 계산 호출, 하이라이트
3) Square: 단순 버튼(값 표시 + 클릭 이벤트)
4) calculateWinner: 승자 판정 알고리즘

[렌더 흐름]
Game -> Board -> Square (부모가 자식에게 props 전달)

[클릭/상태 업데이트 흐름]
Square.onClick -> Board.handleClick -> onPlay(next) 호출 -> Game.handlePlay -> setState -> re-render
*/

/** [3] 자식: 버튼 1칸. 값(value)과 클릭 핸들러를 부모로부터 props로 받음 */
function Square({ value, onClick, highlight }) {
  return (
    <button
      className={`square${highlight ? " highlight" : ""}`}
      onClick={onClick} // [E1] 사용자가 클릭하면 부모(Board)에서 내려준 onClick이 실행됨
    >
      {value}
    </button>
  );
}

/** [2] 중간 부모: 3x3 보드. 상태는 갖지 않고, 상위(Game)에서 내려준 props로만 렌더 */
function Board({ xIsNext, squares, onPlay }) {
  // [2-1] 한 칸 클릭 시의 처리: 승자 있거나 이미 값 있으면 무시
  function handleClick(i) {
    // [검증] 이미 승자가 있거나, 해당 칸이 채워졌으면 클릭 무시
    if (calculateWinner(squares) || squares[i]) return;

    // [핵심] 불변성 유지: 기존 배열 직접 수정 X → 복사본 생성 후 수정
    const next = squares.slice(); // 🔑 squares는 부모(Game)의 상태 스냅샷
    next[i] = xIsNext ? "X" : "O"; // [2-1-1] 턴에 따라 값 기록

    // [2-1-2] 부모(Game)에게 다음 상태 전달(lift up). 여기서 실제 상태 업데이트는 Game에서 수행
    onPlay(next);
  }

  // [2-2] 승자 정보 계산(현재 보드 기준). player(문자), line(하이라이트 인덱스)
  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.player ?? null;

  // [2-3] 상단 상태 문구
  const status = winner
    ? `승자: ${winner}`
    : `다음 차례: ${xIsNext ? "X" : "O"}`;

  // [2-4] 승리 줄 하이라이트 여부 판단 함수
  const isHighlighted = (i) => winnerInfo?.line?.includes(i);

  // [2-5] 3행 3열을 렌더하는 헬퍼
  const renderSquare = (i) => (
    <Square
      key={i}
      value={squares[i]}
      onClick={() => handleClick(i)} // [E0] Square로 이벤트 핸들러 전달
      highlight={isHighlighted(i)}
    />
  );

  return (
    <>
      {/* [2-6] 현재 상태 표시 */}
      <div className="status">{status}</div>

      {/* [2-7] 보드 9칸 렌더 */}
      <div className="board-row">{[0, 1, 2].map(renderSquare)}</div>
      <div className="board-row">{[3, 4, 5].map(renderSquare)}</div>
      <div className="board-row">{[6, 7, 8].map(renderSquare)}</div>
    </>
  );
}

/** [1] 최상위: 게임 전체. '히스토리'와 '현재 수'를 상태로 보유 → 시간여행 */
export default function Game() {
  // [1-1] history: 각 수마다의 보드 배열을 기록. 첫 상태는 9칸 null
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // 길이가 9인 빈 배열 생성, useState(초기값)
  // state -> 현재 상태 값 , useState에 넣은 초기값이 여기에 바로 들어감. 
  // setState -> 상태를 바꿀 때 사용하는 업데이트 함수
  // [1-2] 현재 몇 번째 수인지. 짝수 = X 차례
  const [currentMove, setCurrentMove] = useState(0);

  // [1-3] 파생 값: 현재 보드와 다음 차례
  const xIsNext = currentMove % 2 === 0; // 짝수 수 = X 차례
  const currentSquares = history[currentMove]; // 현재 보드 스냅샷

  // [1-4] 보드에서 한 수 두면 호출됨: 히스토리 자르기 + 새 상태 push
  function handlePlay(nextSquares) {
    // (되돌아간 상태에서 새로 두면) 현재 수 뒤의 히스토리를 잘라냄
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    // 상태 업데이트 → 리렌더 트리거
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // [1-5] 시간여행: 특정 수로 점프
  function jumpTo(move) {
    setCurrentMove(move); // 렌더 기준점 변경
  }

  // [1-6] 이동 리스트(시간여행 버튼들)
  const moves = history.map((squares, move) => {
    const desc = move ? `#${move}로 가기` : "게임 시작으로";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      {/* [1-7] 자식(Board)에게 현재 보드와 콜백 전달 → 렌더 시작점 */}
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      {/* [1-8] 우측 시간여행 패널 */}
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

/** [4] 승자 계산: 8가지 승리 라인 중 하나가 같으면 그 플레이어가 승자 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // [4-1] 모든 승리 라인을 검사
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: [a, b, c] }; // [4-2] 승자와 하이라이트 라인 반환
    }
  }
  return null; // [4-3] 승자 없음
}


function Post(post: Pkst) {
 fucntion handLinst(ked_) { 
  return div ?
 }
}