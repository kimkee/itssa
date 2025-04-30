
chrome.storage.sync.get(['theme','blockingData','blockingEnabled'], (result) => {
    console.log('팝업에서 저장된 데이터:', result.theme);
    blockingData = result.blockingData || [];

    console.log('차단 데이터:', blockingData);
    setDataList(blockingData);
    // setDataList([]);

    isBlockingEnabled = result.blockingEnabled || true;
    document.getElementById('togBlocking').checked = isBlockingEnabled;
    setBlockingEnabled(isBlockingEnabled);
});

setBlockingEnabled = (isBlockingEnabled) => {
    if(isBlockingEnabled){
        document.getElementById('blocklistScreen').classList.remove('!block');
        document.getElementById('blockingUserList').classList.remove('opacity-50');
    }else{
        document.getElementById('blocklistScreen').classList.add('!block');
        document.getElementById('blockingUserList').classList.add('opacity-50');
    }
}

const setDataList = (data) => {
    const DATALIST = `
        
            ${data.length > 0 ? `
                ${data.map(item => `
                <li class="flex items-start justify-start relative p-2 border border-gray-300 dark:border-gray-600 text-xs pr-10">
					<span class="w-28 font-medium break-all border-r border-gray-300 dark:border-gray-600 p-1 mr-2">${item.name}</span>
					<span class="memo w-full text-xs">
                        <input type="text" value="${item.memo}" class="w-full p-1" />
                    </span>
					<button type="button" class="bt-del w-6 h-6 absolute right-1 top-2" data-key="${item.key}">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
				</li>
            `).join('')}` : `
            <li class="text-center h-full flex justify-center flex-col gap-5 items-center py-20">
                <i class="fa-solid fa-magnifying-glass text-2xl"></i> <p class="text-sm">차단 하신 유저가 없습니다.</p>
            </li>
            `}
        
    `;
    document.getElementById('blockingUserList').innerHTML = DATALIST; // 새 데이터 추가
};


document.addEventListener('click', (event) => {
    const btDel = event.target.closest(".bt-del");
    if(btDel){
        const key = btDel.getAttribute("data-key");
        console.log(key);
        // 삭제할 데이터의 key 값을 사용하여 해당 데이터를 삭제
        blockingData = blockingData.filter(item => item.key !== key);
        setDataList(blockingData); // 새 데이터 추가
        chrome.storage.sync.set({ blockingData }, () => {
            console.log('차단 데이터가 저장되었습니다:', blockingData);
        });
    }
})

document.getElementById('togBlocking').addEventListener('change', () => {
    const isChecked = document.getElementById('togBlocking').checked;

    const dataToSave = {
        blockingEnabled: isChecked
    };

    // chrome.storage.sync에 데이터 저장
    chrome.storage.sync.set(dataToSave, () => {
        console.log('토글 블록리스트', dataToSave);
    });

    setBlockingEnabled(isChecked);
});



/* // 웹페이지에 DOM 이벤트 리스너 추가
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
}); */