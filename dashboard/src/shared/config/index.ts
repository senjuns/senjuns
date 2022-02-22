import Cookies from 'js-cookie';
// import { FEATURE_ENABLED } from '../../shared/constants';
import { FEATURE_FLAGS } from '../../shared/interfaces';
// @ts-ignore Needs to be ignored as it is dynamically created.
import config from './config';

const defaultConfig: any = config;

if (Cookies.get(FEATURE_FLAGS.DEBUG) === 'FEATURE_ENABLED') {
  console.log(`process.env: ${JSON.stringify(process.env, null, 2)}`);
  console.log(`defaultConfig: ${JSON.stringify(defaultConfig, null, 2)}`);
}

export default defaultConfig;
