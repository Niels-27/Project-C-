
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = document.getElementById('source').src;
    ctx.drawImage(img, 33, 71);

