import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/search/photos/';

export const fetchPhotos = async (query, page) => {
  const response = await axios.get(
    '?client_id=GL9ZwMGBGbtnkzK4zruAeb174gwfMAQItvNcz-qdC4k',
    {
      params: {
        query: query,
        page,
        hitsPerPage: 10,
      },
    }
  );

  return {
    photos: response.data.results,
    totalPages: response.data.total_pages,
  };
};
