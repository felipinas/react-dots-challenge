import { MouseEvent, useState } from "react";

import { Dot } from "./Dot";

import './styles/app.css';

import { DotType } from "./types";

export function App() {
  const [dots, setDots] = useState<DotType[]>([]);

  const [removedDots, setRemovedDots] = useState<DotType[]>([]);

  const handleOnMainClick = (event: MouseEvent<HTMLElement>) => {
    const { pageX, pageY } = event;

    const newDot = { x: pageX, y: pageY };

    setDots(state => [...state, newDot])
  };

  const handleUndo = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    
    const isDotsEmpty = dots.length === 0;

    if (isDotsEmpty) return;

    const newDots = dots.slice(0, -1);
    
    setDots(newDots);

    const removedDot = dots[dots.length - 1];
    setRemovedDots(state => [...state, removedDot]);
  }

  const handleRedo = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const isRemovedDotsEmpty = removedDots.length === 0;

    if (isRemovedDotsEmpty) return;

    const removedDotToReturn = removedDots[removedDots.length - 1];

    setDots(state => [...state, removedDotToReturn]);

    const newRemovedDots = removedDots.slice(0, -1);
    setRemovedDots(newRemovedDots);
  }

  return (
    <main onClick={handleOnMainClick}>
      <div className="buttons">
        <button onClick={handleUndo}>
          Undo
        </button>

        <button onClick={handleRedo}>
          Redo
        </button>
      </div>

      {
        dots.map((dot, index) => <Dot key={index} dot={dot} />)
      }
    </main>
  )
}
