import axios from "axios";

import {
  COMICS_REQUEST_FAILURE,
  COMICS_REQUEST_PENDING,
  COMICS_REQUEST_SUCCESS,
  IS_API_CALL,
} from "./type";

export const loadComic = () => {
  return {
    type: COMICS_REQUEST_PENDING,
  };
};

export const setComic = (comics) => {
  return {
    type: COMICS_REQUEST_SUCCESS,
    comics,
  };
};

export const failComic = (error) => {
  return {
    type: COMICS_REQUEST_FAILURE,
    error,
  };
};

export const comicAPI = (increment, number) => {
  return (dispatch) => {
    dispatch(loadComic());
    axios
      .get(
        `https://gateway.marvel.com/v1/public/comics?limit=${increment}&offset=${number}&ts=1&hash=866ddc8bf8343c53f45a710a0deb34c0&apikey=8b0c1cf5084a6b18d0034b1096ece30d`
      )
      .then((res) => {
        let comicData = res.data.data.results;
        dispatch(setComic(comicData));
        return res.data;
      })
      .catch((err) => {
        dispatch(failComic(err));
      });
  };
};
