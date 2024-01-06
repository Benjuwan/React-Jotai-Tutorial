type itemAnkerPropsType = {
    pokemonUrl: string
}

export const ItemAnker = ({ pokemonUrl }: itemAnkerPropsType) => {
    const ankerStyle: object = {
        'lineHeight': '1',
        'textDecoration': 'none',
        'fontSize': '12px'
    }

    return (
        <a style={ankerStyle} href={pokemonUrl} target="_blank">{pokemonUrl}</a>
    );
}