/**
 * File: src/utils/checkWinner.ts
 */

const LISTS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function checkWinner(squares: string[]): string {
  for (const [i, j, k] of LISTS) {
    if (
      squares[i] !== "" &&
      squares[i] === squares[j] &&
      squares[i] === squares[k]
    ) {
      const newWinner = squares[i];
      return newWinner;
    }
  }
  return "";
}
