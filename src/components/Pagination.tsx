import React from "react";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled: boolean;
};

const Pagination: React.FC<Props> = ({
  page,
  totalPages,
  onPageChange,
  disabled,
}) => {
  const back = page > 1;
  const next = page < totalPages;

  return (
    <footer className="pagination">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={!back || disabled}
      >
        Prev
      </button>
      <div className="pill">
        {page} / {totalPages}
      </div>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!next || disabled}
      >
        Next
      </button>
    </footer>
  );
};

export default Pagination;
