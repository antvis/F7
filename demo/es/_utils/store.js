var Store = /*#__PURE__*/function () {
  function Store() {
    // @ts-ignore
    // const app = getApp();
    this.$scene = null;
    this.$mapContext = null;
  } //TODO


  var _proto = Store.prototype;

  _proto.setScene = function setScene(scene) {
    this.$scene = scene;
  } //TODO
  ;

  _proto.setMapContext = function setMapContext(mapContext) {
    this.$mapContext = mapContext;
  };

  return Store;
}();

export default new Store();