var wtnb = {};
wtnb.classes_ = [
    aqua.widget.WidgetBase,
    aqua.widget.TextBase,
    aqua.widget.Text,
    aqua.widget.URL,
    aqua.widget.ComboBox
];

wtnb.classNames_ = [
    'aqua.widget.WidgetBase',
    'aqua.widget.TextBase',
    'aqua.widget.Text',
    'aqua.widget.URL',
    'aqua.widget.ComboBox'
];

wtnb.getClassName = function(instance) {
  var n = wtnb.classes_.indexOf(instance.constructor);
  return n >= 0 ? wtnb.classNames_[n] : '';
};

wtnb.getAncestorNames = function(instance) {
  var names = [];
  var name = wtnb.getClassName(instance);
  if (name) {
    names.push(name);

    var c = instance;
    while (c.constructor && c.constructor.superClass_) {
      c = c.constructor.superClass_;
      name = wtnb.getClassName(c);
      if (!name) {
        break;
      }
      names.push(name);
    }
  }
  return names;
};
