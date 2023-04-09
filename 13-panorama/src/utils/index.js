/* eslint-disable */
import mitt from 'mitt';

export const Bus = new mitt();

export const sleep = (duration) => new Promise((resolve) => {
  setTimeout(resolve, duration);
});

export const toast = (a, b) => {
  var c = document.createElement("div");
  c.style.position = "fixed", c.style.maxWidth = "80%", c.style.color = "white", c.style.fontSize = "14px", c.style.boxSizing = "border-box", c.style.background = "rgba(0,0,0,0.76)", c.style.padding = "0.8em 2.618em", c.style.top = "40%", c.style.left = "50%", c.style.zIndex = 999999999, c.style.borderRadius = "3px", c.style.opacity = "0", c.innerText = a, document.body.appendChild(c), c.style.marginLeft = -(c.offsetWidth / 2) + "px", c.style.marginTop = -c.offsetHeight / 2 + "px", setTimeout(function () {
    c.style.marginLeft = -(c.offsetWidth / 2) + "px", c.style.marginTop = -c.offsetHeight + "px", c.style.transition = "all 0.3s", c.style.opacity = "1", setTimeout(function () {
      c.style.opacity = "0", c.style.marginTop = -c.offsetHeight / 2 + "px", setTimeout(function () {
        document.body.removeChild(c)
      }, 300)
    }, parseInt(b) || 1618)
  }, 0)
}
