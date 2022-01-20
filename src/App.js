import './App.css';
import TableData from './table';
import { ContextProvider } from './contextFile';

function App() {

  //console.log("from app")
  return (
  <div style={{ margin: "50px" }}>
    <ContextProvider>
      <TableData/>
    </ContextProvider>
  </div>
  );
}

export default App;
