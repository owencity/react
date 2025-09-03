// =========================
// 1. 변수 & 데이터 타입
// =========================
let name = "홍길동";   // 변경 가능
const age = 30;        // 상수
var old = "구버전";    // 사용 지양

// 문자열, 숫자, 불리언, 배열, 객체
let str = "Hello";
let num = 100;
let bool = true;
let arr = ["사과", "바나나"];
let obj = { key: "value" };

// =========================
// 2. 함수
// =========================
function add(a, b) { return a + b; }
const multiply = (a, b) => a * b;

// =========================
// 3. 조건문 / 반복문
// =========================
if (age >= 20) {
  console.log("성인");
} else {
  console.log("미성년자");
}

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// =========================
// 4. DOM 조작
// =========================
const header = document.querySelector("h1"); // 선택
header.innerText = "자바스크립트 정리";      // 텍스트 변경
header.style.color = "blue";                 // 스타일 변경
header.classList.add("highlight");           // 클래스 추가

// =========================
// 5. 이벤트
// =========================
const button = document.querySelector("button");
button.addEventListener("click", (e) => {
  e.preventDefault(); // 폼 제출 막기
  alert("버튼 클릭됨!");
});

// =========================
// 6. 입력 값 처리
// =========================
const input = document.querySelector("input[type='text']");
button.addEventListener("click", () => {
  console.log("입력값:", input.value);
});

// =========================
// 7. 타이머 / 애니메이션
// =========================
setTimeout(() => console.log("3초 뒤 실행"), 3000);
setInterval(() => console.log("1초마다 실행"), 1000);

// =========================
// 8. HTML 생성/삭제
// =========================
const newDiv = document.createElement("div");
newDiv.innerText = "동적으로 추가된 요소";
document.body.appendChild(newDiv);

setTimeout(() => newDiv.remove(), 5000); // 5초 후 삭제

/* =============================================================================
  DOM 조작 치트시트 (Vanilla JS)
  - 이 파일은 실행 목적보다 "참고/연습"용입니다.
  - 카테고리:
    1) 선택/탐색
    2) 생성/삽입/복제/삭제
    3) 속성/데이터/클래스/스타일
    4) 텍스트/HTML
    5) 이벤트
    6) 폼/입력
    7) 치수/좌표/스크롤
    8) 스크롤/뷰포트 제어
    9) 관찰자(IntersectionObserver/MutationObserver)
    10) 애니메이션 루프(requestAnimationFrame)
============================================================================== */


/* =============================================================================
  [1] DOM 요소 선택 / 탐색
  - 핵심: querySelector 계열은 "CSS 선택자 문법"을 사용
  - getElementBy* 계열은 "옛날부터 있던 고전 API"
============================================================================== */

/* ---------------------------------------------------------------------------
  1) querySelector / querySelectorAll
  - 최신 표준, 가장 많이 씀
  - 인자로 "CSS 선택자" 그대로 사용 (#, ., 태그명 등)
--------------------------------------------------------------------------- */

// 단일 선택 : 첫 번째로 매칭되는 요소 반환
const el = document.querySelector('.item');    // <div class="item">...</div>

// 다중 선택 : 모든 매칭 요소(NodeList 유사배열) 반환
const list = document.querySelectorAll('.item');
list.forEach(li => console.log(li.textContent));

// 특징 : CSS 선택자 문법을 그대로 사용
// 예) "#id명", ".클래스명", "태그명", "ul > li.active", "input[name=q]"

/* ---------------------------------------------------------------------------
  2) getElementById
  - 특정 id 값을 가진 요소 "하나"를 반환
  - 인자에는 '#' 안 붙임
--------------------------------------------------------------------------- */
const byId = document.getElementById('target');
// <div id="target">...</div>

/* ---------------------------------------------------------------------------
  3) getElementsByClassName
  - 특정 class 값을 가진 모든 요소 반환 (HTMLCollection)
  - 실시간 컬렉션(live collection): DOM 변하면 즉시 반영
--------------------------------------------------------------------------- */
const byClass = document.getElementsByClassName('cls');
// <div class="cls">...</div> 여러 개 가능

