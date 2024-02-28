import { useContext } from 'react'
import { AppContext } from '~/context'
import { Spin } from 'antd';

const Loading = () => {
    const { spinner } = useContext(AppContext)
    return (
        (spinner.visible()) && <Spin size="large" fullscreen />
    )
}

export default Loading