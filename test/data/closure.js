// form base.js in Closure Library
var goog = {};
/**
 * Inherit the prototype methods from one constructor into another.
 *
 * Usage:
 * <pre>
 * function ParentClass(a, b) { }
 * ParentClass.prototype.foo = function(a) { };
 *
 * function ChildClass(a, b, c) {
 *   ChildClass.base(this, 'constructor', a, b);
 * }
 * goog.inherits(ChildClass, ParentClass);
 *
 * var child = new ChildClass('a', 'b', 'see');
 * child.foo(); // This works.
 * </pre>
 *
 * @param {Function} childCtor Child class.
 * @param {Function} parentCtor Parent class.
 */
goog.inherits = function(childCtor, parentCtor) {
  /** @constructor */
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  /** @override */
  childCtor.prototype.constructor = childCtor;

  /**
   * Calls superclass constructor/method.
   *
   * This function is only available if you use goog.inherits to
   * express inheritance relationships between classes.
   *
   * NOTE: This is a replacement for goog.base and for superClass_
   * property defined in childCtor.
   *
   * @param {!Object} me Should always be "this".
   * @param {string} methodName The method name to call. Calling
   *     superclass constructor can be done with the special string
   *     'constructor'.
   * @param {...*} var_args The arguments to pass to superclass
   *     method/constructor.
   * @return {*} The return value of the superclass method/constructor.
   */
  childCtor.base = function(me, methodName, var_args) {
    var args = Array.prototype.slice.call(arguments, 2);
    return parentCtor.prototype[methodName].apply(me, args);
  };
};

var aqua = {};
aqua.widget = aqua.widget || {};


/**
 * @param {string} widget name.
 * @constructor
 */
aqua.widget.WidgetBase = function(name) {
  this.name_ = name;
};
aqua.widget.WidgetBase.toString = function() {
  return '[widget ' + this.name_ + ']';
};

/**
 * @constructor
 * @extends {aqua.widget.WidgetBase}
 */
aqua.widget.TextBase = function() {
  aqua.widget.WidgetBase.call(this, 'TextBase');
};
goog.inherits(aqua.widget.TextBase, aqua.widget.WidgetBase);

/**
 * @constructor
 * @extends {aqua.widget.TextBase}
 */
aqua.widget.Text = function() {
  aqua.widget.WidgetBase.call(this, 'Text');
};
goog.inherits(aqua.widget.Text, aqua.widget.TextBase);

/**
 * @constructor
 * @extends {aqua.widget.TextBase}
 */
aqua.widget.URL = function() {
  aqua.widget.WidgetBase.call(this, 'URL');
};
goog.inherits(aqua.widget.URL, aqua.widget.TextBase);

/**
 * @constructor
 * @extends {aqua.widget.WidgetBase}
 */
aqua.widget.ComboBox = function() {
  aqua.widget.WidgetBase.call(this, 'ComboBox');
};
goog.inherits(aqua.widget.ComboBox, aqua.widget.WidgetBase);
