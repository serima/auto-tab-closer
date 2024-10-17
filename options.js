// ストレージから保存された設定を取得
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['closeTime'], (result) => {
      if (result.closeTime) {
        document.getElementById('closeTimeInput').value = result.closeTime;
      }
    });
  });
  
  // 設定を保存
  document.getElementById('saveButton').addEventListener('click', () => {
    const closeTime = document.getElementById('closeTimeInput').value;
    const closeTimeNumber = Number(closeTime);
  
    // バリデーション: 数値が1〜1440の範囲内かチェック
    if (Number.isInteger(closeTimeNumber) && closeTimeNumber >= 1 && closeTimeNumber <= 1440) {
      chrome.storage.sync.set({ closeTime: closeTimeNumber }, () => {
        const statusMessage = document.getElementById('statusMessage');
        statusMessage.textContent = '設定が保存されました!';
        setTimeout(() => {
          statusMessage.textContent = '';
        }, 2000);
      });
    } else {
      alert('1分から120分の範囲で有効な数値を入力してください。');
    }
  });
  