import { Router } from 'express';
import { createAction, getTokenAction, getAction } from '../actions';

const meetingSessionRouter = Router();

meetingSessionRouter.post('/', createAction);
meetingSessionRouter.get('/:id', getAction);
meetingSessionRouter.post('/token', getTokenAction);

export default meetingSessionRouter;
