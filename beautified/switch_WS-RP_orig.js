( /*-- Switch between LSAF Repository and Workspace locations --*/ function() {
  const iframe = document.getElementById("sasLSAF_iframe"),
    iWindow = iframe.contentWindow,
    iDocument = iWindow.document,
    repo = iDocument.querySelector('[aria-label="Selected, Workspace"]') ? "work" : "repo",
    full = "work" === repo ? "WORKSPACE" : "REPOSITORY",
    qs = iDocument.getElementById("HLS_LSAF_" + full + "--navLinkInput-inner"),
    full2 = "work" === repo ? "REPOSITORY" : "WORKSPACE",
    qs2 = iDocument.getElementById("HLS_LSAF_" + full2 + "--navLinkInput-inner"),
    wrk = iDocument.getElementById("sasLSAF--sasLSAF_appContainer_lfn_4_icn"),
    wrk2 = "true" === iDocument.getElementById("sasLSAF--sasLSAF_appContainer_lfn_4").getAttribute("aria-selected"),
    rp = iDocument.getElementById("sasLSAF--sasLSAF_appContainer_lfn_3_icn"),
    rp2 = "true" === iDocument.getElementById("sasLSAF--sasLSAF_appContainer_lfn_3").getAttribute("aria-selected"),
    current = qs.value;
  wrk2 && rp.click(), rp2 && wrk.click(), qs2.value = current, qs2.dispatchEvent(keyboardEvent = new KeyboardEvent("keydown", {
    code: "Enter",
    key: "Enter",
    charCode: 13,
    keyCode: 13,
    view: window,
    bubbles: !0
  })), setTimeout((() => {
    const e = iDocument.querySelectorAll('[aria-selected="true"]');
    console.log("sel", e), e[2].scrollIntoViewIfNeeded()
  }), 2e3);
}());