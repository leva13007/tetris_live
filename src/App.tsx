import { useState } from 'react';
import './App.css';
import { grid } from './service/mock';

function App() {
  console.log("Render App", grid);
  return (
    <main className='game'>
      <section className="game__grid">
        {
          grid.map((row, i) => (
            <div key={i} className="grid__row">
              {
                row.map((cell, j) => (
                  <div key={`${i} ${j}`} className={`grid__cell ${cell ? 'grid__cell--active' : ''}`}></div>
                ))
              }
            </div>
          ))
        }
      </section>
      <section className="game__info"></section>
    </main>
  )
}

export default App
