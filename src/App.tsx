import { useState } from 'react';
import './App.css';
import { grid } from './service/mock';
import { getRandomBrick } from './service';
import type { BrickIntance } from './service/type';

function App() {
  console.log("Render App", grid);

  const [currentBrick, setCurrentBrick] = useState<BrickIntance>(getRandomBrick());
  const [nextBrick, setNextBrick] = useState<BrickIntance>(getRandomBrick());

  return (
    <main className='game'>
      <section className="game__grid game__grid-border">
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
      <section className="game__info">
        <div className="next-brick info-wrapper">
          <h3 className="text-title">Next brick</h3>
          <div className="next-brick__gird game__grid">
            {
              nextBrick.shape.map((row, i) => (
                <div key={i} className="grid__row">
                  {
                    row.map((cell, j) => (
                      <div key={`${i} ${j}`} className={`grid__cell ${cell ? 'grid__cell--active' : ''}`}></div>
                    ))
                  }
                </div>
              ))
            }
          </div>
        </div>
        <div className="game__score info-wrapper">
          <h3 className="text-title">Score</h3>
          <div className="text-value">150</div>
        </div>
        <div className="game__lines info-wrapper">
          <h3 className="text-title">Lines</h3>
          <div className="text-value">12</div>
        </div>
        <div className="game__level info-wrapper">
          <h3 className="text-title">Level</h3>
          <div className="text-value">5</div>
        </div>
      </section>
    </main>
  )
}

export default App
