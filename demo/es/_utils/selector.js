import { ctx } from './ctx';

var Selector = /*#__PURE__*/function () {
  function Selector() {
    this._selector = ctx.createSelectorQuery();
  }

  var _proto = Selector.prototype;

  _proto.node = function node(selector) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      return _this._selector.select(selector).node(function (res) {
        return resolve(res.node);
      }).exec();
    });
  };

  _proto.fields = function fields(selector, params) {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      return _this2._selector.select(selector).fields(params, function (res) {
        return resolve(res.node);
      }).exec();
    });
  };

  return Selector;
}();

export default new Selector();