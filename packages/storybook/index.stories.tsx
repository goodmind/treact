function importAll(r) {
  r.keys().forEach(r)
}

//$off
importAll(require.context('./stories', true, /.*.tsx/))
