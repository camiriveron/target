import { Iterable } from 'immutable';
import queryString from 'query-string';
import isEmpty from 'lodash/isEmpty';

export const parseErrors = (error) => {
  if (!error) {
    return;
  }

  if (typeof error === 'object') {
    error = Object.values(error);
  }

  if (Iterable.isIterable(error)) {
    return error.first();
  } else if (Array.isArray(error)) {
    return error[0];
  }
  return error;
};

export const getTopicIcon = (topics, topicId) => {
  let topic = null;

  if (topics) {
    topic = topics.find(topic => topic.topic.id == topicId);
  }
  return topic ? topic.topic.icon : '';
};

export const applyQueryParams = (url, params = {}) => {
  if (isEmpty(params)) {
    return url;
  }
  const queryParams = queryString.stringify(params);
  return `${url}?${queryParams}`;
};
