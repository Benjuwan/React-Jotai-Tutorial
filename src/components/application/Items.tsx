import { pokeList } from "./BaseComponent";
import { ItemAnker } from "./ItemAnker";

type itemsPropsType = {
    pokeData: pokeList[]; // pokeList[]：配列（オブジェクト）として扱うことで map などループ処理が利用可能
}

export const Items = ({ pokeData }: itemsPropsType) => {
    const paragraphStyle: object = {
        'lineHeight': '1.2',
        'fontSize': '14px',
        'margin': '1em 0 0',
    }

    return (
        <>
            {pokeData.map((pokemon, i) => (
                <div style={{ 'width': '25%' }} key={i}>
                    <p style={paragraphStyle}>{pokemon.name}</p>
                    <ItemAnker pokemonUrl={pokemon.url} />
                </div>
            ))}
        </>
    );
}