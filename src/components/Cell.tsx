import React from "react";

interface CellProps {
  label: string;
}

const Cell: React.FC<CellProps> = ({ label }) => {
  return <div className="cell">{label}</div>;
};

export default Cell;
