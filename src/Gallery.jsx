import React from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useGlobalContext } from './context';


const url = "https://api.unsplash.com/search/photos?client_id=FwmjzSAwWUKcXnRaP9VD30XKXpGNulpHg5VAO_H3Hjc"

const Gallery = () => {
  const { searchTerm }   = useGlobalContext();

  const response = useQuery({
    queryKey: ['images', searchTerm],
    queryFn: async () =>{
      const result = await axios.get(`${url}&query=${searchTerm}`)
      return result.data;
    }
  })

  if(response.isLoading)
  {
    return(
      <section className='image-container'>
            <h1>Loading...</h1>
      </section>
    );
  }

  if(response.isError)
  {
    return(
      <section className='image-container'>
            <h1>Something Went Wrong</h1>
      </section>
    );
  }


  const results = response.data.results;
  if(results.length < 1){
    return(
      <section className='image-container'>
            <h1>No Images Found</h1>
      </section>
    );
  }



  return (
    <section className='image-container'>
        {results.map((item) =>{
          const url = item?.urls?.regular;
          return(
            <div key={item.id}>
              <img src={url} alt={item.alt_description} className='img' />
            </div>
          )
        })}
      
    </section>
  )
}

export default Gallery
