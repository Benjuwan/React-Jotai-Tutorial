import { atom, useAtom } from "jotai";
import { pokeDataType, pokeListType } from "./ts/pokedata";
import { useFetchPokeData } from "./hooks/useFecthPokeData";
import { SingleData } from "./SingleData";
import { MultiData } from "./MultiData";

type itemsPropsType = {
    pokeData: pokeListType[]; // pokeListType[]：配列（オブジェクト）として扱うことで map などループ処理が利用可能
}

const defaultPokeData: pokeDataType = {
    name: '【hogemon】---',
    weight: 100,
    height: 100
}

/* Jotai の atom はデフォルトでは初期値の型を never として扱います。これに対処するためには、atom を作成する際にジェネリクスを使用して、初期値の型を指定することができます。 */
const initialPokeData: pokeDataType = defaultPokeData;
const pokeItemAtom = atom(initialPokeData); // store を宣言

/* -------------- atom はコンポーネントの範囲外で宣言 -------------- */

const initialPokeList: pokeDataType[] = [defaultPokeData];
const pokeListAtom = atom(initialPokeList); // store を宣言

/* -------------- atom はコンポーネントの範囲外で宣言 -------------- */

export const Items = ({ pokeData }: itemsPropsType) => {
    const paragraphStyle: object = {
        'lineHeight': '1.2',
        'fontSize': '14px',
        'margin': '1em 0 0',
    }

    const ankerStyle: object = {
        'lineHeight': '1',
        'textDecoration': 'none',
        'fontSize': '12px'
    }

    /* -------------- useAtom はコンポーネントの範囲内でok -------------- */

    /* Single Mode */
    const [pokeItem, setPokeItem] = useAtom(pokeItemAtom);
    const { FetchPokeData } = useFetchPokeData();
    const fetchPokeDataSetItem = (pokemonUrl: string) => {
        const pokemons: Promise<pokeDataType> = FetchPokeData(pokemonUrl);
        pokemons.then((data) => {
            setPokeItem((_prevPokeItem) => data);
        });
    }

    // console.log(pokeItem);

    /* -------------- useAtom はコンポーネントの範囲内でok -------------- */

    /* Multi Mode */
    const [pokeList, setPokeList] = useAtom(pokeListAtom);
    const fetchPokeDataSetList = (pokemonUrl: string) => {
        const pokemons: Promise<pokeDataType> = FetchPokeData(pokemonUrl);
        pokemons.then((data) => {
            setPokeList((_prevPokeList) => [...pokeList, data]);
        });
    }

    // console.log(pokeList);

    return (
        <>
            {pokeData.map((pokemon, i) => (
                <div style={{ 'width': '25%' }} key={i}>
                    <p style={paragraphStyle}>{pokemon.name}</p>
                    <a style={ankerStyle} onClick={() => fetchPokeDataSetItem(pokemon.url)} target="_blank">{pokemon.url}</a>
                </div>
            ))}
            <SingleData pokeItem={pokeItem} />
            {/* <MultiData pokeList={pokeList} /> */}
        </>
    );
}