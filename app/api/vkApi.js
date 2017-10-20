export const getUser = userId => fetch(`https://api.vk.com/method/users.get?user_ids=${userId}&fields=bdate&v=5.67`)
    .then(response => response.json())
    .catch((error) => {
      throw error;
    });


export const getPhotos = (userId, offset, count) => fetch(`https://api.vk.com/method/photos.get?owner_id=${userId}&album_id=wall&rev=1&extended=1&offset=${offset}&count=${count}`)
    .then(response => response.json())
    .catch((error) => {
      throw error;
    });
