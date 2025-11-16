/**
 * File: src/components/Common/BasicButton.tsx
 */

import type React from "react";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function BasicButton({ children, onClick }: Props) {
  return (
    <button className="create-game-button" onClick={onClick}>
      {children}
    </button>
  );
}
