(function () {
  /**
   * 僅在 status 頁面執行
   */
  if (location.pathname.replace(/\/+$/, "") !== "/status") return;

  /**
   * 網頁運行時間
   */

  const addRuntime = () => {
    const $runtimeCount = document.getElementById("status-runtimeshow");
    if (!$runtimeCount) return;

    const publishDate = $runtimeCount.getAttribute("data-publishDate");
    if (!publishDate) return;

    $runtimeCount.textContent = `${btf.diffDate(publishDate)} ${GLOBAL_CONFIG.runtime}`;
  };

  /**
   * 最後一次更新時間
   */
  const addLastPushDate = () => {
    const $lastPushDateItem = document.getElementById("status-last-push-date");
    if (!$lastPushDateItem) return;

    const lastPushDate = $lastPushDateItem.getAttribute("data-lastPushDate");
    if (!lastPushDate) return;

    $lastPushDateItem.textContent = btf.diffDate(lastPushDate, true);
  };

  /**
   * status 頁專屬刷新函數
   */
  const refreshStatusFn = () => {
    addRuntime();
    addLastPushDate();
  };

  /**
   * PJAX 兼容（Butterfly 必須）
   */
  if (window.btf && typeof btf.addGlobalFn === "function") {
    btf.addGlobalFn("pjaxComplete", refreshStatusFn, "refreshStatusFn");
  }

  /**
   * 首次加載執行
   */
  const boot = () => {
    if (window.btf) {
      refreshStatusFn();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
