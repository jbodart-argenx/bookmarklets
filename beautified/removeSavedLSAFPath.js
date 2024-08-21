
(function() {
    const iDoc = document.getElementById("sasLSAF_iframe").contentWindow.document,
    locs = ["REPOSITORY", "WORKSPACE"],
    ws = [3,4].map(n => iDoc.getElementById("sasLSAF--sasLSAF_appContainer_lfn_"+n)),
    selIdx = ws.map(el => (el.className === "sasLeftNavItemSelected")).indexOf(true),
    qs = locs.map(loc => iDoc.querySelector("#HLS_LSAF_" + loc + "--navLinkInput-inner")),
    removePath = (key, val) => {
        if (!val) return;
        let myArray = JSON.parse(localStorage.getItem(key)) || [];
        if (!Array.isArray(myArray)) myArray = [];
        if (myArray.includes(val)) { 
            myArray = myArray.filter(el=>el!==val);
            localStorage.setItem(key, JSON.stringify(myArray));
            console.log('Removed path:', val +"\n", key+` :`, JSON.stringify(myArray));
            alert('Removed path:\n'+ val);
        } 
        else {
            console.log('Current path is not saved:', val);
            alert('Current path is not saved:\n'+ val);
        }
    };
    if (selIdx > -1) {
        const inputField = qs[selIdx];
        const val = inputField?.value;
        if (val) {
            removePath(locs[selIdx]+'_path', val);
        }
    }
})();