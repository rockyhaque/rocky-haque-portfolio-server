interface Author {
  name: string
  img: string
  email: string
}

export interface IBlog {
  title: string
  image: string
  content: string
  author: Author
  isPublished: boolean
  readingTime: number
}
