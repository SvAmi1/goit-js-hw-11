import axios from 'axios'
export const fetchImgs = async (searchQuery, page, perPage) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: '38225856-55cf092e00195e84cd316d5f4',
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
  });
  const resp = await axios.get(`${BASE_URL}?${params.toString()}`);
  return resp;
};