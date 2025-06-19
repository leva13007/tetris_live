import { useEffect, useRef, useState } from 'react';
import './App.css';
import { grid as mockGrid } from './service/mock';
import { getMergedGrid, getRandomBrick, moveSides, rotate, tick } from './service';
import type { GameState } from './service/type';
import { SideBar } from './components/SideBar/SideBar';
import { GameMessage } from './components/GameMessage/GameMessage';
import { GameGrid } from './components/GameGrid/GameGrid';

function App() {
  const [gameTick, setGameTick] = useState(0);
  console.log("Render App", gameTick);

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
    level: 1,
    isPause: false,
    gameMsg: ""
  });

  const loop = () => {
    // console.log("Game tick");
    if (gameState.current.isGameOver || gameState.current.isPause) {
      return;
    }

    gameTimer = setTimeout(() => {
      gameState.current = tick(gameState.current);

      forceRender();
      loop();
    }, 1000 / gameState.current.level);
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
        <GameMessage message={gameState.current.gameMsg} />
        <GameGrid grid={mergedGrid} />
      </section>
      <SideBar shape={gameState.current.nextBrick.shape} score={gameState.current.score} lines={gameState.current.lines} level={gameState.current.level} />
    </main>
  )
}

export default App;
