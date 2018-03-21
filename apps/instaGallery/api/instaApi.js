export const getUser = userName => fetch(`https://www.instagram.com/${userName}/?__a=1`)
    .then(response => response.json())
    .catch((error) => {
      throw error;
    });

export const getPhotos = (userId, endCursor) => fetch(`https://instagram.com/graphql/query/?query_id=17888483320059182&id=${userId}&first=12&after=${endCursor}`)
    .then(response => response.json())
    .catch((error) => {
      throw error;
    });
