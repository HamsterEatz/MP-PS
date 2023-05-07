const fpButton = document.getElementById('getFirstParadeStateButton');
const lpButton = document.getElementById('getLastParadeStateButton');
const remarksButton = document.getElementById('getRemarksButton');

const copyToClipboardButton = document.getElementById('copyToClipboardButton');

fpButton.onclick = (e) => {
    copyToClipboardButton.style.visibility = "hidden";

    $.ajax({
        type: 'GET',
        url: 'http://localhost:443/firstParadeState',
        success: function (data) {
            document.getElementById("res").innerHTML = data;
            copyToClipboardButton.style.visibility = "visible";
        }
    });
}

lpButton.onclick = (e) => {
    copyToClipboardButton.style.visibility = "hidden";

    $.ajax({
        type: 'GET',
        url: 'http://localhost:443/lastParadeState',
        success: function (data) {
            document.getElementById("res").innerHTML = data;
            copyToClipboardButton.style.visibility = "visible";
        }
    });
}

remarksButton.onclick = (e) => {
    copyToClipboardButton.style.visibility = "hidden";

    $.ajax({
        type: 'GET',
        url: 'http://localhost:443/remarks',
        success: function (data) {
            document.getElementById("res").innerHTML = data;
            copyToClipboardButton.style.visibility = "visible";
        }
    });
}

copyToClipboardButton.onclick = (e) => {
    navigator.clipboard.writeText(document.getElementById("res").innerHTML);
}