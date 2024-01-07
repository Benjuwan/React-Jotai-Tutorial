import { pokeDataType } from "./ts/pokedata"

type multiDataPropsType = {
    pokeList: pokeDataType[];
}

export const MultiData = ({ pokeList }: multiDataPropsType) => {
    const listStyle: object = {
        'lineHeight': '1.5',
        'fontSize': '14px',
        'width': '100%',
        'textAlign': 'center',
        'margin': '2.5em auto',
        'display': 'flex',
        'gap': '2%',
        'flexFlow': 'row wrap'
    }

    return (
        <div style={listStyle}>
            {pokeList.map((pokemon, i) => (
                <div key={i}>
                    <p>{pokemon.name}</p>
                    <p>weight：{pokemon.weight} / height：{pokemon.height}</p>
                    <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
                </div>
            ))}
        </div>
    );
}