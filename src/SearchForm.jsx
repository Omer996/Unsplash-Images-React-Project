import React from 'react'
import { useGlobalContext } from './context'

const SearchForm = () => {

  const {setSearchTerm} = useGlobalContext()

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.search.value)
    const searchValue = e.target.elements.search.value;
    if (!searchValue) {
      return;
    }
    setSearchTerm(searchValue);

  }
  return (
    <section>
      <h1 className='title'>
        <span>Unsplash Images</span>
        <form onSubmit={onSubmit} className='search-form'>
          <input type="text" className='form-input search-input' name = "search" placeholder='Search Images' />
          <button type="submit" className='btn'>Search</button>
        </form>
      </h1>
    </section>
  )
}

export default SearchForm
