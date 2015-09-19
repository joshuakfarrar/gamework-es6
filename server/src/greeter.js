'use strict';

import Person from './person';

export default class Greeter {
  static greet(person) {
    if (person instanceof Person) {
      return `${person.name}`
    }
  }
}
