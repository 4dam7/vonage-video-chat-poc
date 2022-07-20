import Mongoose from 'mongoose';

import { MeetingSessionDocument, MeetingSessionModel } from '../models';
import { MeetingSession as MeetingSessionType } from '../../../typings';

export default {
  create: (articleInfos: Omit<MeetingSessionType, 'id'>) => {
    const newArticle = MeetingSessionModel.create(articleInfos);
    return newArticle;
  },
  find: async (filter = {}) => {
    const article = MeetingSessionModel.find(filter);
    return article;
  },
  findOne: async (
    filter: Mongoose.FilterQuery<MeetingSessionDocument> = {},
  ) => {
    const article = MeetingSessionModel.findOne(filter);
    return article;
  },
  findById: async (id: string) => {
    const article = MeetingSessionModel.findById(id);
    return article;
  },
  update: (
    id: string,
    articleInfos: Partial<Omit<MeetingSessionType, 'id'>>,
  ) => {
    const updateState = MeetingSessionModel.findByIdAndUpdate(
      id,
      articleInfos,
      {
        runValidators: true,
        new: true,
      },
    );
    return updateState;
  },
  delete: (id: string) => {
    const deleteState = MeetingSessionModel.findByIdAndDelete(id);
    return deleteState;
  },
};
