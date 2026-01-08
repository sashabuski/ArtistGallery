interface CellProps {
  src: string;
}

const Cell: React.FC<CellProps> = ({ src }) => (
  <div className="cell">
    <img src={src} alt="artwork" />
  </div>
);

export default Cell;