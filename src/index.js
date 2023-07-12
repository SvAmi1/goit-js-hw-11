import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const API_KEY = "38225856-55cf092e00195e84cd316d5f4";
const BASE_URL = "https://pixabay.com/api/";

axios.defaults.headers.common["x-api-key"] = API_KEY;