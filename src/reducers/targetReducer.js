import { List } from 'immutable';
import * as types from '../actions/actionTypes';
import mapInitialState from './mapInitialState';

const syncTargetsAndTopics = (targets, topics) => {
  if (targets && topics) {
    return targets.map(target => ({ ...target, topic: topics.find(topic => topic.id === target.topicId) }));
  }
};

const targetReducer = (state = mapInitialState, action) => {
  switch (action.type) {
    case types.START_NEW_TARGET: {
      return state.set('addingNewTarget', true)
        .set('newTarget', action.newTarget);
    }
    case types.END_NEW_TARGET: {
      return state.set('addingNewTarget', false);
    }
    case types.CREATE_TARGET_SUCCESS: {
      const topics = state.get('topics');

      return state.update(
        'targets',
        targetList => targetList.push({ ...action.target, topic: topics.find(topic => topic.id === action.target.topicId) })
      )
        .set('addingNewTarget', false);
    }
    case types.GET_TOPICS_SUCCESS: {
      const targets = state.get('targets');
      const topics = action.topics.map(({ topic }) => topic);

      return targets.size ?
        state.set('targets', List(syncTargetsAndTopics(targets, topics)).set('topics', topics)) :
        state.set('topics', topics);
    }
    case types.GET_TARGETS_SUCCESS: {
      const topics = state.get('topics');
      const targets = action.targets.map(({ target }) => target);

      return topics != undefined && topics.length ?
        state.set('targets', List(syncTargetsAndTopics(targets, topics))) :
        state.set('targets', List(targets));
    }
    case types.SELECT_TARGET: {
      return state.set('selectedTarget', action.target);
    }
    case types.END_SELECT_TARGET: {
      return state.set('selectedTarget', null);
    }
    case types.DELETE_TARGET_SUCCESS: {
      return state.update('targets', targetList => targetList.filterNot(target => target.id === action.targetId));
    }
    default:
      return state;
  }
};

export default targetReducer;
