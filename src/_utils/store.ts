class Store {
  $scene: any;
  $mapContext: any;
  constructor() {
    // @ts-ignore
    const app = getApp();
    this.$scene = app.$scene;
    this.$mapContext = app.$mapContext;
  }
  //TODO
  setScene(scene) {
    this.$scene = scene;
  }

  //TODO
  setMapContext(mapContext) {
    this.$mapContext = mapContext;
  }
}

export default new Store();
