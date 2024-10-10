import { useEffect, useState } from 'react'
import './styles/Pagination.css'

const Pagination = ({countPoke, page, setPage, pokePerPage, block, setBlock}) => {
  
  const pagesPerBlock = 5
  const countPages = Math.ceil(countPoke / pokePerPage)
  let i = block * pagesPerBlock - pagesPerBlock + 1
  const arrPages = []
  while(i <= countPages && i <= block * pagesPerBlock) {
    arrPages.push(i)
    i++
  }

  useEffect(() => {
    if(page > block * pagesPerBlock) {
      setBlock(e => e + 1)
    }
    if(page < block * pagesPerBlock - pagesPerBlock + 1) {
      setBlock(e => e - 1)
    }
  }, [page])

  const handlePrev = () => {
    setPage(e => e - 1 > 0 ? e - 1 : e)
  }

  const handlePage = (newPage) => {
    setPage(newPage)
  }

  const handleNext = () => {
    setPage(e => e + 1 <= countPages ? e + 1 : e)
  }

  return (
    <>
      {
        arrPages.length > 1 &&
        <div className='pagination'>
          <div onClick={handlePrev} className='pagination__arrow active__page'>&lt;</div>
          <ul className='pagination__list'>
            {
              arrPages.map(pageNumber => (
                <li 
                  className={`pagination__page ${pageNumber === page && 'active__page'}`} 
                  key={pageNumber}
                  onClick={() => handlePage(pageNumber)}
                >{pageNumber}</li>)
              )
            }
          </ul>
          <div onClick={handleNext} className='pagination__arrow active__page'>&gt;</div>
        </div>
      }
    </>
  )
}

export default Pagination