export const getUser = userName => fetch(`https://www.instagram.com/${userName}/?__a=1`)
    .then(response => response.json())
    .catch((error) => {
      throw error;
    });

export const getPhotos = (userName, endCursor) => fetch(`https://www.instagram.com/${userName}/?__a=1&max_id=${endCursor}`)
    .then(response => response.json())
    .catch((error) => {
      throw error;
    });
