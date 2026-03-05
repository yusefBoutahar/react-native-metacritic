const React = require("react");

const StyledComponent = ({ component: Component, children, className, ...props }) => {
  return React.createElement(Component, props, children);
};

const NativeWindStyleSheet = {
  create: () => {},
  setOutput: () => {},
};

const styled = (component) => component;

module.exports = {
  StyledComponent,
  NativeWindStyleSheet,
  styled,
};
