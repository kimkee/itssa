




function reddenPage() {
    document.body.style.backgroundColor = 'red';
}

// 브라우저 액션(톱니바퀴 모양) 클릭 이벤트 리스너 추가
chrome.action.onClicked.addListener((tab) => {
    // 클릭 이벤트가 발생한 탭의 URL이 chrome://로 시작하지 않으면
    if (!tab.url.includes("chrome://")) {
        // chrome.scripting API를 사용하여 스크립트를 탭에 주입
        chrome.scripting.executeScript({
            // 스크립트를 주입할 탭의 ID
            target: { tabId: tab.id },
            // 주입할 스크립트 (reddenPage 함수)
            function: reddenPage
        });
    }
});

console.log("script.js");



// 웹페이지에 DOM 이벤트 리스너 추가
document.addEventListener('click', (event) => {
    if (event.target && event.target.id === 'saveButton') { // 버튼 ID 확인

        const dataToSave = {
            popkey: '잇싸쓰2'
        };
    
        // chrome.storage.sync에 데이터 저장
        chrome.storage.sync.set(dataToSave, () => {
            console.log('팝업 에서 데이터가 저장되었습니다:', dataToSave);
            alert('팝업 에서 데이터가 저장되었습니다');
        });
    }

});



chrome.storage.sync.get(['popkey'], (result) => {
    console.log('팝업에서 저장된 데이터:', result.popkey);
    document.getElementById('popdata').textContent = result.popkey;
});