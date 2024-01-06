import { useEffect } from "react";
import { Provider, atom, createStore, useAtom } from 'jotai'
import { useFetchData } from "./hooks/useFecthData";
import { Items } from "./Items";

export type pokeRoot = {
    // count: number;
    // next: string | null;
    // previous: string | null;
    results: pokeList[] // pokeList[]：配列（オブジェクト）として扱う（でないと [[data-1, data-2, data-3,,,]] という配列にネストされる形になってしまうため）
}

export type pokeList = {
    name: string;
    url: string;
}

const defaultPokeData: pokeList = {
    name: '【hogemon】---',
    url: 'https://example.com/hogemon'
}

/* Jotai の atom はデフォルトでは初期値の型を never として扱います。これに対処するためには、atom を作成する際にジェネリクスを使用して、初期値の型を指定することができます。 */
const initialPokeData: pokeList[] = [defaultPokeData];

const pokeStore = createStore(); // グローバル State
const pokeList = atom(initialPokeData); // store を宣言
// pokeStore.set(pokeList, []); // store の中に初期値をセット（だが今回は initialPokeData にて初期値をセット）

export const BaseComponent = () => {
    const containerStyle: object = {
        'display': 'flex',
        'flexWrap': 'wrap',
        'gap': '5%',
    }

    const [pokeData, setPokeData] = useAtom(pokeList);

    const { FetchData } = useFetchData();
    useEffect(() => {
        const promisePokeData = FetchData();
        promisePokeData.then((data) => {
            // console.log(data);
            setPokeData((_prevPokeData) => [...pokeData, ...data]);
        });
    }, []);

    // console.log(pokeData);

    return (
        <Provider store={pokeStore}>
            {pokeData.length > 0 &&
                <div style={containerStyle}>
                    <Items pokeData={pokeData} />
                </div>
            }
        </Provider>
    );
}