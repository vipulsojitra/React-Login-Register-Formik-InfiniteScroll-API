import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { comicAPI } from "../Redux/comic/action";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [comicOffset, setComicOffset] = useState(1);

  const { comic } = useSelector((state) => state.comic);

  useEffect(() => {
    dispatch(comicAPI(8, comicOffset));
  }, [comicOffset]);

  const handleScrollEnd = () => {
    setComicOffset(comicOffset + comicOffset);
  };

  window.onscroll = function () {
    let scrollingDown =
      document.documentElement.scrollTop <
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    if (scrollingDown === false) {
      handleScrollEnd();
    }
  };

  const comicDetail = (e, data) => {
    history.push("/comicPage", data);
  };

  return (
    <div className="container">
      <div className="row">
        {comic &&
          comic.map((comic, index) => (
            <div key={index} className="col-md-3">
              <div className="mb-5" onClick={(e) => comicDetail(e, comic)}>
                <div className="card">
                  <img
                    style={{ height: "300px", textAlign: "center" }}
                    className="card-img-top"
                    src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                    alt="comic"
                  />
                  <div className="card-body">
                    <p className="card-text">
                      {comic.title}/{comic.id}/{index}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
