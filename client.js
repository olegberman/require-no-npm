
function require(module_name, done) {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.onload = done.bind(window || this)
  script.src = '/' + module_name
  document.head.appendChild(script)
  return true
}
