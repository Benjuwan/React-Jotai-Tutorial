import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { Provider, atom, createStore } from 'jotai'
// import './index.css'

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
