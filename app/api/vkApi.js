import fetchJsonp from 'fetch-jsonp';

export const getUser = userId => fetchJsonp(`https://api.vk.com/method/users.get?user_ids=${userId}&fields=bdate&v=5.67`)
    .then(response => response.json())
    .catch((error) => {
      throw error;
    });


export const getPhotos = (userId, offset, count, album) => fetchJsonp(`https://api.vk.com/method/photos.get?owner_id=${userId}&album_id=${album}&rev=1&extended=1&offset=${offset}&count=${count}`)
    .then(response => response.json())
    .catch((error) => {
      throw error;
    });

export const getFreinds = userId => fetchJsonp(`https://api.vk.com/method/friends.get?user_id=${userId}&order=hints&fields=photo_50&v=5.67`)
    .then(response => response.json())
    .catch((error) => {
      throw error;
    });
