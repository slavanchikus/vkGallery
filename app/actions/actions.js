export const tokenRequest = () => ({
  type: 'TOKEN_REQUEST',
});

export const userRequest = inputValue => ({
  type: 'USER_REQUEST',
  inputValue,
});

export const friendsRequest = userId => ({
  type: 'FRIENDS_REQUEST',
  userId,
});

export const photoRequest = (userId, offset, count, album) => ({
  type: 'PHOTOS_REQUEST',
  userId,
  offset,
  count,
  album
});

export const sortByLikes = () => ({
  type: 'PHOTOS_SORT_LIKES',
});

export const sortByComments = () => ({
  type: 'PHOTOS_SORT_COMMENTS',
});

export const pickAlbum = album => ({
  type: 'PICK_ALBUM',
  album
});
