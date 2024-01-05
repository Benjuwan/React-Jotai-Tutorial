import { useAtom } from 'jotai'
import { Radio } from 'antd'
import { filterAtom } from './ts/atom'

export const Filter = () => {
    // filterAtomをfilterに代入
    const [filter, setFilter] = useAtom(filterAtom)

    return (
        // 各ラジオボタンが押されるたびにsetFilterで値をFilterにセットする
        <Radio.Group onChange={(e) => setFilter(e.target.value as string)} value={filter}>
            <Radio value="all">All</Radio>
            <Radio value="completed">Completed</Radio>
            <Radio value="incompleted">Incompleted</Radio>
        </Radio.Group>
    )
}