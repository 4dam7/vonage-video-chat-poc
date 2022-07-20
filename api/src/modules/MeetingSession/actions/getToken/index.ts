import { Request, Response } from 'express';

import { logger } from '../../../../utils';
import openTok from '../../../../services/openTok';
import MeetingSessionService from '../../services';

interface RequestBody {
  meetingSessionId: string;
  userName: string;
}

const getToken = async (req: Request, res: Response) => {
  try {
    const { meetingSessionId, userName }: RequestBody = req.body;

    const meetingSessionObject = await MeetingSessionService.findById(
      meetingSessionId,
    );

    if (!meetingSessionObject) {
      return res.status(404).send();
    }

    const token = openTok.generateToken(meetingSessionObject.sessionId, {
      role: 'publisher',
      expireTime: new Date().getTime() / 1000 + 7 * 24 * 60 * 60, // in one week
      data: JSON.stringify({ userName }),
      initialLayoutClassList: ['focus'],
    });
    return res.status(200).send({ token });
  } catch (err) {
    logger.error(err);
    return res.status(400).send();
  }
};

export default getToken;
