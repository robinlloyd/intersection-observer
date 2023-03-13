import { useEffect, useState, useRef, useCallback } from 'react'

import useBookSearch from '@src/hooks/use_book_search'

export default function Home() {
  const [pageNumber, setPageNumber] = useState(1)

  const { books, loading, hasMore } = useBookSearch(pageNumber)

  const observer = useRef() // Undefined by default
  const lastBookElementRef = useCallback(node => { // Called every time last element is created
    // node is last element
    if (loading) return
    if (observer.current) observer.current.disconnect() // Disconnect previous observer
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        console.log('Visible')
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node) // Observe last element
  }, [loading, hasMore])

  const itemStyle = {
    background: 'green',
    height: '400px'
  }

  return (
    <>
      <main>
        <h1>Results</h1>
        <ol>
          {books.map((book, index) => {
            if (books.length === index + 1) {
              return <li style={itemStyle} ref={lastBookElementRef} key={book}>{book}</li>
            }
            return <li style={itemStyle} key={book}>{book}</li>
          })}
        </ol>
        <div>{loading && 'Loading...'}</div>
      </main>
    </>
  )
}
