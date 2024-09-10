( /*-- TextViewer 2 --*/ function(document) {
  const
    iframe = document.getElementById('sasLSAF_iframe'),
    iWindow = iframe ? iframe.contentWindow : null,
    iDocument = iWindow ? iWindow.document : null,
    repo = iDocument ? (iDocument.querySelector('[aria-label="Selected, Workspace"]') ? 'work' : 'repo') : 'repo',
    full = repo === 'work' ? 'WORKSPACE' : 'REPOSITORY',
    qs = iDocument ? iDocument.getElementById('HLS_LSAF_' + full + '--navLinkInput-inner') : null,
    v = qs ? qs.value : '',
    ve=encodeURIComponent(v),
    lastPart = v.split('/').pop(),
    type = lastPart.split('.').pop(),
    {
      href,
      protocol,
      host
    } = window.location,
    urlPrefix = protocol + '//' + host,
    filelink = urlPrefix + '/lsaf/webdav/' + repo + ve;
    console.log(repo, qs, v, ve);
  if (lastPart === 'documents')
    open(urlPrefix + '/lsaf/webdav/repo/general/biostat/tools/dashstudy/index.html?file=' + ve + '/meta/dashstudy.json');
  else if (lastPart.split('.').length === 1 && ve)
    open(urlPrefix + '/lsaf/webdav/repo/general/biostat/tools/textviewer/index.html?file=' + ve);
  else
    open(urlPrefix + '/lsaf/webdav/repo/general/biostat/tools/textviewer/index.html?file=' + filelink);
})(document);