var btn = document.querySelector('#clickMe');

var clicks = Rx.Observable.fromEvent(btn, 'click');


clicks.scan(0, (s) => s + 1)
  .buffer(clicks.throttle(1000))
  .forEach(x => sendValues(x));

function sendValues(arr) {
  var pre = document.createElement('pre');
  pre.innerHTML = JSON.stringify(arr);
  document.querySelector('#results')
    .appendChild(pre);
}