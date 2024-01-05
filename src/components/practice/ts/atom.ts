import { atom } from 'jotai'
import type { PrimitiveAtom } from 'jotai'

/**
 * コンポーネントの設計後に、想定できる範囲内のグローバルステートを宣言しておく（ことで無駄なステートを増やさない）
 * ステートの追記が必要な度に atom.ts に記載していく方針
*/

export type Todo = {
    title: string
    completed: boolean
}

// 現在指定されているfilterを管理するatom(赤枠)
export const filterAtom = atom('all')

// todoリストの各todoを管理するatom
export const todosAtom = atom<PrimitiveAtom<Todo>[]>([])

// filter後のtodoを管理するatom
export const filteredAtom = atom<PrimitiveAtom<Todo>[]>((get) => {
    // 現在のfilterを読み込む
    const filter = get(filterAtom)
    // 現在のtodosを読み込む
    const todos = get(todosAtom)

    // filterがallの場合は全てのtodosを返す
    if (filter === 'all') return todos
    // filterがcompletedの時は todosの各atomがcompletedなものを返す
    if (filter === 'completed') return todos.filter((atom) => get(atom).completed)
    // todosの各atomがIncompletedなものを返す
    return todos.filter((atom) => !get(atom).completed)
})