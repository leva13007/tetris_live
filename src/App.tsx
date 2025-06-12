import { useEffect, useRef, useState } from 'react';
import './App.css';
import { grid as mockGrid } from './service/mock';
import { getMergedGrid, getRandomBrick, moveSides, rotate, tick } from './service';
import type { GameState } from './service/type';

function App() {
  console.log("Render App");

  const [gameTick, setGameTick] = useState(0);

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      console.log("ev.key", ev.code)
      if (gameState.current.isGameOver) return;
      if (ev.code === 'Escape') {
        gameState.current.isPause = !gameState.current.isPause;
        gameState.current.gameMsg = gameState.current.isPause ? "Pause" : "";
        if (gameState.current.isPause) {
          if (gameTimer) {
            clearTimeout(gameTimer);
          }
        } else {
          loop();
        }
        forceRender();
        return;
      }
      if (gameState.current.isPause) return;
      if (ev.code === 'ArrowLeft') {
        gameState.current.currentBrick = moveSides({
          grid: gameState.current.grid,
          currentBrick: gameState.current.currentBrick,
          dc: -1,
        });
      } else if (ev.code === 'ArrowRight') {
        gameState.current.currentBrick = moveSides({
          grid: gameState.current.grid,
          currentBrick: gameState.current.currentBrick,
          dc: 1,
        });
      } else if (ev.code === 'ArrowDown') {
        gameState.current = tick(gameState.current);
      } else if (ev.code === 'Space') {
        gameState.current.currentBrick = rotate({
          grid: gameState.current.grid,
          currentBrick: gameState.current.currentBrick,
        });
      }
      forceRender();
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameTick])


  let gameTimer: ReturnType<typeof setTimeout> | null = null;

  const forceRender = () => {
    setGameTick(prev => prev + 1);
  }

  const gameState = useRef<GameState>({
    isGameOver: false,
    grid: mockGrid,
    currentBrick: getRandomBrick(),
    nextBrick: getRandomBrick(),
    score: 0,
    lines: 0,
    isPause: false,
    gameMsg: ""
  });

  const loop = () => {
    console.log("Game tick");
    if (gameState.current.isGameOver || gameState.current.isPause) {
      return;
    }

    gameState.current = tick(gameState.current);

    forceRender();
    gameTimer = setTimeout(() => {
      loop();
    }, 1000 / 0.5);
  }

  useEffect(() => {
    loop();
    return () => {
      if (gameTimer) {
        clearTimeout(gameTimer);
      }
    };
  }, [])

  const mergedGrid = getMergedGrid(gameState.current.grid, gameState.current.currentBrick);

  return (
    <main className='game'>
      <section className="game__grid game__grid-border">
        {
          gameState.current.gameMsg && (
            <div className="game-status">{gameState.current.gameMsg}</div>
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
              gameState.current.nextBrick.shape.map((row, i) => (
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
          <div className="text-value">{gameState.current.score}</div>
        </div>
        <div className="game__lines info-wrapper">
          <h3 className="text-title">Lines</h3>
          <div className="text-value">{gameState.current.lines}</div>
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
