
import { useEffect, useRef, useState } from 'react';
import './App.css'
import useFetch from './hooks/useFetch';
import getRandomNumber from './services/getRandomNumber';
import LocationInfo from './components/LocationInfo';
import ResidentCard from './components/ResidentCard';

function App() {


  const [randomId, setRandomId] = useState(getRandomNumber(126));

  const url = `https://rickandmortyapi.com/api/location/${randomId}`;
  const [location, getLocation, hasError] = useFetch(url);

  useEffect(( ) => {
    getLocation()
  }, [randomId]);

  const inputId = useRef();

  const handleSubmit = e => {
    e.preventDefault()
    setRandomId(inputId.current.value.trim())
  };
  
  return (
    <div>
      <h1 className='title'>Rick and Morty</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input className='form__input' ref={inputId} type="text" />
        <button className='form__button'>Search</button>
      </form>
      {hasError ? (
        <h2>❌ Hey! you must provide an id 1 to 126</h2>
      ) : (
        <>
          <LocationInfo location={location} />
      <div className='card__container'>
        {location?.residents.map((url) => (
            <ResidentCard key={url} url={url} />
          ))}
      </div>
      </>
      )}
    </div>
  );
}

export default App
