import { Document, model, Schema, SchemaTypes } from 'mongoose';

import { MeetingSession as MeetingSessionType } from '../../../typings';

const meetingSessionSchema = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
    },
    sessionId: {
      type: SchemaTypes.String,
      required: true,
    },
    scheduledAt: {
      type: SchemaTypes.String,
      required: true,
    },
    clientFirstName: {
      type: SchemaTypes.String,
      required: true,
    },
    clientLastName: {
      type: SchemaTypes.String,
      required: true,
    },
    sellerFirstName: {
      type: SchemaTypes.String,
      required: true,
    },
    sellerLastName: {
      type: SchemaTypes.String,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

export interface MeetingSessionDocument
  extends Omit<MeetingSessionType, 'id'>,
    Document {}

const MeetingSession = model<MeetingSessionType>(
  'MeetingSessionCollection',
  meetingSessionSchema,
);

export default MeetingSession;
