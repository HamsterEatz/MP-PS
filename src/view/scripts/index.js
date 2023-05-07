const fpButton = document.getElementById('getFirstParadeStateButton');
const lpButton = document.getElementById('getLastParadeStateButton');
const remarksButton = document.getElementById('getRemarksButton');

const copyToClipboardButton = document.getElementById('copyToClipboardButton');

const port = 3001;

fpButton.onclick = (e) => {
    copyToClipboardButton.style.visibility = "hidden";

    $.ajax({
        type: 'GET',
        url: `http://localhost:${port}/firstParadeState`,
        accept: 'Access-Control-Allow-Origin: *, Access-Control-Allow-Methods: POST, GET, OPTIONS, Access-Control-Allow-Headers: Content-Type',
        cors: true,
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
        url: `http://localhost:${port}/lastParadeState`,
        cors: true,
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
        url: `http://localhost:${port}/remarks`,
        cors: true,
        success: function (data) {
            document.getElementById("res").innerHTML = data;
            copyToClipboardButton.style.visibility = "visible";
        }
    });
}

copyToClipboardButton.onclick = (e) => {
    navigator.clipboard.writeText(document.getElementById("res").innerHTML);
}