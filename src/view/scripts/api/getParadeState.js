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

            let modalInfo = '<p>Please contact the following people:</p>';

            // Unaccounted
            if (unaccounted.length > 0) {
                hasUnaccounted = true;
                info += "\n\n*Unaccounted:*";
                for (let i = 0; i < unaccounted.length; i++) {
                    info += `\n${i + 1}) ${unaccounted[i].value}`;
                    const { name, rank, contact } = unaccounted[i].contact;
                    modalInfo += `<p>${i + 1}) ${rank} ${name} (${contact}) 
                <a href="tel:65${contact}">
                    <button type="button" class="ml-2 btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                        </svg>
                    </button>
                </a>
                <button type="button" class="ml-2 btn btn-success" onClick="window.open('https://wa.me/65${contact}', '_blank')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp"
                        viewBox="0 0 16 16">
                        <path
                            d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z">
                        </path>
                    </svg>
                </button></p>`;
                }
            }

            res.innerHTML = info;
            if (unaccounted.length > 0) {
                document.getElementById("unaccountedModalRes").innerHTML = modalInfo;
                $("#unaccountedModal").modal('show');
            }
            middleware();
        }
    });
}
