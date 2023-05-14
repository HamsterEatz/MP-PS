const fpButton = document.getElementById('getFirstParadeStateButton');
const lpButton = document.getElementById('getLastParadeStateButton');
const remarksButton = document.getElementById('getRemarksButton');

const copyToClipboardButton = document.getElementById('copyToClipboardButton');

const origin_url = `${location.origin}/api`;

fpButton.onclick = (e) => {
    copyToClipboardButton.style.visibility = "hidden";
    document.getElementById("res").innerHTML = "LOADING...";
    fpButton.disabled = true;
    lpButton.disabled = true;
    remarksButton.disabled = true;

    $.ajax({
        type: 'GET',
        url: `${origin_url}/firstParadeState`,
        cors: true,
        success: function (data) {
            document.getElementById("res").innerHTML = data;
            copyToClipboardButton.style.visibility = "visible";
            fpButton.disabled = false;
            lpButton.disabled = false
            remarksButton.disabled = false;
        }
    });
}

lpButton.onclick = (e) => {
    copyToClipboardButton.style.visibility = "hidden";
    document.getElementById("res").innerHTML = "LOADING...";
    fpButton.disabled = true;
    lpButton.disabled = true;
    remarksButton.disabled = true;

    $.ajax({
        type: 'GET',
        url: `${origin_url}/lastParadeState`,
        cors: true,
        success: function (data) {
            document.getElementById("res").innerHTML = data;
            copyToClipboardButton.style.visibility = "visible";
            fpButton.disabled = false;
            lpButton.disabled = false;
            remarksButton.disabled = false;
        }
    });
}

remarksButton.onclick = (e) => {
    copyToClipboardButton.style.visibility = "hidden";
    document.getElementById("res").innerHTML = "LOADING...";
    fpButton.disabled = true;
    lpButton.disabled = true;
    remarksButton.disabled = true;

    $.ajax({
        type: 'GET',
        url: `${origin_url}/remarks`,
        cors: true,
        success: function (data) {
            document.getElementById("res").innerHTML = data;
            copyToClipboardButton.style.visibility = "visible";
            fpButton.disabled = false;
            lpButton.disabled = false;
            remarksButton.disabled = false;
        }
    });
}

copyToClipboardButton.onclick = (e) => {
    navigator.clipboard.writeText(document.getElementById("res").innerHTML);
}
