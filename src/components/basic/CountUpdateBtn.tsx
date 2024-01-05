import { FC } from "react";
import { PrimitiveAtom, useAtom } from "jotai";

/* 
    WithInitialValue は 以下の型定義ファイルにて
    [\node_modules\jotai\esm\vanilla\atom.d.mts] or
    [\node_modules/jotai/vanilla/atom.d.ts]
    以下の形で型定義されている。
*/
type WithInitialValue<Value> = {
    init: Value;
};

type props = {
    countsAtom: PrimitiveAtom<number> & WithInitialValue<number>
}

export const CountUpdateBtn: FC<props> = ({ countsAtom }) => {
    const [count, setCount] = useAtom(countsAtom);
    return (
        <>
            <div>CountUpdateBtn：{count}</div>
            <button style={{ 'borderColor': 'red' }} onClick={() => setCount((p) => p + 1)}>
                +1するボタン
            </button>
        </>
    )
}