/* ---------------------------------------------------------------------------
  4) getElementsByTagName
  - 특정 태그명을 가진 모든 요소 반환 (HTMLCollection)
--------------------------------------------------------------------------- */
const byTag = document.getElementsByTagName('li');
// <li>...</li> 전부 반환

/* ---------------------------------------------------------------------------
  📌 요약
  - querySelector(".cls") : CSS 선택자, 단일 첫 요소
  - querySelectorAll(".cls") : CSS 선택자, 모든 요소(NodeList)
  - getElementById("id명") : id 전용, 하나만
  - getElementsByClassName("cls") : class 전용, 여러 개
  - getElementsByTagName("li") : 태그 전용, 여러 개

  → 요즘은 "querySelector / querySelectorAll"을 가장 많이 씀
  → getElementById는 id 찾을 때 간단히 쓸 수 있음
  → ClassName/TagName은 오래된 방식이지만 지금도 동작
--------------------------------------------------------------------------- */



// 탐색(계층)
if (el) {
  const parent = el.parentElement;                       // 부모(요소)
  const firstChild = el.firstElementChild;               // 첫 자식(요소)
  const lastChild = el.lastElementChild;                 // 마지막 자식(요소)
  const prev = el.previousElementSibling;                // 이전 형제(요소)
  const next = el.nextElementSibling;                    // 다음 형제(요소)
  const allChildren = el.children;                       // HTMLCollection
  const contains = el.contains(firstChild);              // 포함 여부
}


/* 2) 생성 / 삽입 / 복제 / 삭제 --------------------------------------------------- */
// 생성
const box = document.createElement('div');
box.className = 'box';
box.textContent = '새 박스';

// 삽입(부모 기준)
document.body.appendChild(box);        // 맨 끝에 추가
document.body.insertBefore(box, document.body.firstChild); // 특정 위치 삽입

// 근래 권장(상대 위치 기준)
const host = document.querySelector('#host');
if (host) {
  host.before('호스트 앞 텍스트');     // 형제 앞
  host.after(box);                     // 형제 뒤
  host.prepend('안쪽 맨 앞');          // 자식 맨 앞
  host.append('안쪽 맨 뒤');           // 자식 맨 뒤
}

// 템플릿 기반 생성(성능/안전)
const tpl = document.createElement('template');
tpl.innerHTML = /* html */`
  <article class="card"><h3>템플릿</h3><p>내용</p></article>
`.trim();
const nodeFromTpl = tpl.content.firstElementChild;
document.body.append(nodeFromTpl);

// 복제/삭제
const clone = nodeFromTpl.cloneNode(true); // true = 깊은 복제
document.body.append(clone);
clone.remove();                            // 자신 삭제

// fragment로 대량 삽입(리플로우 최소화)
const frag = document.createDocumentFragment();
for (let i = 0; i < 3; i++) {
  const li = document.createElement('li');
  li.textContent = `아이템 ${i + 1}`;
  frag.appendChild(li);
}
const ul = document.createElement('ul');
ul.appendChild(frag);
document.body.appendChild(ul);


/* 3) 속성 / 데이터셋 / 클래스 / 스타일 ------------------------------------------ */
const target = document.querySelector('#target');

if (target) {
  // 속성(Attribute)
  target.setAttribute('aria-label', '설명');
  const has = target.hasAttribute('aria-label');
  const val = target.getAttribute('aria-label');
  target.removeAttribute('aria-label');

  // data-* (dataset)
  target.dataset.userId = '42';         // <div data-user-id="42">
  const uid = target.dataset.userId;

  // 클래스(ClassList)
  target.classList.add('active');
  target.classList.remove('active');
  target.classList.toggle('active');    // 토글
  const hasCls = target.classList.contains('active');

  // 스타일(인라인)
  target.style.backgroundColor = '#f5f5f5';
  target.style.setProperty('--custom-gap', '8px'); // CSS 변수 설정

  // 계산된 스타일 읽기(읽기 전용)
  const computed = getComputedStyle(target);
  const display = computed.display;
}


/* 4) 텍스트 / HTML --------------------------------------------------------------- */
const t = document.querySelector('.text');
if (t) {
  t.textContent = '안전한 텍스트 삽입(HTML 해석 X)';
  t.innerHTML = '<strong>HTML</strong> 삽입(주의: XSS 위험)';

  // 부분만 교체하고 싶다면 range 사용(고급)
  const range = document.createRange();
  range.selectNodeContents(t);
  // range.surroundContents(wrapperEl) 등 활용 가능
}


