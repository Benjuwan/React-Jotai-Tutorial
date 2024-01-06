import { pokeList, pokeRoot } from "../BaseComponent";

export const useFetchData = () => {
    const FetchData = async () => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50'); // defaultPokeData があるので指定数値 +1 のデータが描画される
        const resObj: pokeRoot = await response.json();
        const pokeResults: pokeList[] = resObj.results; // pokeList[]：配列（オブジェクト）として返す（でないと [[data-1, data-2, data-3,,,]] という配列にネストされる形になってしまうため）
        return pokeResults;
    }

    return { FetchData }
}