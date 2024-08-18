
(function() {
    const iDoc = document.getElementById("sasLSAF_iframe").contentWindow.document,
    locs = ["REPOSITORY", "WORKSPACE"],
    /*inputField = iDoc.querySelector('#HLS_LSAF_REPOSITORY--navLinkInput-inner'),*/
    qs = locs.map(loc => iDoc.querySelector("#HLS_LSAF_" + loc + "--navLinkInput-inner")),
    tp = locs.map(loc => iDoc.querySelector("#HLS_LSAF_" + loc + "--treePanel")),
    tc = locs.map(loc => iDoc.querySelector("#HLS_LSAF_" + loc + "--table-table")),
    wd = locs.map(loc => '/lsaf/webdav/'+loc.substring(0,4).toLowerCase()),
    curVal = ['', ''],
    lastVal = ['', ''],
    addPath = (key, val) => {
        if (!val) return;
        let myArray = JSON.parse(localStorage.getItem(key)) || [];
        if (!Array.isArray(myArray)) myArray = [];
        myArray = myArray.filter(el=>el!==val);
        myArray.push(val);
        console.log(key+` :`, JSON.stringify(myArray));
        localStorage.setItem(key, JSON.stringify(myArray));
    },
    chkIF = function(inputField, ind) {
        const val = inputField?.value;
        if (inputField) {
            if (val && lastVal[ind] !== val && (val === "/" || val.slice(-1) !== "/")) {
                // console.log(`Polled ${locs[ind]} Input value changed:`, val);
                fetch(wd[ind]+val, {method: "HEAD"})
                    .then(data=>{
                        // console.log(wd[ind]+val+' fetch status:', data.status);
                        if (data.ok) {
                            addPath(locs[ind]+'_path', val);
                            curVal[ind] = val;
                        }
                    })
                    .catch(e=>{console.log(e)});
            }
            lastVal[ind] = val;
        }
    };
    tp.forEach((node, ind) => {
        const inputField = qs[ind];
        if (node) {
            node.addEventListener('click', (event) => {
                setTimeout(() => {
                    console.log('event:', event);
                    chkIF(inputField, ind);
                }, 300);
            });
        }
        console.log(`Enter event listener added to LSAF `+locs[ind]+` Tree Panel.`);
    });
    tc.forEach((node, ind) => {
        const inputField = qs[ind];
        if (node) {
            node.addEventListener('click', (event) => {
                if (event.target.tagName === 'A'
                    && event.target.closest("td").getAttribute("data-sap-ui-colid").endsWith('--nameColumn')
                ) {
                    setTimeout(() => {
                        console.log(`Name click event:`, event);
                        chkIF(inputField, ind);
                    }, 300);
                }
            });
        };
        console.log(`Enter event listener added to LSAF `+locs[ind]+` Table Contents.`);
    });
    qs.forEach((inputField, ind) => {
        /*setInterval(
            () => {
                chkIF(inputField, ind);
            }
            // function() {
            //     const val = inputField?.value;
            //     if (inputField) {
            //         if (val && lastVal[ind] !== val && (val === "/" || val.slice(-1) !== "/")) {
            //             // console.log(`Polled ${locs[ind]} Input value changed:`, val);
            //             fetch(wd[ind]+val, {method: "HEAD"})
            //                 .then(data=>{
            //                     // console.log(wd[ind]+val+' fetch status:', data.status);
            //                     if (data.ok) {
            //                         addPath(locs[ind]+'_path', val);
            //                         curVal[ind] = val;
            //                     }
            //                 })
            //                 .catch(e=>{console.log(e)});
            //         }
            //         lastVal[ind] = val;
            //     }
            // }
        , 500);*/
        if (inputField) {
            inputField.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    const val = inputField?.value;
                    console.log('enter: val:', val);
                    chkIF(inputField, ind);
                }
            });
            console.log(`Enter event listener added to LSAF `+locs[ind]+` Path Field.`);
        } else {
            console.log(`LSAF `+locs[ind]+` Path Field not found.`);
        }
    });
})();