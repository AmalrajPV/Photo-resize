const addPic = document.getElementById("add-pic");
const widthIn = document.getElementById("width");
const heightIn = document.getElementById("height");
const resizeBtn = document.getElementById("resize-btn");
const lock = document.getElementById("lock");
const preview = document.getElementById("preview");
const output = document.getElementById('output');
const download = document.getElementById('download');

let locked = true;
let aspectRatio = 1;
let link = "";

window.onload = () =>{
    widthIn.value = null;
    heightIn.value = null;
    lock.checked = false;
    addPic.value = null
}


addPic.addEventListener('change', ()=>{
    const img_data = addPic.files[0];
    if(img_data){
        document.getElementById('add-logo').style.display ="none";
        preview.style.display = "flex";
    }
    else{
        document.getElementById('add-logo').style.display ="block";
        preview.style.display = "none";
    }
    const url = URL.createObjectURL(img_data);
    preview.innerHTML = `<img src="${url}" id="preview-image">`;
    document.getElementById('preview-image').onload = function(){
        let h = this.naturalHeight;
        let w = this.naturalWidth;
        aspectRatio = w / h;
        widthIn.value = w;
        heightIn.value = h;
    }
});

lock.addEventListener('change', ()=>{
    if(lock.checked){
       locked = false
    }
    else{
        locked = true
    }
})

widthIn.addEventListener('input', ()=>{
    if (locked) {
        heightIn.value = Math.floor(widthIn.value / aspectRatio);
    }
})
heightIn.addEventListener('input', ()=>{
    if (locked) {
        widthIn.value = Math.floor(heightIn.value * aspectRatio);
    }
})


resizeBtn.addEventListener('click', function(){
    let img = addPic.files[0]
    if(img){
        output.style.display = "grid";
        c = document.getElementById('canvas')
        ctx = c.getContext('2d');
        const reader = new FileReader();
        reader.addEventListener('load', function(e){
            const newPic = new Image();
            newPic.src = e.target.result;
            newPic.onload = function(){
                c.width = widthIn.value;
                c.height = heightIn.value;
                ctx.drawImage(this, 0, 0, widthIn.value, heightIn.value)
                link = c.toDataURL('image/jpeg');
            }
        });
        reader.readAsDataURL(img);
    }
})

download.addEventListener('click', ()=>{
    let tempLink = document.createElement('a');
    tempLink.download = "image-resize.jpeg";
    tempLink.href = link;
    tempLink.click();
})


