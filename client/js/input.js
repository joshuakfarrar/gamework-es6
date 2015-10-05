import Key from './key';

export default class Input {
  constructor(game) {
    this.game = game;
    this.keys = [];
    this.listener = new window.keypress.Listener();
    this.listener.register_many([
      {
        "keys": 'q',
        "is_exclusive": true,
        "on_keydown": this.keydown.bind(this),
        "on_keyup": this.keyup.bind(this)
      },
      {
        "keys": 'w',
        "is_exclusive": true,
        "on_keydown": this.keydown.bind(this),
        "on_keyup": this.keyup.bind(this)
      },
      {
        "keys": 'e',
        "is_exclusive": true,
        "on_keydown": this.keydown.bind(this),
        "on_keyup": this.keyup.bind(this)
      },
      {
        "keys": 'a',
        "is_exclusive": true,
        "on_keydown": this.keydown.bind(this),
        "on_keyup": this.keyup.bind(this)
      },
      {
        "keys": 's',
        "is_exclusive": true,
        "on_keydown": this.keydown.bind(this),
        "on_keyup": this.keyup.bind(this)
      },
      {
        "keys": 'd',
        "is_exclusive": true,
        "on_keydown": this.keydown.bind(this),
        "on_keyup": this.keyup.bind(this)
      },
    ]);
  }
  keydown(event) {
    if (!this.keys[event.keyCode]) {
      this.keys[event.keyCode] = new Key(event.keyCode);
    }
    this.keys[event.keyCode].keyDown();
  }
  keyup(event) {
    if (!this.keys[event.keyCode]) {
      this.keys[event.keyCode] = new Key(event.keyCode);
    }
    this.keys[event.keyCode].keyUp();
  }
  isKeyDown(keyCode) {
    if (this.keys[keyCode]) {
      return this.keys[keyCode].isDown;
    }
    return false;
  }
  poll(cb) {
    cb();
  }
}
