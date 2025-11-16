/**
 * File: src/components/Square.tsx
 */

type Props = {
  square: string;
  onClick: () => void;
};

export default function Square({ square, onClick }: Props) {
  return (
    <div className="square" onClick={onClick}>
      <div className="square__background"></div>
      <div className="square__content">{square}</div>
    </div>
  );
}
