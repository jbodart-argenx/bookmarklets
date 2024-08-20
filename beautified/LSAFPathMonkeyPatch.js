
(function() {
    const iDoc = document.getElementById("sasLSAF_iframe").contentWindow.document,
    locs = ["REPOSITORY", "WORKSPACE"],
    lastVal = ["", ""],
    qs = locs.map(loc => iDoc.querySelector("#HLS_LSAF_" + loc + "--navLinkInput-inner")),
    addPath = (key, val) => {
        if (!val) return;
        let myArray = JSON.parse(localStorage.getItem(key)) || [];
        if (!Array.isArray(myArray)) myArray = [];
        console.log(key+` changed:`, val);
        myArray = myArray.filter(el=>el!==val);
        myArray.push(val);
        console.log('myArray:', JSON.stringify(myArray));
        localStorage.setItem(key, JSON.stringify(myArray));
    };
    let curVal='';
    qs.forEach((inputField, ind) => {
        if (inputField) {
            const originalValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
            const originalValueGetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').get;
            /*Object.defineProperty(inputField, 'value', {
                get: function() {
                    curVal = originalValueGetter.call(this);
                    return originalValueGetter.call(this);
                }
            });*/
            if (originalValueSetter && ! Object.getOwnPropertyDescriptor(inputField, 'value')) {
                Object.defineProperty(inputField, 'value', {
                    set: function(val) {
                        if (val && lastVal[ind] !== val) {
                            addPath(locs[ind]+'_path', val);
                        }
                        lastVal[ind] = val;
                        originalValueSetter.call(this, val);
                    }
                });
                console.log(`Monkey Patch added to LSAF `+locs[ind]+` Input Field Setter.`);
            } else {
                console.log(`Monkey Patching LSAF `+locs[ind]+` Input Field Setter:`, 'skipped redefining non-configurable property.');
            }
            /*inputField.addEventListener('input', function(event) {
                const val = this.value || event.target.value || inputField.value;
                console.log('input: val:', val);
                if (lastVal[ind] !== val) {
                    addPath(locs[ind]+'_path', val);
                }
                lastVal[ind] = val;
            });
            console.log(`Input event listener added to LSAF `+locs[ind]+` Path Field.`);*/
            inputField.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    const val = this.value || curVal;
                    console.log('enter: val:', val);
                    if (val && lastVal[ind] !== val) {
                        addPath(locs[ind]+'_path', val);
                    }
                    lastVal[ind] = val;
                }
            });
            console.log(`Enter event listener added to LSAF `+locs[ind]+` Path Field.`);
        } else {
            console.log(`LSAF `+locs[ind]+` Path Input Field not found.`);
        }
    })
})();