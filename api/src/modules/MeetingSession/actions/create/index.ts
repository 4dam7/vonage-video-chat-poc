import { Request, Response } from 'express';
import { Session } from 'opentok';

import { logger, sleep } from '../../../../utils';
import { MeetingSession } from '../../../../typings';
import openTok from '../../../../services/openTok';

import MeetingSessionService from '../../services';

interface RequestBody {
  name: string;
  scheduledAt: number;

  clientFirstName: string;
  clientLastName: string;

  sellerFirstName: string;
  sellerLastName: string;
}

const waitForSessionUpdate = async (
  scheduledAt: number,
): Promise<MeetingSession | undefined> => {
  let session: MeetingSession;
  const promises = Array(10)
    .fill(0)
    .map(async (_, idx) => {
      if (idx !== 0) {
        await sleep(1000);
      }
      const res = await MeetingSessionService.findOne({ scheduledAt });
      return res;
    });

  // eslint-disable-next-line no-restricted-syntax
  for await (const res of promises) {
    if (res) {
      session = res;
      break;
    }
  }

  return session;
};

const create = async (req: Request, res: Response) => {
  try {
    const { body }: { body: RequestBody } = req;

    openTok.createSession({}, (err: Error | null, session: Session) => {
      if (err) {
        throw new Error(`${err.name}: ${err.message}`);
      }

      MeetingSessionService.create({
        name: body.name,

        scheduledAt: body.scheduledAt,

        clientFirstName: body.clientFirstName,
        clientLastName: body.clientLastName,
        sellerFirstName: body.sellerFirstName,
        sellerLastName: body.sellerLastName,

        sessionId: session.sessionId,
      })
        .then(() => {
          logger.info(`SESSION ${session.sessionId} CREATED`);
        })
        .catch(() => {});
    });

    const session = await waitForSessionUpdate(body.scheduledAt);

    if (!session) {
      throw new Error('Meeting session creation failed');
    }

    return res.status(200).send(session);
  } catch (err) {
    logger.error(err);
    return res.status(400).send();
  }
};

export default create;
