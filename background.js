const CLOSE_TIME_MS = 5 * 60 * 1000; // 5分 (ミリ秒)

// タブが開かれたときに開始時刻を保存
chrome.tabs.onCreated.addListener((tab) => {
  const startTime = Date.now(); // 現在のタイムスタンプを取得

  // タブのIDごとに開始時刻を保存
  chrome.storage.local.set({ [tab.id]: startTime }, () => {
    console.log(`Tab ${tab.id} started at ${new Date(startTime).toLocaleTimeString()}`);
  });

  // タイマーをスケジュール
  scheduleTabClose(tab.id);
});

// 1分ごとにタブの残り時間をチェック
function scheduleTabClose(tabId) {
  const interval = setInterval(() => {
    chrome.storage.local.get([`${tabId}`], (result) => {
      if (result[tabId]) {
        const elapsedTime = Date.now() - result[tabId]; // 経過時間を計算

        if (elapsedTime >= CLOSE_TIME_MS) {
          // タイムアウト: タブを閉じる
          chrome.tabs.remove(tabId, () => {
            console.log(`Tab ${tabId} closed after ${CLOSE_TIME_MS / 1000} seconds.`);
            clearInterval(interval); // タイマーを停止
            chrome.storage.local.remove([`${tabId}`]); // 記録を削除
          });
        }
      } else {
        // タブ情報が存在しない場合はタイマーを停止
        clearInterval(interval);
      }
    });
  }, 60 * 1000); // 1分 (60,000ミリ秒) ごとのチェック
}

// タブが閉じられたときにストレージから情報を削除
chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.local.remove([`${tabId}`], () => {
    console.log(`Tab ${tabId} removed from storage.`);
  });
});
