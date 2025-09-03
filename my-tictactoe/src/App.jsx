import { useState } from "react";

/** 자식: 버튼 1칸. 값(value)과 클릭 핸들러를 부모로부터 props로 받음 */
function Square({ value, onClick, highlight }) {
  return (
    <button
      className={`square${highlight ? " highlight" : ""}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

/** 중간 부모: 3x3 보드. 상태는 갖지 않고, 상위(Game)에서 내려준 props로만 렌더 */
function Board({ xIsNext, squares, onPlay }) {
  // 한 칸 클릭 시의 처리: 승자 있거나 이미 값 있으면 무시
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) return;
    const next = squares.slice();          // 🔑 불변성: 기존 배열 직접 수정 X
    next[i] = xIsNext ? "X" : "O";         // 턴에 따라 값 기록
    onPlay(next);                          // 부모(Game)에게 다음 상태 전달(lift up)
  }

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.player ?? null;
  const status = winner
    ? `승자: ${winner}`
    : `다음 차례: ${xIsNext ? "X" : "O"}`;

  // 승리 줄 하이라이트 여부
  const isHighlighted = (i) => winnerInfo?.line?.includes(i);

  // 3행 3열 출력
  const renderSquare = (i) => (
    <Square
      key={i}
      value={squares[i]}
      onClick={() => handleClick(i)}
      highlight={isHighlighted(i)}
    />
  );

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">{[0, 1, 2].map(renderSquare)}</div>
      <div className="board-row">{[3, 4, 5].map(renderSquare)}</div>
      <div className="board-row">{[6, 7, 8].map(renderSquare)}</div>
    </>
  );
}

/** 최상위: 게임 전체. '히스토리'와 '현재 수'를 상태로 보유 → 시간여행 */
export default function Game() {
  // history: 각 수마다의 보드 배열을 기록. 첫 상태는 9칸 null
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;           // 짝수 수 = X 차례
  const currentSquares = history[currentMove];     // 현재 보드

  // 보드에서 한 수 두면 호출됨: 히스토리 자르기 + 새 상태 push
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // 시간여행: 특정 수로 점프
  function jumpTo(move) {
    setCurrentMove(move);
  }

  // 이동 리스트(시간여행 버튼들)
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
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

/** 승자 계산: 8가지 승리 라인 중 하나가 같으면 그 플레이어가 승자 */
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
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: [a, b, c] };
    }
  }
  return null;
}
