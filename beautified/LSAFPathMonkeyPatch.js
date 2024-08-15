
(function() {
    const iDoc = document.getElementById("sasLSAF_iframe").contentWindow.document,
    inputField = iDoc.querySelector('#HLS_LSAF_REPOSITORY--navLinkInput-inner');
    if (inputField) {
        var originalValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
        Object.defineProperty(inputField, 'value', {
            set: function(value) {
                console.log('Input value changed programmatically:', value);
                originalValueSetter.call(this, value);
            }
        });
        console.log('Monkey Patch added, value:', inputField.value);
    } else {
        console.log('LSAF_REPOSITORY path input field not found.');
    }
})();