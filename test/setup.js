import { JSDOM } from 'jsdom';
import { URL } from 'whatwg-url';

// Set up fake DOM for use by Enzyme's mount() method.
const jsdom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost' });
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter((prop) => typeof target[prop] === 'undefined')
    .map((prop) => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};
global.screen = window.screen;
global.pageXOffset = window.pageXOffset;
global.pageYOffset = window.pageYOffset;
global.URL = URL;
global.HTMLElement = window.HTMLElement; // to get chai's deep equality to work

copyProps(window, global);
