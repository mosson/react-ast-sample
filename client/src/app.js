'use strict';

require("console-polyfill");
require("es5-shim/es5-shim");
require("es5-shim/es5-sham");
require('event_polyfill');

const React = require('react/addons');
const AppComponent = require('components/app_component');

React.render(<AppComponent/>, document.getElementById('App'));
