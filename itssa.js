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
