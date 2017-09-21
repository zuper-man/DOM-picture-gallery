function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}
function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById('imageGallery')) return false;
    var placeholder = document.createElement("img");
    placeholder.setAttribute('id', 'placeholder');
    placeholder.setAttribute('src', '#');
    var description = document.createElement('p');
    description.setAttribute('id', 'description');
    var desctext = document.createTextNode('点选一张图片以显示');
    description.appendChild(desctext);
    document.getElementsByTagName('body')[0].appendChild(placeholder);
    document.getElementsByTagName('body')[0].appendChild(description);
    var gallery = document.getElementById('imageGallery');
    insertAfter(placeholder, gallery);
    insertAfter(description, placeholder);
}
function prepareGallery() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imageGallery")) return false;
    var gallery = document.getElementById("imageGallery");
    var links = gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++){
        links[i].onclick = function () {
            return showPic(this);
        };
        links[i].onkeypress = links.onclick;
    }
}
function showPic(whichpic) {
    if (!document.getElementById("placeholder")) return false;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    if (placeholder.nodeName != "IMG") return false;
    placeholder.setAttribute("src", source);
    if (document.getElementById("description")) {
        var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
        var description = document.getElementById("description");
        if (description.firstChild.nodeType == 3){
            description.firstChild.nodeValue = text;
        }
    }
    return false;
}



addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

