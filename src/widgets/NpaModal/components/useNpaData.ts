import { useMemo } from "react"


interface UseNpaDataParams {
  searchTerm: string
  currentPage: number
  pageSize: number
}

export const useNpaData = ({
  searchTerm,
  currentPage,
  pageSize
}: UseNpaDataParams) => {
  const allNpaItems = useMemo(() => 
    Array.from({ length: 200 }, (_, i) => ({
      id: `npa-${i + 1}`,
      label: `${categories[i % categories.length]} № ${(i + 1).toString().padStart(3, '0')}`,
      category: categories[i % categories.length]
    }))
  , [])

  const filteredItems = useMemo(() => 
    allNpaItems.filter(item => 
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  , [allNpaItems, searchTerm])

  const totalPages = Math.ceil(filteredItems.length / pageSize)
  const paginatedItems = useMemo(() => 
    filteredItems.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  , [filteredItems, currentPage, pageSize])

  return { filteredItems, totalPages, paginatedItems }
}

const categories = ['Федеральные законы', 'Постановления', 'СанПиНы', 'ГОСТы']