// main.js

// ========== 좋아요 버튼 기능 ==========
// 문서 전체에서 click 이벤트를 감지 → 이벤트 위임(event delegation)
document.addEventListener("click", (e) => {
  // 클릭된 요소 또는 그 부모 중에서 [data-like] 속성이 붙은 버튼 찾기
  // (즉, 좋아요 버튼만 잡힘)
  const likeBtn = e.target.closest("[data-like]");
  if (likeBtn) {
    // 현재 상태 확인 (aria-pressed 값이 "true"인지 비교)
    const pressed = likeBtn.getAttribute("aria-pressed") === "true";

    // 상태 반전 → 눌림(true)/해제(false)로 바꿔줌
    likeBtn.setAttribute("aria-pressed", String(!pressed));

    // 버튼 안에 있는 좋아요 개수(span[data-like-count]) 찾기
    const countEl = likeBtn.querySelector("[data-like-count]");

    // 현재 숫자 가져와서 pressed 상태에 따라 +1 / -1
    // parseInt 실패 시 0으로 처리 (|| 0)
    const next = (parseInt(countEl.textContent, 10) || 0) + (pressed ? -1 : 1);

    // 좋아요 수는 최소 0 이상만 되도록 Math.max 처리
    countEl.textContent = String(Math.max(next, 0));
  }
});

// ========== 댓글 작성 기능 ==========
// 문서 전체에서 submit 이벤트 감지 → 이벤트 위임
document.addEventListener("submit", (e) => {
  // 이벤트 발생한 요소 중 .comment-form인 경우만 처리
  const form = e.target.closest(".comment-form");
  if (!form) return; // 댓글 폼이 아니면 무시

  e.preventDefault(); // 기본 동작(페이지 새로고침) 막기

  // form 안에 있는 name="comment" input 요소 찾기
  const input = form.elements["comment"];
  const text = input.value.trim(); // 입력값 앞뒤 공백 제거
  if (!text) return; // 빈 문자열이면 아무것도 하지 않음

  // form이 속한 부모(.card)에서 댓글 목록 ul.comments 찾기
  const ul = form.parentElement.querySelector(".comments");

  // 새로운 댓글(li) 요소 생성
  const li = document.createElement("li");
  li.textContent = text;

  // 댓글 목록 맨 위에 새 댓글 추가 (prepend → 앞에 붙임)
  ul.prepend(li);

  // 입력창 비우기
  input.value = "";
});
