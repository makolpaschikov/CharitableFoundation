import {FC, FormEvent, ReactNode} from 'react'

export const FormContainer: FC<{
    onSubmit: (e: FormEvent<HTMLFormElement>) => unknown
    children: ReactNode
}> = ({onSubmit, children}) => (
    <div>
        <form
            onSubmit={onSubmit}
            className={'py-6 px-16 mx-12 mt-8 bg-white rounded-3xl shadow-lg'}
        >
            {children}
        </form>
    </div>
)
