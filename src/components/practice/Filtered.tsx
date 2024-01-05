import { useAtom } from 'jotai'
import { a, useTransition } from 'react-spring'
import { filteredAtom } from './ts/atom'
import { RemoveFn, TodoItem } from './TodoItem'

type FilteredType = {
    remove: RemoveFn;
}

export const Filtered = (props: FilteredType) => {
    // 現在のfilterを考慮して表示するべきtodosを格納
    const [todos] = useAtom(filteredAtom)

    // react-springの機能。動きを持たせてくれる。
    const transitions = useTransition(todos, {
        keys: (todo) => todo.toString(),
        from: { opacity: 0, height: 0 },
        enter: { opacity: 1, height: 40 },
        leave: { opacity: 0, height: 0 },
    })

    return transitions((style, atom) => (
        <a.div className="item" style={style}>
            <TodoItem atom={atom} {...props} />
        </a.div>
    ))
}