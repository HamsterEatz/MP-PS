const fpButton = document.getElementById('getFirstParadeStateButton');
const lpButton = document.getElementById('getLastParadeStateButton');
const remarksButton = document.getElementById('getRemarksButton');

const copyToClipboardButton = document.getElementById('copyToClipboardButton');

const loadingSpinner = document.getElementById('loadingSpinner');

const res = document.getElementById("res");

function toggleButtons() {
    copyToClipboardButton.style.visibility = "visible";
    loadingSpinner.style.visibility = 'hidden';
    fpButton.disabled = false;
    lpButton.disabled = false;
    remarksButton.disabled = false;
}

fpButton.onclick = (e) => {
    copyToClipboardButton.style.visibility = "hidden";
    loadingSpinner.style.visibility = 'visible';
    fpButton.disabled = true;
    lpButton.disabled = true;
    remarksButton.disabled = true;
    res.innerHTML = '';

    getParadeState(true, toggleButtons);
}

lpButton.onclick = (e) => {
    copyToClipboardButton.style.visibility = "hidden";
    loadingSpinner.style.visibility = 'visible';
    fpButton.disabled = true;
    lpButton.disabled = true;
    remarksButton.disabled = true;
    res.innerHTML = '';

    getParadeState(false, toggleButtons);
}

remarksButton.onclick = (e) => {
    copyToClipboardButton.style.visibility = "hidden";
    loadingSpinner.style.visibility = 'visible';
    fpButton.disabled = true;
    lpButton.disabled = true;
    remarksButton.disabled = true;
    res.innerHTML = '';

    $.ajax({
        type: 'GET',
        url: `${origin_url}/remarks`,
        cors: true,
        success: function (data) {
            res.innerHTML = data;
            toggleButtons();
        }
    });
}

copyToClipboardButton.onclick = (e) => {
    navigator.clipboard.writeText(document.getElementById("res").innerHTML);
}
