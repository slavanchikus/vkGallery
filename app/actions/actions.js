export const userRequest = inputValue => ({
  type: 'USER_REQUEST',
  inputValue,
});

export const photoRequest = (userId, offset, count) => ({
  type: 'PHOTOS_REQUEST',
  userId,
  offset,
  count,
});

export const sortByLikes = () => ({
  type: 'PHOTOS_SORT_LIKES',
});

export const sortByComments = () => ({
  type: 'PHOTOS_SORT_COMMENTS',
});
