const origin_url = `${location.origin}/api`;

function getParadeState(isFirstParade, middleware) {
    const date = moment();
    const day = date.day();

    // If Sat or Sun
    if (day === 0 || day === 6) {
        res.innerHTML = "Parade State is not available on the weekend!";
        middleware();
        copyToClipboardButton.style.visibility = "hidden";
        return;
    }

    $.ajax({
        type: 'GET',
        url: isFirstParade ? `${origin_url}/firstParadeState` : `${origin_url}/lastParadeState`,
        cors: true,
        success: function (data) {
            const { present, absent, unaccounted } = data;

            let info = `*${date.format('DD/MM/YY')} ${isFirstParade ? "First" : "Last"} Parade - Manpower Br*\n\n*Present:*`;

            // Present
            for (let i = 0; i < present.length; i++) {
                info += `\n${i + 1}) ${present[i].value}`;
            }

            // Absent
            if (absent.length > 0) {
                info += "\n\n*Absent:*"
                for (let i = 0; i < absent.length; i++) {
                    info += `\n${i + 1}) ${absent[i].value}`;
                }
            }

            // Unaccounted
            if (unaccounted.length > 0) {
                info += "\n\n*Unaccounted:*";
                for (let i = 0; i < unaccounted.length; i++) {
                    info += `\n${i + 1}) ${unaccounted[i].value}`;
                }
            }

            res.innerHTML = info;
            middleware();
        }
    });
}