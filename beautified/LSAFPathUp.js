( /*-- GoTo Parent LSAF Path --*/ function() {
  const iDoc = document.getElementById("sasLSAF_iframe").contentWindow.document,
  locs = ["REPOSITORY", "WORKSPACE"],
  ws = [3,4].map(n => iDoc.getElementById("sasLSAF--sasLSAF_appContainer_lfn_"+n)),
  icn = [3,4].map(n => iDoc.getElementById("sasLSAF--sasLSAF_appContainer_lfn_"+n+"_icn"));
  // const selected = ws.map(el => (el.className === "sasLeftNavItemSelected")),
  selIdx = ws.map(el => (el.className === "sasLeftNavItemSelected")).indexOf(true),
  qs = locs.map(loc => iDoc.getElementById("HLS_LSAF_" + loc + "--navLinkInput-inner"));
  let curr = "";
  if (selIdx > -1) {
    curr = qs[selIdx].value;
    console.log('Currently in', locs[selIdx], 'path:', curr);
    const parentPath = curr.substring(0, curr.lastIndexOf('/'));
    console.log('parentPath:', parentPath);
    console.log('Switching to: '+parentPath+' ...');
    qs[selIdx].value = parentPath ;
    qs[selIdx].dispatchEvent(keyboardEvent = new KeyboardEvent("keydown", 
      { code: "Enter", key: "Enter", charCode: 13, keyCode: 13, view: window, bubbles: !0 }));
    setTimeout((() => {
      const e = iDoc.querySelectorAll(`.sapUiTreeNodeSelected[aria-selected="true"][id*="${locs[selIdx]}"]`);
      // console.log("sel", e);
      if (e[0]) e[0].scrollIntoViewIfNeeded();
    }), 200);
  }
}());