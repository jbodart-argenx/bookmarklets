
(function() {
    const iDoc = document.getElementById("sasLSAF_iframe").contentWindow.document,
    inputField = iDoc.querySelector('#HLS_LSAF_REPOSITORY--navLinkInput-inner');
    let previousValue = '';
    setInterval(function() {
        if (inputField && inputField.value && inputField.value !== previousValue) {
            console.log('Polled Input value changed:', inputField.value);
            previousValue = inputField.value;
        }
    }, 100);
})();