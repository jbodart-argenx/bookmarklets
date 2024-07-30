( /*-- Jump to LSAF path defined in localStorage --*/ function() {
  const iframe = document.getElementById("sasLSAF_iframe"),
    iWindow = iframe.contentWindow,
    iDocument = iWindow.document,
    repo = iDocument.querySelector('[aria-label="Selected, Workspace"]') ? "work" : "repo",
    full = "work" === repo ? "WORKSPACE" : "REPOSITORY",
    qs = iDocument.getElementById("HLS_LSAF_" + full + "--navLinkInput-inner"),
    w = window.open("", "", "width=800,height=200"),
    links = JSON.parse(localStorage.getItem("lsafLinks")),
    keys = Object.keys(links),
    text = keys.map((e => e + " = " + links[e]));
  w.document.write(text.join(", ")), w.focus(), setTimeout((function() {
    w.close()
  }), 2e3), w.document.addEventListener("keydown", (e => {
    links[e.key] && (qs.value = links[e.key], qs.dispatchEvent(keyboardEvent = new KeyboardEvent("keydown", {
      code: "Enter",
      key: "Enter",
      charCode: 13,
      keyCode: 13,
      view: window,
      bubbles: !0
    })))
  }));
}());