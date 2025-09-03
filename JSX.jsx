import { useEffect, useRef, useState } from "react";

/**
 * 핵심 아이디어
 * - DOM을 직접 조작(document.querySelector 등)하지 않고,
 *   state → 렌더링 결과가 바뀌도록 설계.
 * - 클래스 토글, 표시/숨김, 리스트 추가/삭제, 폼 값, 모달 열림 상태 등
 *   모두 state로 표현하고 JSX에서 조건부/반복 렌더링으로 해결.
 * - 꼭 필요한 경우에만 ref로 DOM을 건드림(예: 포커스, 스크롤 위치).
 */
export default function App() {
  // 상태들
  const [active, setActive] = useState(false);           // 클래스/스타일 토글
  const [open, setOpen] = useState(false);               // 모달 열림
  const [count, setCount] = useState(0);                 // 카운터
  const [q, setQ] = useState("");                        // 입력값
  const [items, setItems] = useState(["사과", "바나나"]); // 리스트
  const [filter, setFilter] = useState("");              // 필터

  // 꼭 DOM API가 필요한 경우: ref 사용
  const inputRef = useRef(null);

  // 마운트 이후 1회 포커스 예시(직접 DOM 접근이 정당한 경우)
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 파생 데이터: 필터링 리스트
  const filtered = items.filter((it) =>
    it.toLowerCase().includes(filter.toLowerCase())
  );

  // 클래스 토글을 state로 → JSX에서 className 계산
  const boxClass = `box ${active ? "is-active" : ""}`;

  return (
    <div className="app">
      {/* 1) 클래스/스타일 토글: 상태로 제어 */}
      <section>
        <h2>클래스 토글 (state로)</h2>
        <button onClick={() => setActive((v) => !v)}>
          {active ? "비활성화" : "활성화"}
        </button>
        <div className={boxClass} aria-pressed={active}>
          상태: {active ? "ON" : "OFF"}
        </div>
      </section>

      {/* 2) 카운터: DOM 텍스트 변경 X → 상태만 변경 */}
      <section>
        <h2>카운터</h2>
        <div className="hstack" style={{ gap: 8 }}>
          <button onClick={() => setCount((c) => c - 1)}>-</button>
          <strong>{count}</strong>
          <button onClick={() => setCount((c) => c + 1)}>+</button>
        </div>
      </section>

      {/* 3) 리스트 추가/삭제: createElement/appendChild 없이 state 배열 변경 */}
      <section>
        <h2>리스트 추가/삭제</h2>
        <div className="hstack" style={{ gap: 8 }}>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="아이템 입력"
          />
          <button
            onClick={() => {
              const v = q.trim();
              if (!v) return;
              setItems((prev) => [...prev, v]); // 불변 업데이트
              setQ("");
              inputRef.current?.focus();        // 필요한 DOM 접근만 ref로
            }}
          >
            추가
          </button>
        </div>

        <div className="hstack" style={{ gap: 8, marginTop: 8 }}>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="필터"
          />
          <span>({filtered.length}개)</span>
        </div>

        <ul>
          {filtered.map((it, idx) => (
            <li key={idx} className="hstack" style={{ gap: 8 }}>
              <span>{it}</span>
              <button
                onClick={() =>
                  setItems((prev) => prev.filter((_, i) => i !== idx))
                }
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* 4) 모달: display/opacity 조작 X → open 상태로 조건부 렌더 */}
      <section>
        <h2>모달</h2>
        <button onClick={() => setOpen(true)}>모달 열기</button>
        {open && (
          <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="modal" tabIndex={-1}>
              <h3>React 모달</h3>
              <p>DOM 직접 조작 없이 상태로 열고 닫습니다.</p>
              <div className="hstack" style={{ gap: 8 }}>
                <button onClick={() => setOpen(false)}>닫기</button>
                <button
                  onClick={() => {
                    // 예: 모달 내부 특정 인풋 포커스
                    inputRef.current?.focus();
                  }}
                >
                  인풋 포커스
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 5) 조건부 렌더링 & 클래스 바인딩 예시 */}
      <section>
        <h2>조건부 렌더링</h2>
        <p className={count % 2 === 0 ? "even" : "odd"}>
          카운트는 {count % 2 === 0 ? "짝수" : "홀수"}입니다.
        </p>
        {count > 5 && <em>5보다 큽니다!</em>}
      </section>
    </div>
  );
}

/* 참고 CSS(예시)
.box { padding: 8px 12px; border: 1px solid #e5e7eb; border-radius: 8px; }
.box.is-active { background: #111; color: #fff; }
.modal-overlay { position: fixed; inset: 0; display: grid; place-items: center; background: rgba(0,0,0,.45); }
.modal { background: #fff; border-radius: 12px; padding: 16px; min-width: 280px; }
.even { color: #2563eb; }
.odd  { color: #b91c1c; }
*/
