import React from "react";
import { useParams } from "react-router-dom";
import Photo from "./Photo";
import NotFound from "./NotFound";

const Photos = ({ name, loading, getQuery }) => {

  let { urlName } = useParams();
  let photoList = [];
  let searchName = urlName !== undefined ? urlName : name;
  const data = getQuery(searchName);
  if (data.length > 0) {
    photoList = data[0].data;
  }
  let total = photoList.length;
 
  if (total > 0) {
    if (loading) {
      searchName = name;
    }
    let images = photoList.map((photo) => {
      let url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
      return <Photo url={url} key={photo.id} title={photo.title} />;
    });

    return (
      <div className="photo-container">
        <h2>
          <i>Images of: {searchName} </i>
        </h2>
        {loading ? <p>Loading...</p> : <ul>{images}</ul>}
      </div>
    );
  } 
  else {
    return <NotFound />;
  }
};

export default Photos;
