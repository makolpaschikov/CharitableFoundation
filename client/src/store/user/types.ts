import {LoadingStatus} from 'src/util/loading-status'

export type User = {
    id: string
    email: string
}
export type UserState =
    | {
          status: LoadingStatus.NONE | LoadingStatus.PENDING
      }
    | {
          status: LoadingStatus.ERROR | LoadingStatus.RETRYING
          error: string
      }
    | {
          status: LoadingStatus.SUCCESS
          user: null | User
      }
