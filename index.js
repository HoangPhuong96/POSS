/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/';
import {name as appName} from './app.json';
import {checkAppMode} from './src/res/colors';
console.disableYellowBox = true;
checkAppMode()
AppRegistry.registerComponent(appName, () => App);
