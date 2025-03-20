function reddenPage() {
	document.body.style.backgroundColor = 'red';
  }
  
  chrome.action.onClicked.addListener((tab) => {
	if(!tab.url.includes("chrome://")) {
	  chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: reddenPage
	  });
	}
  });

  console.log("script.js");



  // 웹페이지에 DOM 이벤트 리스너 추가
document.addEventListener('click', (event) => {
    if (event.target && event.target.id === 'saveButton') { // 버튼 ID 확인
		
    }

	const dataToSave = {
		popkey: '잇싸쓰'
	};

	// chrome.storage.sync에 데이터 저장
	chrome.storage.sync.set(dataToSave, () => {
		console.log('팝업 에서 데이터가 저장되었습니다:', dataToSave);
	});
});



chrome.storage.sync.get(['popkey'], (result) => {
	console.log('팝업에서 저장된 데이터:', result.popkey);
	document.getElementById('popdata').textContent = result.popkey;
});