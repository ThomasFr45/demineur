import { useState } from 'react';
import produce from "immer"
import './App.css';

const initiateTable = (size, bombRatio) => {

  let index = 0;
  const howMany = 25 * bombRatio;
  const bombs= [];
  let value = Math.floor(Math.random() * 25);
  while (index < howMany) {
    if (bombs.includes(value)) {
      value = Math.floor(Math.random() * 25);
    } else {
      bombs.push(value);
      index ++;
    }
  }

  const table = [];
  let id = 0;
  for(let init = 0; init < size; init++) {
    table.push([]);
  }
  for(let row = 0; row < size; row++) {
    for(let col = 0; col < size; col++) {
      if (bombs.includes(id)) {
        table[row].push({
          row,
          col,
          revealed: false,
          id,
          tips:'',
          val: -1,
          backgroundColor: "red"
        })
      } else {
        table[row].push({
          row,
          col,
          revealed: false,
          id,
          tips : '',
          val : 0,
          backgroundColor: "green"
        })
      }
      id++;
    }
  }
  return table;
}
 
function App() {
  const difficulty = 0.2;
  const [ table, setTable ] = useState(initiateTable(5, difficulty));
  const [ end, setEnd ] = useState(false);
  const [ count, setCount ] = useState(1);
  
  const howMany = (x, y) => {
    let nearbyBombs = 0;
    if(table[x][y-1]) {
      if(table[x][y-1].val === -1) {
        nearbyBombs++;
      }
    }
    if(table[x][y+1]) {
      if(table[x][y+1].val === -1) {
        nearbyBombs++;
      }
    }
    if (table[x - 1]) {
      if(table[x-1][y]) {
        if(table[x-1][y].val === -1) {
          nearbyBombs++
        }
      }
      if(table[x-1][y + 1]) {
        if(table[x-1][y+1].val === -1) {
          nearbyBombs++
        }
      }
      if(table[x-1][y - 1]) {
        if(table[x-1][y-1].val === -1) {
          nearbyBombs++
        }
      }
    }
    if (table[x + 1]){
      if(table[x + 1][y]) {
        if(table[x+1][y].val === -1) {
          nearbyBombs++
        }
      }
      if(table[x + 1][y + 1]) {
        if(table[x+1][y+1].val === -1) {
          nearbyBombs++
        }
      }
      if(table[x + 1][y - 1]) {
        if(table[x+1][y-1].val === -1) {
          nearbyBombs++
        }
      }
    }

    return nearbyBombs;
  }

  const handleClicked = (cell) => {
      if (!end) {
      const newBoard = produce(table, (draft) => {
        if (cell.val === -1) {
          alert("You lost");
          setEnd(true)
          table.forEach(row => row.forEach(cell => {
            if(cell.val !== -1){
              draft[cell.row][cell.col].tips = howMany(cell.row, cell.col);
            }
            draft[cell.row][cell.col].revealed = true;
          }))
        } else {
          if (count === 25 - (25 * difficulty)) {
            setEnd(true);
            alert("You won !")
          }
            setCount(count + 1);
          draft[cell.row][cell.col].tips = howMany(dz.row, cell.col);
        }
        draft[cell.row][cell.col].revealed = true;
      });
      setTable(newBoard);
    }
  }
    return (
      <div className="App">
        <p>{count - 1}</p>
          <table>
            <tbody>
           {table.map((row, index) => <tr key={index}>{row.map((cell, index) => <td key={index} style={cell.revealed ? {backgroundColor: cell.backgroundColor} : null} onClick={() => handleClicked(cell)}>{cell.tips}</td>)}</tr>)}
            </tbody>
          </table>
      </div>
    );
}

export default App;
