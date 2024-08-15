
(function() {
    const iDoc = document.getElementById("sasLSAF_iframe").contentWindow.document,
    locs = ["REPOSITORY", "WORKSPACE"],
    lastVal = ["", ""],
    qs = locs.map(loc => iDoc.querySelector("#HLS_LSAF_" + loc + "--navLinkInput-inner"));
    qs.forEach((inputField, ind) => {
        if (inputField) {
            const originalValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
            if (originalValueSetter && ! Object.getOwnPropertyDescriptor(inputField, 'value')) {
                Object.defineProperty(inputField, 'value', {
                    set: function(val) {
                        if (lastVal[ind] !== val) console.log(`LSAF `+locs[ind]+` Path Input Field changed:`, val);
                        lastVal[ind] = val;
                        originalValueSetter.call(this, val);
                    }
                });
                console.log(`Monkey Patch added to LSAF `+locs[ind]+` Input Field Setter.`);
            } else {
                console.log(`Monkey Patching LSAF `+locs[ind]+` Input Field Setter:`, 'skipped redefining non-configurable property.');
            }
        } else {
            console.log(`LSAF `+locs[ind]+` Path Input Field not found.`);
        }
    })
})();