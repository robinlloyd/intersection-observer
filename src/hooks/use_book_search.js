import { useEffect, useState, useRef } from 'react'
import { books as booksData } from '@src/hooks/constants'

const useBookSearch = (pageNumber) => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)

  console.log('PAGE NUMBER', pageNumber)

  useEffect(() => {
    setLoading(true)

    setBooks((prevBooks => {
      return [...new Set([...prevBooks, ...booksData[pageNumber]])]
    }))
    setHasMore(pageNumber < 3)

    setLoading(false)

  }, [pageNumber])

  return { books, loading, hasMore }
}

export default useBookSearch
