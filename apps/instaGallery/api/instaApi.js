export const getPhotos = userName => fetch(`https://www.instagram.com/${userName}/?__a=1`)
    .then(response => response.json())
    .catch((error) => {
      throw error;
    });
