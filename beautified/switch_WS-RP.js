( /*-- Switch between LSAF Repository and Workspace locations --*/ function() {
  const iDoc = document.getElementById("sasLSAF_iframe").contentWindow.document,
  locs = ["REPOSITORY", "WORKSPACE"],
  ws = [3,4].map(n => iDoc.getElementById("sasLSAF--sasLSAF_appContainer_lfn_"+n)),
  icn = [3,4].map(n => iDoc.getElementById("sasLSAF--sasLSAF_appContainer_lfn_"+n+"_icn"));
  const selected = ws.map(el => (el.className === "sasLeftNavItemSelected")),
  selIdx = selected.indexOf(true),
  qs = locs.map(loc => iDoc.getElementById("HLS_LSAF_" + loc + "--navLinkInput-inner"));
  console.log('locs:', locs,'\nws:', ws, '\nicn:', icn, '\nselected:', selected, '\nselIdx:', selIdx);
  let curr = "";
  if (selIdx > -1) {
    curr = qs[selIdx].value;
    console.log('Currently in', locs[selIdx], 'path:', curr);
    console.log('otherLoc:', locs[1-selIdx], 'path:',  qs[1-selIdx]?.value);
    icn[1-selIdx].click();
    qs[1-selIdx].value = curr ;
    qs[1-selIdx].dispatchEvent(keyboardEvent = new KeyboardEvent("keydown", 
      { code: "Enter", key: "Enter", charCode: 13, keyCode: 13, view: window, bubbles: !0 }));
    setTimeout((() => {
      const e = iDoc.querySelectorAll(`.sapUiTreeNodeSelected[aria-selected="true"][id*="${locs[1-selIdx]}"]`);
      console.log("sel", e);
      if (e[0]) e[0].scrollIntoViewIfNeeded();
    }), 2e3);
  }
}());