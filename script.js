const addPic = document.getElementById("add-pic");
const widthIn = document.getElementById("width");
const heightIn = document.getElementById("height");
const resizeBtn = document.getElementById("resize-btn");
const lock = document.getElementById("lock");
const preview = document.getElementById("preview");
const output = document.getElementById('output');
const download = document.getElementById('download');
const format = document.getElementById('format');
const unit = document.getElementById('unit');

let locked = true;
let aspectRatio = 1;
let link = "";
let h_og = 0;
let w_og = 0;
let h_percent = 0;
let w_percent = 0;

window.onload = () =>{
    widthIn.value = null;
    heightIn.value = null;
    lock.checked = false;
    addPic.value = null
    changeLimit()
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
        h_og = this.naturalHeight;
        w_og = this.naturalWidth;
        aspectRatio = w_og / h_og;
        widthIn.value = w_og;
        heightIn.value = h_og;
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
                if(unit.value == "pixel"){
                c.width = widthIn.value;
                c.height = heightIn.value;
                ctx.drawImage(this, 0, 0, widthIn.value, heightIn.value)
                }
                else if(unit.value == "percentage"){
                    c.width = (widthIn.value/100)*w_og;
                c.height = (heightIn.value/100)*h_og;
                ctx.drawImage(this, 0, 0, (widthIn.value/100)*w_og, (heightIn.value/100)*h_og)
                }
            }
        });
        reader.readAsDataURL(img);
    }
})

download.addEventListener('click', ()=>{
    link = c.toDataURL(`image/${format.value}`);
    let tempLink = document.createElement('a');
    tempLink.download = `image-resize.${format.value}`;
    tempLink.href = link;
    tempLink.click();
})

function changeLimit(){
    if (unit.value == "percentage") {
        widthIn.setAttribute('max', '100');
        heightIn.setAttribute('max', '100');
    }
    else if(unit.value == "pixel"){
        widthIn.setAttribute('max', '10000');
        heightIn.setAttribute('max', '10000');
    }
}