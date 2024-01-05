import { atom, useAtom } from 'jotai'
import { FormEvent } from 'react'
import { Todo, todosAtom } from './ts/atom'
import { Filter } from './Filter';
import { Filtered } from './Filtered'
import { RemoveFn } from './TodoItem';

export const TodoList = () => {
    //todosAtomに値をセットする関数のみ宣言する
    const [, setTodos] = useAtom(todosAtom)

    // 引数で受け取ったtodo以外のtodoをtodosにセットする
    const remove: RemoveFn = (todo) => setTodos((prev) => prev.filter((item) => item !== todo))

    const add = (e: FormEvent<HTMLFormElement>) => {
        // submitイベントが現在のURLに対してフォームを送信することをキャンセルする
        e.preventDefault()

        // 入力を受け取る
        const title = e.currentTarget.inputTitle.value as string

        // 入力欄を空にする
        e.currentTarget.inputTitle.value = ''

        // 配列todosAtomに受け取った入力と状態(Incompleted)を格納する
        setTodos((prev) => [...prev, atom<Todo>({ title, completed: false })])
    }
    return (
        <form onSubmit={add}>
            <Filter />
            <input name="inputTitle" placeholder="Type ..." />
            <Filtered remove={remove} />
        </form>
    )
}