

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


// 웹페이지에 DOM 이벤트 리스너 추가
/* document.addEventListener('click', (event) => {
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
}); */



/* chrome.storage.sync.get(['popkey'], (result) => {
	console.log('팝업에서 저장된 데이터:', result.popkey);
	document.querySelector('.logo').textContent = result.popkey;
}); */


const itssaUI = {
	init: function() {
		console.log("initssaUI.init()");
		this.theme.init();
		this.blocking.init();
	},
	blocking: {
		init: function() {
			this.set();
			this.evt();
		},
		evt: function() {
			const _this = this;
			document.addEventListener('click', (event) => {
				const attrHref = event.target.closest('[href="#popup_menu_area"]')?.getAttribute('href');
				const attrClass = event.target.closest('[href="#popup_menu_area"]')?.getAttribute('class');
				const attrName = event.target.closest('[href="#popup_menu_area"]')?.innerText;
				if (attrHref === "#popup_menu_area") { // 버튼 ID 확인
					console.log('버튼 클릭됨:', attrHref);
					setTimeout(() => _this.addHTML(attrClass, attrName), 200);
				} 
				if (event.target.id === "setBlockUser") {
					_this.addUser(event.target.className , event.target.dataset.name);
				}
			})
		},
		addHTML: function(cls , name) {
			document.getElementById('popup_menu_area').querySelector('ul').insertAdjacentHTML('beforeend', `
				<li><a href="javascript:;" class="${cls}" data-key=${cls} data-name="${name}" id="setBlockUser">유저가리기</a></li>
			`);

			console.log('addHTML 호출됨');
		},
		addUser: function(cls, name) {
			console.log(cls , name);
			
			chrome.storage.sync.get(['blockingData'], (result) => {
				console.log('저장된 데이터:', result.blockingData);
				let blockingData = result.blockingData || [];
				
				const memo = prompt('차단 이유를 입력하세요', '차단된 유저입니다.');
				if (memo === null) {
					return; // 사용자가 취소를 클릭한 경우
				}
				const newBlockingData = {
					key: cls,
					name: name,
					memo: memo,
					timestamp: new Date().toISOString(),
				};

				// 기존 데이터에서 같은 key 값을 가진 요소를 제거
				blockingData = blockingData.filter(item => item.key !== newBlockingData.key);

				// 새로운 데이터를 배열의 맨 앞에 추가
				blockingData.unshift(newBlockingData);

				chrome.storage.sync.set( {blockingData} , () => {
					console.log('차단 데이터가 저장되었습니다:', blockingData);
				});
			});

		},
		set: function() {
			
			const blockUser = [
				'member_11567789', // 어그로
				'member_12345678', // 테스트
			];

			document.querySelectorAll('.list-body .item-info .writer a').forEach(els => {
				if (blockUser.some(blockedClass => els.classList.contains(blockedClass))) {
					els.closest('li.item').style.display = 'none'; // li.item 숨기기
				}
			});
		}
	},
	theme: {
		init: function(){
			this.set();
		},
		set: function() {
			const bodyCls  = document.body.classList;
			const themeStat = bodyCls.contains('color_scheme_dark') ? 'dark' : 'light';
			chrome.storage.sync.set({
				theme: themeStat
			}, () => {
				console.log('테마가 설정되었습니다:', themeStat);
			});
		}
	},
}

itssaUI.init();