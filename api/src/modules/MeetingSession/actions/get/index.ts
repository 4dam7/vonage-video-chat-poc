import { Request, Response } from 'express';

import { logger } from '../../../../utils';
import MeetingSessionService from '../../services';

const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const meetingSessionObject = await MeetingSessionService.findById(id);

    if (!meetingSessionObject) {
      return res.status(404).send();
    }

    return res.status(200).send(meetingSessionObject);
  } catch (err) {
    logger.error(err);
    return res.status(400).send();
  }
};

export default get;
