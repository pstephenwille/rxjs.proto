console.clear();

/*
 * promise always runs */
var promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('promise timeout hit');
    resolve(42);
  }, 1000);
  console.log('promise started');
});

promise.then(x => console.log(x));

/*
 * observables are lazy.
 * contain thier own setup/tear down code blocks.
 * references to observables allow you to re-call it, and get fresh results.
 * traditional promises return stale results.
 * */
var source = Rx.Observable.create((observer) => {
  var id = setTimeout(() => {
    /* set up code */
    console.log('observable timeout hit');
    observer.onNext([33]);
  }, 1000);
  console.log('observable started');

  return () => {
    /* tear down & clean up code */
    console.log('dispose called');
    clearTimeout(id);
  };
});

var disposable = source.forEach(x => console.log(x));

setTimeout(() => {
  disposable.dispose();
}, 500);