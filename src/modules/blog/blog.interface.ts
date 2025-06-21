interface Author {
  name?: string
  email?: string
  profileImage?: string
}

export interface IBlog {
  title: string
  image: string
  summary: string
  content: string
  author?: Author
  tags?: string[]
  category: string
  isPublished: boolean
  isFeatured?: boolean
  likes?: number
  views?: number
  readingTime: number
  createdAt?: Date
  updatedAt?: Date
}
