//files provided by Ecwid. I will use them to fill the gallery initially.
var initialGalleryImages = [{
  url: "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550746.jpg",
  width: 640,
  height: 426
}, {
  url: "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964007.jpg",
  width: 1920,
  height: 1200
}, {
  url: "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550739.jpg",
  width: 640,
  height: 426
}, {
  url: "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964009.jpg",
  width: 436,
  height: 650
}, {
  url: "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550740.jpg",
  width: 600,
  height: 400
}, {
  url: "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964008.jpg",
  width: 509,
  height: 339
}, {
  url: "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964011.jpg",
  width: 900,
  height: 450
}, {
  url: "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550755.jpg",
  width: 480,
  height: 640
}, {
  url: "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964013.jpg",
  width: 472,
  height: 640
}, {
  url: "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550745.jpg",
  width: 640,
  height: 425
}, {
  url: "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964014.jpg",
  width: 240,
  height: 320
}, {
  url: "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964016.jpg",
  width: 540,
  height: 337
}, {
  url: "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964020.jpg",
  width: 1600,
  height: 1000
}, {
  url: "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964010.jpg",
  width: 1506,
  height: 575
}, {
  url: "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550754.jpg",
  width: 1280,
  height: 1276
}, {
  url: "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964021.jpg",
  width: 1280,
  height: 800
}, {
  url: "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964012.jpg",
  width: 787,
  height: 787
}];
//gallery pallette
var galleryTiles = document.querySelector('.gallery-tiles');
//'add' buttons animate
var addButtons = document.querySelectorAll('input[type=button]');
addButtons.forEach(function (i) {
    i.addEventListener('click', function (e) {
        e.target.classList.add('clicked');
        setTimeout(function () {
            e.target.classList.remove('clicked');
        }, 150);
    });
});
//create gallery item function
var addGalleryItem = function addGalleryItem(path) {
    var newContent = document.createElement('li');
    newContent.innerHTML = '<span class="delete-image">&times;</span>';
    var newImage = new Image();
    newImage.src = path;
    newContent.appendChild(newImage);
    newContent.classList.add('gallery-tiles__tile');
    galleryTiles.prepend(newContent);
};
//deleting items from gallery function
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-image')) {
        e.target.parentNode.remove();
    }
});
//fill the gallery with nice images from Ecwid
initialGalleryImages.forEach(function (e) {
    addGalleryItem(e.url);
});
//loading from json file
var loadFile = function loadFile() {
    var input, file, fr, dropbox;
    input = document.getElementById('fileinput');
    if (!input.files[0]) {
        dropbox = document.getElementById('dropbox');
        dropbox.classList.add('shake');
        setTimeout(function () {
            dropbox.classList.remove('shake');
        }, 6000);
    } else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);
    }
    function receivedText(e) {
        var lines = e.target.result;
        var newArr = JSON.parse(lines);
        newArr.galleryImages.forEach(function (e) {
            addGalleryItem(e.url);
        });
    }
};
//loading from url
var loadUrl = function loadUrl() {
    var input, url, btn, label;
    input = document.getElementById('urlinput');
    url = input.value;
    btn = document.getElementById('url-load-btn');
    btn.classList.add('clicked');
    if (url == '') {
        label = document.getElementById('userLabel');
        label.classList.add('shake');
        setTimeout(function () {
            label.classList.remove('shake');
        }, 6000);
    } else {
        addGalleryItem(url);
    }
};
//loading from d'n'd
var dropBox = document.getElementById('dropbox');
dropBox.addEventListener('dragover', function (e) {
    e.preventDefault();
});
dropBox.addEventListener('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    var files = e.dataTransfer.files;
    for (var i = 0, file; file = files[i]; i++) {
        if (file.type.match(/image.*/)) {
            var reader = new FileReader();
            reader.onload = function (e2) {
                addGalleryItem(e2.target.result);
            };
            reader.readAsDataURL(file);
        }
    }
});