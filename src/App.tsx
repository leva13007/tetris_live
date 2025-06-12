import { useEffect, useState } from 'react';
import './App.css';
import { grid as mockGrid } from './service/mock';
import { clearLines, getMergedGrid, getRandomBrick, hasCollision, moveDown, moveSides, rotate } from './service';
import type { BrickIntance } from './service/type';

function App() {
  console.log("Render App");

  const [isGameOver, setGameOver] = useState(false);
  const [grid, setGrid] = useState(mockGrid);
  const [currentBrick, setCurrentBrick] = useState<BrickIntance>(getRandomBrick());
  const [nextBrick, setNextBrick] = useState<BrickIntance>(getRandomBrick());
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [isPause, setPause] = useState(false);
  const [gameMsg, setGameMsg] = useState("");

  const moveDownHandler = () => {
    const { nextBrickMove, gotCollision } = moveDown({
      grid,
      currentBrick,
    });

    if (gotCollision) {
      const mergedGrid = getMergedGrid(grid, currentBrick);
      const { clearedlines, newGrid } = clearLines(mergedGrid);
      setScore(prev => prev + clearedlines * 10)
      setLines(prev => prev + clearedlines);
      setGrid(newGrid);
      setCurrentBrick(nextBrick);
      setNextBrick(getRandomBrick());
      if (hasCollision(grid, nextBrick.shape, nextBrick.spawnOffset)) {
        setGameOver(true);
        setGameMsg("GameOver!");
      }
    } else {
      setCurrentBrick(nextBrickMove);
    }
  }

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      console.log("ev.key", ev.code)
      if (isGameOver) return;
      if (ev.code === 'Escape') {
        setPause(prev => !prev);
        if (isPause) {
          setGameMsg("")
        } else {
          setGameMsg("Pause")
        }
        return;
      }
      if (isPause) return;
      if (ev.code === 'ArrowLeft') {
        const nextBrickMove = moveSides({
          grid,
          currentBrick,
          dc: -1,
        });
        setCurrentBrick(nextBrickMove);
      } else if (ev.code === 'ArrowRight') {
        const nextBrickMove = moveSides({
          grid,
          currentBrick,
          dc: 1,
        });
        setCurrentBrick(nextBrickMove);
      } else if (ev.code === 'ArrowDown') {
        moveDownHandler();
      } else if (ev.code === 'Space') {
        const nextBrickMove = rotate({
          grid,
          currentBrick,
        });
        setCurrentBrick(nextBrickMove);
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentBrick, isPause])

  useEffect(() => {
    if (isGameOver || isPause) return;
    const timerId = setTimeout(() => {
      console.log("Timer tick")
      moveDownHandler();
    }, 1000);
    return () => clearTimeout(timerId)
  }, [currentBrick, isPause])

  const mergedGrid = getMergedGrid(grid, currentBrick);

  return (
    <main className='game'>
      <section className="game__grid game__grid-border">
        {
          gameMsg && (
            <div className="game-status">{gameMsg}</div>
          )
        }
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
          <div className="text-value">{score}</div>
        </div>
        <div className="game__lines info-wrapper">
          <h3 className="text-title">Lines</h3>
          <div className="text-value">{lines}</div>
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
