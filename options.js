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
  
    // 入力値が有効か確認
    if (closeTime >= 1 && closeTime <= 120) {
      chrome.storage.sync.set({ closeTime }, () => {
        const statusMessage = document.getElementById('statusMessage');
        statusMessage.textContent = '設定が保存されました!';
        setTimeout(() => {
          statusMessage.textContent = '';
        }, 2000);
      });
    } else {
      alert('1分から120分の範囲で設定してください。');
    }
  });
  