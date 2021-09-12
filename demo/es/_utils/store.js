var Store = /*#__PURE__*/function () {
  function Store() {
    // @ts-ignore
    var app = getApp();
    this.$scene = app.$scene;
    this.$mapContext = app.$mapContext;
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