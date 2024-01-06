# React-Jotai-Tutorial

- [Jotai](https://jotai.org/)

- 参考情報：[初学者でも分かるようにJotaiを丁寧に解説していく](https://qiita.com/moritakusan/items/9a5e8c315b2565a02848)

## メモ

- `atom`<br />
最小限の（更新・購読可能な）単位の状態。`number`, `string`, `object`など各種「型」のデータ・値を（`State`）変数のような形で取り扱える。

```
const priceAtom = atom(10);
const messageAtom = atom('hello');
const productAtom = atom({ id: 12, name: 'good stuff' });
```

- `useAtom`<br />
`atom`を読み込んで状態管理を行う変数にセットする。`React`の`useState`とほとんど同じインターフェース。

```
const [value, setValue] = useAtom(atom);
```

- `atom`の宣言はコンポーネントの範囲外で、`useAtom`はコンポーネントの範囲内で使用する（※ログに警告が出る：Warning: Maximum update depth exceeded...）

```
// UseAtomComponent.tsx

/* ↑↑↑ atom の宣言はコンポーネントの範囲外で行う ↑↑↑ */
..
.
export const UseAtomComponent = () => {
.
..
/* ↓↓↓ useAtom はコンポーネントの範囲内で使用する ↓↓↓ */
```

- `Store`<br />
共有するデータの保管場所を定義するもの。`createStore`を使用することで、新しい空のストアを作成することができ、下記の3つのメソッドを持っている。
  - `get` : `atom`の値を取得する
  - `set` : `atom`の値を設定する
  - `sub` : `atom`の値を更新する

  ```
  .
  ..
  const myStore = createStore() // 空のstoreの宣言
  const countAtom = atom(0) // （number の）atom を作成
  myStore.set(countAtom, 1) // 宣言したstoreにcountAtomに初期値として1を代入した状態でセットする

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={myStore}>
        <App />
      </Provider>
    </React.StrictMode>,
  )
  ```

  - `Provider`（`Context`のそれとほぼ同じ機能）<br />
  `Provider`を使用することで`Provider`に囲われているコンポーネントだけに閉じられた`atom`を提供できる。コンポーネントツリー毎に異なるatomを保持する必要がある場合は、`Provider`と`Store`を使うことで空間的に切り分けられた環境で`atom`を使用できる。

- ライブラリ使用時に不明な型が発生した場合は、大抵`*.d.ts`（型定義ファイル）で管理されている

```
// CountUpdateBtn.tsx

/* 
    WithInitialValue は 以下の型定義ファイルにて
    [\node_modules\jotai\esm\vanilla\atom.d.mts] or
    [\node_modules/jotai/vanilla/atom.d.ts]
    以下の形で型定義されている。
*/
type WithInitialValue<Value> = {
    init: Value;
};

type btnProps = {
    countAtom: PrimitiveAtom<number> & WithInitialValue<number>
}
```

- `atom`はそのままでは`JSX`内で使えない<br />
`useAtom`を使って`atom`を（State）変数？のような形にすることで`JSX`内で使用できる。

```
// AtomComponent.tsx

return (
  <>
    {/* TypeScript からの警告：【型 'PrimitiveAtom<number> & WithInitialValue<number>' を型 'ReactNode' に割り当てることはできません。】*/}
    <p>priceAtom：{priceAtom}</p>
  </>
);
```

### 備忘録
- `git init`～`push`の流れ<br />

```
git init // 新しいリポジトリの初期セットアップ時に使用するワンタイムコマンド。このコマンドを実行すると現在の作業ディレクトリ内に新しい.gitサブディレクトリが作成される。これによって、新しい main ブランチも作成される。

Initialized empty Git repository in [自身の作業ディレクトリのパス] // この表記が出ているとok.


git add . // 必要に応じてファイルを選択。

git commit -m"first commit" // メッセージは適当なものを。

git push -u origin main // ローカルリポジトリの変更を、リモートリポジトリの origin [指定したブランチ] に反映させる。


git push // リモートリポジトリへpush.

Everything up-to-date // この表記が出るとok.
```
