import { Provider } from 'jotai'
import { AtomComponent } from "./components/basic/AtomComponent";
import { UseAtomComponent } from "./components/basic/UseAtomComponent";
import { TodoList } from './components/practice/TodoList';

export const App = () => {
  return (
    <Provider>
      <div style={{ 'marginBottom': '10em' }}>
        <TodoList />
      </div>
      {/* <AtomComponent /> */}
      <UseAtomComponent />
    </Provider>
  );
}