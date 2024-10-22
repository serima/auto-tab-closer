// タブを閉じる時間（分単位で設定される）
chrome.tabs.onCreated.addListener((tab) => {
  // ストレージからユーザーの設定を取得
  chrome.storage.sync.get(['closeTime'], (result) => {
    const closeTimeInMinutes = result.closeTime || 1; // デフォルトは1分
    const closeTimeMs = closeTimeInMinutes * 60 * 1000; // ミリ秒に変換

    const startTime = Date.now();

    // タブのIDごとに開始時刻を保存
    chrome.storage.local.set({ [tab.id]: startTime }, () => {
      console.log(`Tab ${tab.id} started at ${new Date(startTime).toLocaleTimeString()}`);
    });

    // タイマーをスケジュール
    scheduleTabClose(tab.id, closeTimeMs);
  });
});

function scheduleTabClose(tabId, closeTimeMs) {
  const interval = setInterval(() => {
    chrome.storage.local.get([`${tabId}`], (result) => {
      if (result[tabId]) {
        const elapsedTime = Date.now() - result[tabId]; // 経過時間を計算

        if (elapsedTime >= closeTimeMs) {
          // 現在のタブ数を取得して1つしかない場合は閉じない
          chrome.tabs.query({}, (tabs) => {
            if (tabs.length > 1) { // タブが1つより多い場合のみ閉じる
              chrome.tabs.remove(tabId, () => {
                console.log(`Tab ${tabId} closed after ${closeTimeMs / 1000} seconds.`);
                clearInterval(interval); // タイマーを停止
                chrome.storage.local.remove([`${tabId}`]); // 記録を削除
              });
            } else {
              console.log(`Tab ${tabId} not closed because it is the last tab.`);
              clearInterval(interval); // タイマーを停止
            }
          });
        }
      } else {
        // タブ情報が存在しない場合はタイマーを停止
        clearInterval(interval);
      }
    });
  }, 60 * 1000); // 1分ごとにチェック
}

// タブが閉じられたときにストレージから情報を削除
chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.local.remove([`${tabId}`], () => {
    console.log(`Tab ${tabId} removed from storage.`);
  });
});
