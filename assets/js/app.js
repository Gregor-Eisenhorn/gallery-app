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
var galleryTiles = document.querySelector('ul');
//create gallery item function
var addGalleryItem = function addGalleryItem(path) {
    var newContent = document.createElement('li');
    newContent.innerHTML = '<img src=' + path + '><span>&times;</span>';
    galleryTiles.appendChild(newContent);
};
//deleting items from gallery function
document.addEventListener('click', function (e) {
    if (e.target.tagName == 'SPAN') {
        e.target.parentNode.remove();
    }
});
//fill the gallery with nice images from Ecwid
initialGalleryImages.forEach(function (e) {
    addGalleryItem(e.url);
});
//loading from json file
var loadFile = function loadFile() {
    var input, file, fr;
    input = document.getElementById('fileinput');
    if (!input.files[0]) {
        alert('Please select a file before clicking \'Load\'');
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
    var input, url;
    input = document.getElementById('urlinput');
    url = input.value;
    if (url == '') {
        alert('Please provide URL of your image first');
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(url)) {
        alert('That\'s not a URL, probably...');
        return;
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