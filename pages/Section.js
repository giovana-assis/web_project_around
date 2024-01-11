export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderInitialCards() {
    this._items.forEach(this.addItem);
  }

  addItem = (item) => {
    const renderedElement = this._renderer(item);
    this._container.prepend(renderedElement);
  };
}
