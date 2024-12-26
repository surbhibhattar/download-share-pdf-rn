/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import ShareExample1 from './ShareExample1';
import ShareExample3 from './ShareExample3';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => ShareExample1);
// AppRegistry.registerComponent(appName, () => ShareExample3);

