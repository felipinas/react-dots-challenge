import { DotProps } from "./types";

export function Dot({ dot }: DotProps) {  
  return (
    <div
      className="dot"
      style={{ top: dot.y, left: dot.x }}
    >
    </div>
  )
}