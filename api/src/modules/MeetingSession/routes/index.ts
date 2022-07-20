import { Route } from '../../../typings';

import meetingSessionRouter from './meetingSession';

const routes: Route[] = [
  { path: '/meetingsession', router: meetingSessionRouter },
];

export default routes;
