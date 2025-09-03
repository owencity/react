import React, { ChangeEvent, useMemo, useRef, useState } from "react";

export default function App() {
  const [items, setItems] = useState<string[]>(["사과", "바나나"]);
  const [q, setQ] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filtered = useMemo(
    () => items.filter(it => it.toLowerCase().includes(filter.toLowerCase())),
    [items, filter]
  );

  const add = () => {
    const v = q.trim();
    if (!v) return;
    setItems(prev => [...prev, v]); // 상태만 변경 → React가 DOM을 맞춰줌
    setQ("");
    inputRef.current?.focus();
  };

  const removeAt = (idx: number) => {
    setItems(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <main className="container">
      <h1>목록 (React)</h1>

      <div className="controls">
        <input
          ref={inputRef}
          value={q}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQ(e.target.value)}
          placeholder="아이템 입력"
        />
        <button onClick={add}>추가</button>

        <input
          value={filter}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
          placeholder="필터"
        />
      </div>

      <ul>
        {filtered.map((it, idx) => (
          <li key={`${it}-${idx}`} className="list-item">
            <span>{it}</span>
            <button onClick={() => removeAt(idx)}>삭제</button>
          </li>
        ))}
      </ul>

      <button onClick={() => setOpen(true)}>모달 열기</button>

      {open && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <h3>모달</h3>
            <p>상태로 열고 닫기 (DOM 직접 조작 없음)</p>
            <button onClick={() => setOpen(false)}>닫기</button>
          </div>
        </div>
      )}
    </main>
  );
}
