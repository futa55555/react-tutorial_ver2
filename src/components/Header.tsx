/**
 * File: src/components/Header.tsx
 */

type Props = {
  isModalView: boolean;
  setIsModalView: (tf: boolean) => void;
};

export default function Header({ isModalView, setIsModalView }: Props) {
  return (
    <header className="header">
      <h1
        className="header__title"
        onClick={() => setIsModalView(!isModalView)}
      >
        Tic Tac Toe
      </h1>
      <p className="header__description">
        X always goes first. Click the title to display the React logo!
      </p>
    </header>
  );
}
