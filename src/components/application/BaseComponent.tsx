import { useEffect, useState } from "react";
import { pokeListType } from "./ts/pokedata";
import { useFetchData } from "./hooks/useFecthData";
import { Items } from "./Items";

export const BaseComponent = () => {
    const containerStyle: object = {
        'display': 'flex',
        'flexWrap': 'wrap',
        'gap': '5%',
    }

    const [pokeData, setPokeData] = useState<pokeListType[]>([]);

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
        <>
            {pokeData.length > 0 &&
                <div style={containerStyle}>
                    <Items pokeData={pokeData} />
                </div>
            }
        </>
    );
}