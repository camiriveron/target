import matchesApi from 'api/matchesApi';
import * as types from './actionTypes';
import { genericError } from './commonActions';

export const getMatchesSuccess = matches => ({
  type: types.GET_MATCHES_SUCCESS,
  matches
});

export const getMatches = () => dispatch =>
  matchesApi.getAll().then(({ matches }) => {
    dispatch(getMatchesSuccess(matches));
  }).catch(() => {
    dispatch(genericError('matches.api.error'));
  });
