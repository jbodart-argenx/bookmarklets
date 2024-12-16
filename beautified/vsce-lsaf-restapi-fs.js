( /*-- Open in vsce-lsaf-restapi-fs --*/ function(document) {
   const iframe = document.getElementById('sasLSAF_iframe');
   if (! iframe) return;
   const iWindow = iframe ? iframe.contentWindow : null;
   const iDocument = iWindow ? iWindow.document : null;
   const repo = iDocument ? (iDocument.querySelector('[aria-label="Selected, Workspace"]') ? 'work' : 'repo') : 'repo';
   const full = repo === 'work' ? 'WORKSPACE' : 'REPOSITORY';
   const qs = iDocument ? iDocument.getElementById('HLS_LSAF_' + full + '--navLinkInput-inner') : null;
   const v = qs ? qs.value : '';
   const {
      href,
      protocol,
      host
   } = window.location;
   const ve=encodeURIComponent('lsaf-' + repo + '://'+ host.split('.')[0] + v);
   const urlPrefix = 'vscode://jbodart-argenx.vsce-lsaf-restapi-fs?uri=';
   console.log(repo, qs, v, ve);
   open(urlPrefix + ve);
})(document);