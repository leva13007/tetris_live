import { memo } from "react";

export const GameMessage = memo(({ message }: { message: string }) => (
  <>
    {
      message && (
        <div data-testid="game-message" className="game-status">{message}</div>
      )
    }
  </>
))