const { TextEncoder, TextDecoder } = require('util');
const JSDOMEnvironment = require('jest-environment-jsdom').default;

class CustomJSDOMEnvironment extends JSDOMEnvironment {
  constructor(...args) {
    super(...args);
    this.global.TextEncoder = TextEncoder;
    this.global.TextDecoder = TextDecoder;
  }
}

module.exports = CustomJSDOMEnvironment;
