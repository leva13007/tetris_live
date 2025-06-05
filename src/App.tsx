import { useEffect, useState } from 'react';
import './App.css';
import { grid as mockGrid } from './service/mock';
import { getMergedGrid, getNextRotationBrick, getRandomBrick, hasCollision } from './service';
import type { BrickIntance, Shape } from './service/type';
import { TETROMINOES } from './service/constants';

function App() {
  console.log("Render App");

  const [isGameOver, setGameOver] = useState(false);
  const [grid, setGrid] = useState(mockGrid);
  const [currentBrick, setCurrentBrick] = useState<BrickIntance>(getRandomBrick());
  const [nextBrick, setNextBrick] = useState<BrickIntance>(getRandomBrick());


  const moveDown = () => {
    const r = currentBrick.spawnOffset.r + 1;
    if (hasCollision(grid, currentBrick.shape, { r, c: currentBrick.spawnOffset.c })) {
      const mergedGrid = getMergedGrid(grid, currentBrick);
      setGrid(mergedGrid);
      setCurrentBrick(nextBrick);
      setNextBrick(getRandomBrick());
      if (hasCollision(grid, nextBrick.shape, nextBrick.spawnOffset)) {
        setGameOver(true);
      }
    } else {
      setCurrentBrick({
        ...currentBrick,
        spawnOffset: {
          r,
          c: currentBrick.spawnOffset.c
        }
      })
    }
  }

  const moveSides = (dc: number) => {
    const c = currentBrick.spawnOffset.c + dc;
    if (hasCollision(grid, currentBrick.shape, { r: currentBrick.spawnOffset.r, c })) return;
    setCurrentBrick({
      ...currentBrick,
      spawnOffset: {
        r: currentBrick.spawnOffset.r, c
      }
    })
  }

  const rotate = () => {
    const nextShape = getNextRotationBrick(currentBrick.name, currentBrick.rotationIndex);
    if (hasCollision(grid, nextShape.shape, { r: currentBrick.spawnOffset.r, c: currentBrick.spawnOffset.c })) return;
    setCurrentBrick({
      ...currentBrick,
      shape: nextShape.shape,
      rotationIndex: nextShape.rotationIndex,
    })
  }

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      console.log("ev.key", ev.code)
      if (isGameOver) return;
      if (ev.code === 'ArrowLeft') {
        moveSides(-1);
      } else if (ev.code === 'ArrowRight') {
        moveSides(1);
      } else if (ev.code === 'ArrowDown') {
        moveDown();
      } else if (ev.code === 'Space') {
        rotate();
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentBrick])

  useEffect(() => {
    if (isGameOver) return;
    const timerId = setTimeout(() => {
      console.log("Timer tick")
      moveDown();
    }, 1000);
    return () => clearTimeout(timerId)
  }, [currentBrick])

  const mergedGrid = getMergedGrid(grid, currentBrick);

  return (
    <main className='game'>
      <section className="game__grid game__grid-border">
        {
          mergedGrid.map((row, i) => (
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
