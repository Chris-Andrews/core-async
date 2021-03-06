var {
  Chan,
  Mix,
  timeout,
  go,
  alts,
  flush,
  close,
} = require('../../../src/api-wrapper.js');

var body = document.querySelector('body');

go(mainloop);

function *mainloop () {
  var buf = {type:'sliding',size:1};
  var mousemove = new Chan(buf).addEvent(['body','mousemove']);
  var mousedown = new Chan(buf).addEvent(['body','mousedown']);
  var channel, value, moveX=0, moveY=0, clickX=0, clickY=0, R=0.5, G=0.5;
  body.innerHTML = `${moveX}, ${moveY} : ${clickX}, ${clickY}`;
  body.style.backgroundColor = `rgba(${Math.round(255*R)},${Math.round(255*G)},0,0.4)`;
  while (true) {
    let {channel, value} = yield alts(mousemove, mousedown);
    switch (channel) {
      case mousemove:
        moveX = Math.round(100*value.clientX/body.clientWidth);
        moveY = Math.round(100*value.clientY/body.clientHeight);
        body.innerHTML = (`${moveX}, ${moveY} : ${clickX}, ${clickY}`);
        break;
      case mousedown:
        value = yield go(dragloop, [body]);
        if (value) {
          clickX = Math.round(100*value.clientX/body.clientWidth);
          clickY = Math.round(100*value.clientY/body.clientHeight);
          body.innerHTML = (`${moveX}, ${moveY} : ${clickX}, ${clickY}`);
        }
        flush(mousemove, mousedown);
        break;
    }
  }
}

function *dragloop (body) {
  var buf = {type:'sliding',size:1};
  var mousemove = new Chan(buf).addEvent(['body','mousemove']);
  var mouseup = new Chan(buf).addEvent(['body','mouseup']);
  var blur = new Chan(buf).addEvent([window, 'blur']);
  var keydown = new Chan(buf).addEvent([window, 'keydown']);
  var {channel, value} = yield alts(mousemove, mouseup, keydown, blur);
  if (channel===mouseup) {
    return {clientX: value.clientX, clientY: value.clientY};
  }
  var G, R;
  while (true) {
    switch (channel) {
      case mousemove:
        R = value.clientX / body.clientWidth;
        G = value.clientY / body.clientHeight;
        body.style.backgroundColor = `rgba(${Math.round(255*R)},${Math.round(255*G)},0,0.4)`;
        break;
      case keydown:
        if (value.keyCode === 27) {
          close(mousemove, mouseup, blur, keydown);
          return;
        }
        break;
      default:
        close(mousemove, mouseup, blur, keydown);
        return;
    }
    ({channel, value} = yield alts(mousemove, mouseup, keydown, blur));
  }
}
