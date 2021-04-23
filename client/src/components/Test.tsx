import {FC, useEffect, useState} from 'react'

type Result =
    | {
          status: 'pending'
          data: null
      }
    | {
          status: 'error' | 'done'
          data: string
          statusCode: number
      }

export const Test: FC = () => {
    const [data, setData] = useState<Result>({status: 'pending', data: null})

    useEffect(() => {
        async function request() {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({login: 'abc', password: '123456'}),
            })
            try {
                const json = await response.json()
                setData({
                    status: response.ok ? 'done' : 'error',
                    data: JSON.stringify(json, null, 2),
                    statusCode: response.status,
                })
            } catch (e) {
                setData({
                    status: 'error',
                    data: 'Ответ не пришёл или пришёл не в формате json',
                    statusCode: -1,
                })
            }
        }
        request()
    }, [])

    if (data.status === 'pending') {
        return <div>Загрузка...</div>
    }

    return (
        <div>
            <div>{data.status === 'error' ? 'Ошибка' : 'Все норм'}</div>
            {data.statusCode > 0 && <div>Статус {data.statusCode}</div>}
            <pre>{data.data}</pre>
        </div>
    )
}
