( /*-- Go Forward to Next LSAF Path --*/ function() {
  const iDoc = document.getElementById("sasLSAF_iframe").contentWindow.document,
  locs = ["REPOSITORY", "WORKSPACE"],
  ws = [3,4].map(n => iDoc.getElementById("sasLSAF--sasLSAF_appContainer_lfn_"+n)),
  icn = [3,4].map(n => iDoc.getElementById("sasLSAF--sasLSAF_appContainer_lfn_"+n+"_icn"));
  // const selected = ws.map(el => (el.className === "sasLeftNavItemSelected")),
  selIdx = ws.map(el => (el.className === "sasLeftNavItemSelected")).indexOf(true),
  qs = locs.map(loc => iDoc.getElementById("HLS_LSAF_" + loc + "--navLinkInput-inner"));
  let curr = "";
  if (selIdx > -1) {
    const key = locs[selIdx]+'_path';
    let myArray = JSON.parse(sessionStorage.getItem(key)) || [];
    if (!Array.isArray(myArray)) myArray = [];
    const NextPath = myArray.shift();
    if (NextPath) {
        curr = qs[selIdx].value;
        console.log('Currently in', locs[selIdx], 'path:', curr);
        console.log('Going Forward to: '+NextPath+' ...');
        qs[selIdx].value = NextPath ;
        qs[selIdx].dispatchEvent(keyboardEvent = new KeyboardEvent("keydown", 
        { code: "Enter", key: "Enter", charCode: 13, keyCode: 13, view: window, bubbles: !0 }));
        myArray.push(NextPath);
        setTimeout(() => {
            console.log('Updated '+key+` :`, JSON.stringify(myArray));
            sessionStorage.setItem(key, JSON.stringify(myArray));
        }, 500);
    } else {
        console.log('No next Path recorded.');
    }
  }
}());