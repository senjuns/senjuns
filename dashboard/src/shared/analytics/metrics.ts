import ReactGA from 'react-ga';
import {
  MetricsMeta,
  METRICS_TYPE,
  METRICS_CATEGORY,
} from '../../shared/interfaces';

/**
 * Submit the metrics based on the metrics_type, moving forward, you can add more metrics_type and category.
 *
 * @param {METRICS_TYPE} type The metrics type.
 * @param {MetricsMeta} meta The metrics meta information.
 * @returns {void}
 */
export function submitMetrics(type: METRICS_TYPE, meta?: MetricsMeta): void {
  switch (type) {
    case METRICS_TYPE.USER_LOGIN:
      ReactGA.event({
        action: 'User Login',
        category: METRICS_CATEGORY.USER,
        dimension1: meta?.email,
      });
      break;
    case METRICS_TYPE.USER_LOGOUT:
      ReactGA.event({
        action: 'User Logout',
        category: METRICS_CATEGORY.USER,
      });
      break;
    // istanbul ignore next
    default:
      break;
  }
}
