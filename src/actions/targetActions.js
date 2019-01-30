import { SubmissionError } from 'redux-form/immutable';
import targetApi from 'api/targetApi';
import * as types from './actionTypes';
import { genericError, showLoading, hideLoading } from './commonActions';
import { getMatches } from './matchesActions';

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

export const selectTarget = target => ({
  type: types.SELECT_TARGET,
  target
});

export const endSelectedTarget = () => ({
  type: types.END_SELECT_TARGET
});

export const deleteTargetSuccess = targetId => ({
  type: types.DELETE_TARGET_SUCCESS,
  targetId
});

export const createTarget = target => dispatch =>
  targetApi.createTarget(target).then(({ target }) => {
    dispatch(createTargetSuccess(target));
    dispatch(getMatches());
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

export const deleteTarget = id => (dispatch) => {
  dispatch(showLoading());

  return targetApi.deleteTarget(id).then(() => {
    dispatch(deleteTargetSuccess(id));
  }).catch(() => {
    dispatch(genericError('targets.delete.error'));
  }).finally(() => {
    dispatch(endSelectedTarget());
    dispatch(hideLoading());
  });
};
