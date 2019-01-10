import { SubmissionError } from 'redux-form/immutable';
import targetApi from 'api/targetApi';
import * as types from './actionTypes';
import { genericError } from './commonActions';

export const startNewTarget = newTarget => ({
  type: types.START_NEW_TARGET,
  newTarget
});

export const endNewTarget = () => ({
  type: types.END_NEW_TARGET,
});

export const createTargetSuccess = target => ({
  type: types.CREATE_TARGET_SUCCESS,
  target
});

export const getTargetsSuccess = targets => ({
  type: types.GET_TARGETS_SUCCESS,
  targets
});

export const getTopicsSuccess = topics => ({
  type: types.GET_TOPICS_SUCCESS,
  topics
});

export const createTarget = target => dispatch =>
  targetApi.createTarget(target).then(({ target }) => {
    dispatch(createTargetSuccess(target));
  }).catch(({ errors, error }) => {
    if (errors.user) {
      throw new SubmissionError({ _error: errors.user });
    } else {
      throw new SubmissionError(typeof errors === 'object' ? errors : { _error: errors || error });
    }
  });

export const getTopics = () => dispatch =>
  targetApi.getTopics().then(({ topics }) => {
    dispatch(getTopicsSuccess(topics));
  }).catch(() => {
    dispatch(genericError('topics.api.error'));
  });

export const getTargets = () => dispatch =>
  targetApi.getAll().then(({ targets }) => {
    dispatch(getTargetsSuccess(targets));
  }).catch(() => {
    dispatch(genericError('targets.api.error'));
  });

export const selectTarget = target => ({
  type: types.SELECT_TARGET,
  target
});

export const deleteTarget = target => ({
  type: types.DELETE_TARGET,
  target
});

export const endSelectedTarget = () => ({
  type: types.END_SELECT_TARGET
});
