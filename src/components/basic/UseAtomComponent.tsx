import { Provider, atom, createStore, useAtom } from "jotai"
import { CountUpdateBtn } from "./CountUpdateBtn"



const valueAtom = atom(100)
const addingValueAtom = atom(
    (get) => get(valueAtom) / 2,
    (get, set, num: number) => {
        set(valueAtom, get(valueAtom) * num)
    },
)

// 初期値を宣言
const pricesAtom = atom(100)
// pricesAtomからread/writeな派生atomを宣言
const addingPricesAtom = atom(
    (get) => get(pricesAtom), // read関数ではそのままpricesAtomの値を返す
    (get, set, num: number) => {
        // write関数では与えられた値を加算する
        set(pricesAtom, get(pricesAtom) + num)
    },
)



/* Store によるグローバルステートの取り扱い */
const countsAtom = atom(0) // グローバルステート
const countsStore = createStore() // storeを宣言
countsStore.set(countsAtom, 100) // storeの中にcountsAtomを初期値100としてセットする

// ボタンを押すと+1されるカウンター
const Counter = () => {
    const [count, setCount] = useAtom(countsAtom);
    return (
        <>
            <div>Counter：{count}</div>
            <button onClick={() => setCount((p) => p + 1)}>
                +1するボタン
            </button>
        </>
    )
}



/* ↑↑↑ atom の宣言はコンポーネントの範囲外で行う ↑↑↑ */
export const UseAtomComponent = () => {
    /* ↓↓↓ useAtom はコンポーネントの範囲内で使用する ↓↓↓ */

    // valueには50がセットされ、setValue(x)でvalueの値をx倍する
    const [value, setValue] = useAtom(addingValueAtom)

    // read関数で読み込まれた値がpriceにセットされる
    const [prices, addPrices] = useAtom(addingPricesAtom)
    return (
        <>
            <div style={{ 'display': 'flex', 'gap': '2%' }}>
                {/* ボタンを押された場合はaddingPriceAtomの第3引数に100がセットされる */}
                <button type="button" onClick={() => addPrices(100)}>
                    <b>{prices} yen</b><br />Add 100 yen
                </button>
                <button type="button" onClick={() => setValue(2)}>
                    <b>value：{value}</b><br />値（初期値：50）を2倍にしていく
                </button>
            </div>
            {/* Store によるグローバルステートの取り扱い */}
            <Provider store={countsStore}>
                <h1>Proverで切り分けした空間</h1>
                <CountUpdateBtn countsAtom={countsAtom} />
                <CountUpdateBtn countsAtom={countsAtom} />
                <Counter />
            </Provider>
            <h1>グローバルステート空間</h1>
            <Counter />
        </>
    )
}