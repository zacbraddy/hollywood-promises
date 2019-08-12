class HollywoodPromise {
  addPromise(name, promise) {
    Object.defineProperty(this, name, {
      get: function() {
        return promise;
      },
    });
  }
}

const waitSeconds = waitInSeconds => name => resolve => {
  setTimeout(() => {
    console.log(`${name} fired`);
    resolve(name);
  }, waitInSeconds * 1000);
};

const test = async () => {
  const hp = new HollywoodPromise();
  hp.addPromise('awaiting', new Promise(waitSeconds(10)('awaiting')));
  hp.addPromise('longAwaiting', new Promise(waitSeconds(25)('longAwaiting')));

  console.log(Date.now());
  const longValue = await hp.longAwaiting;
  console.log(Date.now());
  const value = await hp.awaiting;
  console.log(Date.now());

  console.log(`Value was ${value}`);
  console.log(`longValue was ${longValue}`);
};

test();
