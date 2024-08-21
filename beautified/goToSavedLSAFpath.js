( /*-- Jump to LSAF path defined in localStorage --*/ function() {
  const iDoc = document.getElementById("sasLSAF_iframe").contentWindow.document,
  locs = ["REPOSITORY", "WORKSPACE"],
  ws = [3,4].map(n => iDoc.getElementById("sasLSAF--sasLSAF_appContainer_lfn_"+n)),
  // icn = [3,4].map(n => iDoc.getElementById("sasLSAF--sasLSAF_appContainer_lfn_"+n+"_icn"));
  // const selected = ws.map(el => (el.className === "sasLeftNavItemSelected")),
  selIdx = ws.map(el => (el.className === "sasLeftNavItemSelected")).indexOf(true),
  qs = locs.map(loc => iDoc.getElementById("HLS_LSAF_" + loc + "--navLinkInput-inner"));
  let curr = "";
  const goToPath = function(newPath) {
    console.log('Going to: '+newPath+' ...');
    qs[selIdx].value = newPath ;
    qs[selIdx].dispatchEvent(keyboardEvent = new KeyboardEvent("keydown", 
    { code: "Enter", key: "Enter", charCode: 13, keyCode: 13, view: window, bubbles: !0 }));
  };
  // Function to add custom scrollbar styles for a specific div (override the default styles)
  function addCustomScrollbarStyles(divId) {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        #${divId}::-webkit-scrollbar {
            display: block;
        }
        #${divId}::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.5); 
        }
        #${divId}::-webkit-scrollbar-track {
            background-color: rgba(0, 0, 0, 0.1); 
        }
    `;
    document.head.appendChild(style);
  }
  if (selIdx > -1) {
    const key = locs[selIdx]+'_path';
    let paths = JSON.parse(localStorage.getItem(key)) || [];
    if (!Array.isArray(paths)) paths = [];
    if (paths.length>0) {
      paths.sort();
      curr = qs[selIdx].value;
      console.log('Currently in', locs[selIdx], 'path:', curr);
      console.log('Saved paths:', paths);

      // Create a container div for the popup
      var cont = document.createElement('div'), cs = cont.style;
      cont.id="BkmkletContainer1";
      cs.position = 'fixed';
      cs.top = '50%';
      cs.left = '50%';
      cs.transform = 'translate(-50%, -50%)';
      cs.padding = '20px';
      cs.backgroundColor = '#3366ff';
      cs.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
      cs.zIndex = 10000;
      cs.borderRadius = '8px';
      cs.textAlign = 'left';
      cs.fontFamily = 'monospace';
      cs.maxHeight = '80vh'; // Set a max height based on the viewport height
      cs.width = '80vw'; // Set a fixed width based on the viewport width
      // cs.overflowX = 'auto'; // Enable vertical scrolling if content overflows
      // cs.overflowY = 'scroll'; // Enable vertical scrolling if content overflows
      // cs.scrollbarWidth = 'auto';
      

      var container2 = document.createElement('div'), c2s = container2.style;
      container2.id="BkmkletContainer2";
      c2s.maxHeight = '70vh'; // Set a max height based on the viewport height
      // c2s.width = '70vw'; // Set a fixed width based on the viewport width
      c2s.overflow = 'auto'; // Enable vertical scrolling if content overflows
      c2s.overflowX = 'auto'; // Enable vertical scrolling if content overflows
      c2s.overflowY = 'auto'; // Enable vertical scrolling if content overflows
      c2s.scrollbarWidth = 'auto';
      cont.appendChild(container2);
  
      // Add each path as a button
      paths.forEach(function(item) {
        var btn = document.createElement('button'), bs=btn.style;
        btn.textContent = item;
        bs.display = 'block';
        bs.width = '100%';
        bs.margin = '3px 0';
        bs.padding = '5px';
        bs.cursor = 'pointer';
        bs.textAlign = 'left';
        // bs.fontFamily = 'monospace';
        bs.boxSizing = 'border-box'; // Ensure padding does not cause overflow
        btn.onclick = function() {
          // window.location.pathname = item.path;
          document.body.removeChild(cont);
          goToPath(item);
        };
        container2.appendChild(btn);
      });

      // Create a close button
      var cb = document.createElement('button');
      cb.textContent = 'Cancel';
      cb.style.marginTop = '10px';
      cb.style.marginBottom = '10px';
      cb.style.display = 'block';
      cb.style.marginLeft = 'auto';
      cb.style.marginRight = 'auto';
      cb.style.cursor = 'pointer';
      // cb.style.textAlign = 'left';
      // cb.style.fontFamily = 'monospace';
      cb.onclick = function() {
        document.body.removeChild(cont);
      };
      cont.appendChild(cb);
      // Style the containers
      addCustomScrollbarStyles('BkmkletContainer1');
      addCustomScrollbarStyles('BkmkletContainer2');
      // Append the container to the body
      document.body.appendChild(cont);
    } else {
      console.log('No Path bookmarked.');
    }
  }
}());