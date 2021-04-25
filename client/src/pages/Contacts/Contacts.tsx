import {FC, ReactNode} from 'react'
import {YMaps, Map, Placemark} from 'react-yandex-maps'
import directorImg from 'src/img/director.jpg'

const CONTACTS = [
    {
        label: 'Юридический адрес',
        value: '123308 Москва, Хорошевское ш. д.43 г, стр.8, пом.16',
    },
    {
        label: 'Фактический адрес',
        value: '123308 Москва, Хорошевское ш. д.43 г, стр.8, пом.16',
    },
    {
        label: 'Телефон',
        value: <a href="tel:+74953800229">+7 (495) 380-02-29</a>,
    },
    {
        label: 'Телефон',
        value: <a href="mailto:info@fondzdrav.ru">info@fondzdrav.ru</a>,
    },
    {
        label: 'Телефон',
        value: <a href="https://www.fondzdrav.ru">www.fondzdrav.ru</a>,
    },
]

export const Contacts: FC = () => (
    <div className={'px-16 pt-8'}>
        <h1 className={'text-lg font-bold mb-8'}>
            Благотворительный фонд «Национальный фонд помощи медицинским
            учреждениям Фондздрав»
        </h1>
        <div className={'flex flex-col lg:flex-row mb-12'}>
            <div className={'mb-4 lg:mb-0 lg:flex-1'}>
                <h2 className={'text-lg font-bold mb-4'}>Контакты</h2>
                {CONTACTS.map((contact, i) => (
                    <Contact key={i} {...contact} />
                ))}
            </div>
            <div
                className={
                    'lg:ml-6 bg-white shadow-xl rounded-3xl px-8 py-6 lg:flex-1'
                }
            >
                <img
                    className={'float-right rounded-md ml-4'}
                    alt={'Светлана Викторовна Молль'}
                    src={directorImg}
                />
                <h2 className={'text-lg font-bold mb-4'}>Директор фонда</h2>
                <p className={'mb-2'}>Светлана Викторовна Молль</p>
                <p>
                    Окончила МГУ им. М.В. Ломоносова и РЭА им. Г.В. Плеханова,
                    Российский Новый открытый университет. Работала
                    руководителем Центра социально-психологической помощи детям
                    и подросткам, возглавляла маркетинг, рекламу и PR в ряде
                    медицинских организаций. Возглавила Фонд в феврале 2013
                    года.
                </p>
            </div>
        </div>
        <div className={'overflow-hidden rounded-lg mb-32'}>
            <YMaps>
                <Map
                    width={'100%'}
                    height={'600px'}
                    defaultState={{center: [55.776214, 37.509947], zoom: 15}}
                >
                    <Placemark geometry={[55.776214, 37.509947]} />
                </Map>
            </YMaps>
        </div>
    </div>
)

const Contact: FC<{label: string; value: ReactNode}> = ({label, value}) => (
    <div className={'mb-2 flex '}>
        <div className={'w-32 text-sm font-bold'}>{label}:</div>
        <div className={'flex-1'}>{value}</div>
    </div>
)
