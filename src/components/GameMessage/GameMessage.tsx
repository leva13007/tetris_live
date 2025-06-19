import { memo } from "react";

export const GameMessage = memo(({ message }: { message: string }) => (
  <>
    {
      message && (
        <div className="game-status">{message}</div>
      )
    }
  </>
))