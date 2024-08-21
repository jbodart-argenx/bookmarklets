
(function() {
    const iDoc = document.getElementById("sasLSAF_iframe").contentWindow.document,
    locs = ["REPOSITORY", "WORKSPACE"],
    ws = [3,4].map(n => iDoc.getElementById("sasLSAF--sasLSAF_appContainer_lfn_"+n)),
    selIdx = ws.map(el => (el.className === "sasLeftNavItemSelected")).indexOf(true),
    qs = locs.map(loc => iDoc.querySelector("#HLS_LSAF_" + loc + "--navLinkInput-inner")),
    addPath = (key, val) => {
        if (!val) return;
        let myArray = JSON.parse(localStorage.getItem(key)) || [];
        if (!Array.isArray(myArray)) myArray = [];
        myArray = myArray.filter(el=>el!==val);
        myArray.push(val);
        console.log(key+` :`, JSON.stringify(myArray));
        localStorage.setItem(key, JSON.stringify(myArray));
    };
    if (selIdx > -1) {
        const inputField = qs[selIdx];
        const val = inputField?.value;
        if (val) {
            addPath(locs[selIdx]+'_path', val);
        }
    }
})();