import { PrimitiveAtom, useAtom } from 'jotai'
import { CloseOutlined } from '@ant-design/icons'
import { Todo } from './ts/atom'

// todoを消去する関数の型を宣言
export type RemoveFn = (item: PrimitiveAtom<Todo>) => void;

// TodoItemは状態とatom自身を消去する型を持つ
type TodoItemProps = {
    atom: PrimitiveAtom<Todo>
    remove: RemoveFn
}

export const TodoItem = ({ atom, remove }: TodoItemProps) => {
    // 引数で与えられたatomをitemに格納
    const [item, setItem] = useAtom(atom)

    // 元のtodoからcompletedの値だけを逆にする
    const toggleCompleted = () => setItem((todo) => ({ ...todo, completed: !todo.completed }))

    return (
        <>
            {/* チェックボックスの描画 */}
            <input type="checkbox" checked={item.completed} onChange={toggleCompleted} />

            {/* completedの値によって取り消し線を描画 */}
            <span style={{ textDecoration: item.completed ? 'line-through' : '' }}>{item.title}</span>

            {/* 消去ボタン。UIにはAnt Designを使用 */}
            <CloseOutlined onClick={() => remove(atom)} />
        </>
    )
}