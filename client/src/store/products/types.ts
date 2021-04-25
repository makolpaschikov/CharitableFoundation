import {Category} from 'src/util/categories'
import {LoadingStatus} from 'src/util/loading-status'

export type Product = {
    id: number
    name: string
    description: string
    photos: string[]
}

export type CategoriesMap = Record<Category, Product[]>

export type ProductState =
    | {
          status: LoadingStatus.NONE | LoadingStatus.PENDING
      }
    | {
          status: LoadingStatus.ERROR | LoadingStatus.RETRYING
          error: string
      }
    | {
          status: LoadingStatus.SUCCESS
          categories: CategoriesMap
      }
