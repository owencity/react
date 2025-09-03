$(function() {
  let items = ["사과", "바나나"]; // 상태를 JS 변수로 보관
  let filter = "";

  const $list = $("#list");
  const $input = $("#item-input");
  const $filter = $("#filter-input");
  const $modal = $("#modal");

  function render() {
    const filtered = items.filter(it => it.toLowerCase().includes(filter.toLowerCase()));
    $list.empty();
    filtered.forEach((it, idx) => {
      const $li = $(`
        <li class="list-item">
          <span class="txt"></span>
          <button class="del">삭제</button>
        </li>`);
      $li.find(".txt").text(it);
      $li.find(".del").on("click", function() {
        // 실제 인덱스를 계산하려면 데이터-속성/키가 안정적이어야 함
        const removeIndex = items.indexOf(it);
        if (removeIndex > -1) {
          items.splice(removeIndex, 1); // 상태 변경
          render();                     // DOM 갱신(전체 리렌더 수동)
        }
      });
      $list.append($li);
    });
  }

  $("#add-btn").on("click", function() {
    const v = $input.val().trim();
    if (!v) return;
    items.push(v);      // 상태 변경
    $input.val("");     // DOM 조작
    render();           // DOM 갱신
    $input.trigger("focus");
  });

  $filter.on("input", function() {
    filter = $(this).val();
    render();
  });

  $("#open-modal").on("click", function() {
    $modal.removeClass("hidden").attr("aria-hidden", "false");
  });
  $("#close-modal").on("click", function() {
    $modal.addClass("hidden").attr("aria-hidden", "true");
  });

  render(); // 초기 렌더
});
