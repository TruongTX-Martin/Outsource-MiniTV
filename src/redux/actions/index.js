import * as authActions from './authActions';
import * as liveActions from './liveActions';
import * as myPageActions from './myPageActions';
import * as channelActions from './channelActions';

export const ActionCreators = Object.assign(
  {},
  authActions,
  liveActions,
  myPageActions,
  channelActions
);
