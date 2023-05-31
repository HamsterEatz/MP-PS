const fpButton = document.getElementById('getFirstParadeStateButton');
const lpButton = document.getElementById('getLastParadeStateButton');
const remarksButton = document.getElementById('getRemarksButton');

const copyToClipboardButton = document.getElementById('copyToClipboardButton');

const loadingSpinner = document.getElementById('loadingSpinner');

const res = document.getElementById("res");

let hasUnaccounted = false;
$('[data-toggle="tooltip"]').tooltip({ trigger: 'click' });

function toggleButtons(isDisabled) {
    copyToClipboardButton.style.visibility = isDisabled ? "hidden" : "visible";
    loadingSpinner.style.visibility = isDisabled ? 'visible' : 'hidden';
    fpButton.disabled = isDisabled;
    lpButton.disabled = isDisabled;
    remarksButton.disabled = isDisabled;
}

fpButton.onclick = (e) => {
    hasUnaccounted = false;
    toggleButtons(true);
    res.innerHTML = '';
    getParadeState(true, () => toggleButtons(false));
}

lpButton.onclick = (e) => {
    hasUnaccounted = false;
    toggleButtons(true);
    res.innerHTML = '';
    getParadeState(false, () => toggleButtons(false));
}

remarksButton.onclick = (e) => {
    hasUnaccounted = false;
    toggleButtons(true);
    res.innerHTML = '';

    $.ajax({
        type: 'GET',
        url: `${origin_url}/remarks`,
        cors: true,
        success: function (data) {
            res.innerHTML = data;
            toggleButtons(false);
        }
    });
}

copyToClipboardButton.onclick = (e) => {
    navigator.clipboard.writeText(document.getElementById("res").innerHTML);
    window.setTimeout(() => $('#copyToClipboardButton').tooltip('hide'), 2000);
    if (hasUnaccounted) {
        $("#unaccountedModal").modal('show');
    }
}
