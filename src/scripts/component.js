export default class Component {
  constructor(domElement, mapEventsToHandlers = {}, deps = {}) {
      this.domElement = domElement;
      this.deps = deps;

      for (const event in mapEventsToHandlers) {
          this.domElement.addEventListener(event, mapEventsToHandlers[event]);
      }
  }
}
