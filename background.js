const CLOSE_TIME = 1000 * 60 * 5; // 5分 (ミリ秒)

chrome.tabs.onCreated.addListener((tab) => {
  console.log(`New tab opened: ${tab.id}`);
  
  // 新しいタブが開かれたときに、一定時間後にタブを閉じるタイマーを設定
  setTimeout(() => {
    chrome.tabs.remove(tab.id, () => {
      console.log(`Tab ${tab.id} closed after 5 minutes.`);
    });
  }, CLOSE_TIME);
});
