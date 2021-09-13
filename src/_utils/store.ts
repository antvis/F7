class Store {
  $scene: any;
  $mapContext: any;
  constructor() {
    // @ts-ignore
    // const app = getApp();
    this.$scene = null;
    this.$mapContext = null;
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
