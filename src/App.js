import React, { useEffect, useState, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";

//App Component
import Photos from "./components/Photos";
import apiKey from "./config.js";
import SearchForm from "./components/SearchForm";
import PageNotFound from "./components/PageNotFound";


function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);    //using for display loading message when loading
  let navigate = useNavigate();

  const fetchDefData = (response,name) => {
      setPhotos((list)=> [
        ...list,{
          name: name,
          data: response.data.photos.photo}
      ]);
  };

  
  const initializeData  = useCallback(async () => {
    try {
      await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sunset&per_page=24&format=json&nojsoncallback=1`)
      .then(response => fetchDefData(response,"sunset")
      );
      await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=waterfall&per_page=24&format=json&nojsoncallback=1`)
      .then(response => fetchDefData(response,"waterfall")
      );    
      await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=rainbow&per_page=24&format=json&nojsoncallback=1`)
      .then(response => fetchDefData(response,"rainbow")
      );
    } catch (error) {
      console.log("Error fetching and parsing data",error);
    }
  },[]);

  useEffect(() => {
    initializeData();
    return () => {
      //console.log('Load Finish...');  debug
    }
   }, [initializeData]) ;
 
  useEffect(() => {    
    if (query !== '') {
      setLoading(true);
      let activeFetch = true;
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then( response => {
        if (activeFetch) {
        document.title = `Images of ${query}`; 
        setPhotos((a)=> [
          ...a,{
            name: query,
            data: response.data.photos.photo}
        ]);
        let path = `search/${query}`;
        navigate(path);
        setLoading(false); 
        }
      })
      .catch( error => {
        // handle error
        console.log("Error fetching and parsing data",error);
        navigate("PagenotFound");
      });

      return () => {
        activeFetch = false;
      };      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[query]);

  const handleQueryChange = searchText => {
    setQuery(searchText);
  }
  const getPhotos = (name) => {
        //console.log(photos);
        return photos.filter(p => p.name === name);    
  };

  return (
  <div className="container">
    <Routes>
      <Route path="/" element={<SearchForm changeQuery={handleQueryChange} />} >
        <Route path="sunsets" element={<Photos name="sunset"  loading = {false} getQuery={getPhotos} />} />
        <Route path="waterfalls" element={<Photos name="waterfall" d loading = {false} getQuery={getPhotos} />} />
        <Route path="rainbows" element={<Photos name="rainbow"  loading = {false} getQuery={getPhotos} />} />
        <Route path="search/:urlName" element={<Photos name = {query}  loading={loading} getQuery={getPhotos}/> } /> 
        
      </Route>
      <Route path="*" element={<PageNotFound />} /> 
    </Routes>
  </div>

  );
}


export default App;

