import { useEffect, useRef, useState } from 'react';
import './App.css';
import { grid as mockGrid } from './service/mock';
import { getMergedGrid, getRandomBrick, moveSides, rotate, tick } from './service';
import type { GameState } from './service/type';
import { SideBar } from './components/SideBar/SideBar';
import { GameMessage } from './components/GameMessage/GameMessage';
import { GameGrid } from './components/GameGrid/GameGrid';
import { welcome } from './maps';
import { GET_GAME_MAP, GET_WELCOME_SCREEN } from './service/constants';

function App() {
  const [gameTick, setGameTick] = useState(0);
  console.log("Render App", gameTick);
  const [mapIndex, setMapIndex] = useState(0);
  const [gameMode, setGameMode] = useState<'settings' | 'game'>('settings');

  const gameState = useRef<GameState>({
    isGameOver: false,
    grid: welcome[mapIndex][GET_WELCOME_SCREEN],
    currentBrick: getRandomBrick(true),
    nextBrick: getRandomBrick(true),
    score: 0,
    lines: 0,
    level: 1,
    isPause: false,
    gameMsg: ""
  });

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
      } else if (ev.code === 'Enter') {
        gameState.current.grid = welcome[mapIndex][GET_GAME_MAP];
        gameState.current.currentBrick = getRandomBrick();
        gameState.current.nextBrick = getRandomBrick();
        gameState.current.isGameOver = false;
        gameState.current.isPause = false;
        gameState.current.gameMsg = "";
        gameState.current.score = 0;
        gameState.current.lines = 0;
        gameState.current.level = 1;
        setGameMode('game');
        loop();
        forceRender();
        return;

      }
      if (gameState.current.isPause) return;
      if (ev.code === 'ArrowLeft') {
        if (gameMode === 'settings') {
          setMapIndex(prev => {
            let newIndex = prev - 1;
            if (newIndex < 0) newIndex = welcome.length - 1;
            gameState.current.grid = welcome[newIndex][GET_WELCOME_SCREEN];
            return newIndex;
          });
          gameState.current.grid = welcome[mapIndex][GET_WELCOME_SCREEN];
        } else if (gameMode === 'game') {
          gameState.current.currentBrick = moveSides({
            grid: gameState.current.grid,
            currentBrick: gameState.current.currentBrick,
            dc: -1,
          });
        }
      } else if (ev.code === 'ArrowRight') {
        if (gameMode === 'settings') {
          setMapIndex(prev => {
            let newIndex = prev + 1;
            if (newIndex >= welcome.length) newIndex = 0;
            console.log("ArrowRight -> newIndex", newIndex);
            gameState.current.grid = welcome[newIndex][GET_WELCOME_SCREEN];
            return newIndex;
          });
          gameState.current.grid = welcome[mapIndex][GET_WELCOME_SCREEN];
        } else if (gameMode === 'game') {
          gameState.current.currentBrick = moveSides({
            grid: gameState.current.grid,
            currentBrick: gameState.current.currentBrick,
            dc: 1,
          });
        }
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
    // loop();
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
