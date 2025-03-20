document.querySelectorAll('.xe_content img, .rhymix_content img').forEach(img=>{
    img.addEventListener('click',e => img.classList.toggle('size'))
})

document.querySelectorAll('.list-body .item-info .writer a').forEach(els => {
	const blockUser = [
		'member_11567789', // 어그로
		'member_12345678', // 테스트
	];

	// blockUser 배열에 해당 클래스가 포함되어 있는지 확인
	if (blockUser.some(blockedClass => els.classList.contains(blockedClass))) {
		els.closest('li.item').style.display = 'none'; // li.item 숨기기
	}
});



const link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = chrome.runtime.getURL('css/itssa.css');
(document.head || document.documentElement).appendChild(link);

// 웹페이지와의 데이터 교환을 위해 메시지 리스너 추가
window.addEventListener('message', (event) => {
    if (event.data.type === 'GET_STORAGE') {
        chrome.storage.sync.get(['key'], (result) => {
            window.postMessage({ type: 'STORAGE_DATA', data: result.key }, '*');
        });
    }
});


// 웹페이지에 DOM 이벤트 리스너 추가
document.addEventListener('click', (event) => {
    if (event.target && event.target.id === 'saveButton') { // 버튼 ID 확인

    }

	const dataToSave = {
		key: 'exampleValue',
		timestamp: new Date().toISOString()
	};

	// chrome.storage.sync에 데이터 저장
	chrome.storage.sync.set(dataToSave, () => {
		console.log('데이터가 저장되었습니다:', dataToSave);
	});
});



chrome.storage.sync.get(['popkey'], (result) => {
	console.log('팝업에서 저장된 데이터:', result.popkey);
	document.querySelector('.logo').textContent = result.popkey;
});