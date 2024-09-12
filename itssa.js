document.querySelectorAll('.xe_content img, .rhymix_content img').forEach(img=>{
    img.addEventListener('click',e => img.classList.toggle('size'))
})
