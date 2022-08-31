import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/?key=';
const API_KEY = '29562775-0cedab5e27dd705c115fa7ca4';
const OPTIONS =
  '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

export async function getUser(name, page) {
  const response = await axios.get(
    `${BASE_URL}${API_KEY}&q=${name}${OPTIONS}&page=${page}`
  );

  return response;
}
