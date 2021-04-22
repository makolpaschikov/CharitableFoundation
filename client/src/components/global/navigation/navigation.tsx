import {Link} from 'react-router-dom'
import a from 'asd'

export const NAVIGATION_PADDING = 'pt-16'
const NAVIGATION_ITEMS: {label: string; target: string}[] = [
    {label: 'Каталог товаров', target: '/catalog'},
    {label: 'О фонде', target: '/about'},
    {label: 'Контакты', target: '/contacts'},
    {label: 'Личный кабинет', target: '/profile'},
]

export const Navigation = () => (
    <nav className={'fixed inset-x-0 top-0 h-16 bg-gray-400'}>
        <div className={'container flex h-full'}>
            {NAVIGATION_ITEMS.map(({label, target}) => (
                <Link
                    className={
                        'flex-1 h-full flex justify-center items-center ' +
                        'hover:bg-hover active:bg-active duration-75'
                    }
                    to={target}
                >
                    {label}
                </Link>
            ))}
        </div>
    </nav>
)
