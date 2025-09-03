import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";

/**
 * App.tsx — React + TypeScript 버전
 * - DOM 직접 조작(document.querySelector 등) 대신 상태(state)로 UI 제어
 * - 꼭 필요한 경우(포커스 등)에만 ref로 DOM 접근
 */

export default function App() {
  // 상태 타입 (명시 or 추론)
  const [active, setActive] = useState<boolean>(false); // 클래스/스타일 토글
  const [open, setOpen] = useState<boolean>(false);     // 모달 open/close
  const [count, setCount] = useState<number>(0);        // 카운터
  const [q, setQ] = useState<string>("");               // 입력값
  const [items, setItems] = useState<string[]>(["사과", "바나나"]); // 리스트
  const [filter, setFilter] = useState<string>("");     // 필터

  // DOM 접근이 필요한 경우만 ref 사용(예: 포커스)
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 마운트 후 1회: 인풋 포커스
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 파생 데이터: 필터링 결과
  const filtered: string[] = items.filter((it) =>
    it.toLowerCase().includes(filter.toLowerCase())
  );

  // 클래스 바인딩은 상태 기반으로 계산
  const boxClass = `box ${active ? "is-active" : ""}`;

  // 이벤트 핸들러 타입들
  const handleToggleActive = () => setActive((v) => !v);

  const handleInc = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCount((c) => c + 1);
  };
  const handleDec = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCount((c) => c - 1);
  };

  const handleChangeQ = (e: ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value);
  };
  const handleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleAdd = () => {
    const v = q.trim();
    if (!v) return;
    setItems((prev) => [...prev, v]); // 불변 업데이트
    setQ("");
    inputRef.current?.focus();        // 필요한 최소 DOM 접근
  };

  const handleRemove = (idx: number) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="app">
      {/* 1) 클래스/스타일 토글: 상태로 제어 */}
      <section>
        <h2>클래스 토글 (state로)</h2>
        <button onClick={handleToggleActive}>
          {active ? "비활성화" : "활성화"}
        </button>
        <div className={boxClass} aria-pressed={active}>
          상태: {active ? "ON" : "OFF"}
        </div>
      </section>

      {/* 2) 카운터: DOM 텍스트 조작 없이 상태만 변경 */}
      <section>
        <h2>카운터</h2>
        <div className="hstack" style={{ gap: 8 }}>
          <button onClick={handleDec}>-</button>
          <strong>{count}</strong>
          <button onClick={handleInc}>+</button>
        </div>
      </section>

      {/* 3) 리스트 추가/삭제: createElement/appendChild 없이 state로 */}
      <section>
        <h2>리스트 추가/삭제</h2>
        <div className="hstack" style={{ gap: 8 }}>
          <input
            ref={inputRef}
            value={q}
            onChange={handleChangeQ}
            placeholder="아이템 입력"
          />
          <button onClick={handleAdd}>추가</button>
        </div>

        <div className="hstack" style={{ gap: 8, marginTop: 8 }}>
          <input
            value={filter}
            onChange={handleChangeFilter}
            placeholder="필터"
          />
          <span>({filtered.length}개)</span>
        </div>

        <ul>
          {filtered.map((it, idx) => (
            <li key={`${it}-${idx}`} className="hstack" style={{ gap: 8 }}>
              <span>{it}</span>
              <button onClick={() => handleRemove(idx)}>삭제</button>
            </li>
          ))}
        </ul>
      </section>

      {/* 4) 모달: open 상태로 조건부 렌더링 */}
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
                <button onClick={() => inputRef.current?.focus()}>
                  인풋 포커스
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 5) 조건부 렌더링 & 클래스 바인딩 */}
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