/* 5) 이벤트 ---------------------------------------------------------------------- */
// 등록/해제
function onClick(e) {
  // e.target: 실제 클릭된 요소, e.currentTarget: 리스너가 달린 요소
  console.log('clicked', e.target);
}
document.addEventListener('click', onClick);
document.removeEventListener('click', onClick);

// 위임(버블링 활용): 많은 자식에 각각 달지 않고, 상위에 한 번만
const table = document.querySelector('.table');
if (table) {
  table.addEventListener('click', (e) => {
    const row = e.target.closest('tr');
    if (!row || !table.contains(row)) return;
    row.classList.toggle('selected');
  });
}

// 기본 동작 막기 / 전파 차단
const link = document.querySelector('a.block');
if (link) {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // 기본 이동 막기
    e.stopPropagation(); // 버블링 중단
  });
}


/* 6) 폼 / 입력 ------------------------------------------------------------------- */
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);         // 파일 포함 가능
    const obj = Object.fromEntries(fd);    // 간단 변환
    console.log('submit data', obj);

    // 유효성
    const email = form.querySelector('input[type="email"]');
    if (email && !email.checkValidity()) {
      email.reportValidity();              // 브라우저 기본 에러 표시
    }
  });

  // 입력 이벤트
  const input = form.querySelector('input[name="q"]');
  if (input) {
    input.addEventListener('input', (e) => {
      // e.target.value 로 현재 값 접근
    });
  }
}


/* 7) 치수 / 좌표 / 경계박스 ------------------------------------------------------ */
const box2 = document.querySelector('.box2');
if (box2) {
  // 레이아웃 관련 읽기(읽는 즉시 layout flush 발생 가능 → 성능 주의)
  const rect = box2.getBoundingClientRect(); // viewport 기준 위치/크기
  const { width, height, top, left } = rect;

  // 스크롤 위치(문서/요소)
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  // 요소 offset/scroll
  const sx = box2.scrollLeft;
  const sy = box2.scrollTop;
  const sw = box2.scrollWidth;  // 콘텐츠 총 폭
  const sh = box2.scrollHeight; // 콘텐츠 총 높이
}


/* 8) 스크롤 / 뷰포트 제어 -------------------------------------------------------- */
// 부드러운 스크롤로 특정 요소로 이동
const to = document.querySelector('#to');
if (to) {
  to.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// window 스크롤
window.scrollTo({ top: 0, behavior: 'smooth' });


/* 9) 관찰자: IntersectionObserver / MutationObserver ---------------------------- */
// 9-1) IntersectionObserver: 뷰포트 진입/이탈 감지(무한스크롤, 지연로딩)
const targetImg = document.querySelector('img.lazy');
if (targetImg && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const real = entry.target.getAttribute('data-src');
        if (real) entry.target.src = real;
        obs.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px 200px 0px', threshold: 0 });
  io.observe(targetImg);
}

// 9-2) MutationObserver: DOM 변화 감지(추가/삭제/속성 변경 등)
const moTarget = document.querySelector('#watch');
if (moTarget && 'MutationObserver' in window) {
  const mo = new MutationObserver((mutations) => {
    mutations.forEach(m => {
      // m.type: 'childList' | 'attributes' | 'characterData'
      // m.addedNodes / m.removedNodes / m.attributeName 등
    });
  });
  mo.observe(moTarget, { childList: true, attributes: true, subtree: true });
  // mo.disconnect();
}


/* 10) 애니메이션 루프: requestAnimationFrame ------------------------------------ */
// 성능이 필요한 반복 갱신(스크롤 위치에 따른 효과 등)
let rafId = null;
function loop(ts) {
  // ts: 고해상도 타임스탬프(ms)
  // 1프레임 작업…
  rafId = requestAnimationFrame(loop);
}
rafId = requestAnimationFrame(loop);
// 취소: cancelAnimationFrame(rafId);


/* 보너스) 안전 삽입: XSS 방지 ----------------------------------------------------*

