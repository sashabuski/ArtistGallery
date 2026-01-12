import React, { useEffect, useRef, useState } from "react";
import Grid from "./Grid";

const GAP = 12;

const ROW_PRESETS: Record<number, number[]> = {
  6: [14, 9, 18, 5, 7, 15],
  5: [13, 12, 21, 14, 10],
  4: [20, 15, 18, 17],
  3: [32, 15, 23],
  2: [25, 45],
  1: [70]
};

const getColumnCount = () => {
  const w = window.innerWidth;
  if (w >= 1700) return 6;
  if (w >= 1450) return 5;
  if (w >= 1200) return 4;
  if (w >= 900) return 3;
  if (w >= 800) return 2;
  return 1;
};

const ScrollBox: React.FC = () => {
  const scrollboxRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  const [columnCount, setColumnCount] = useState(getColumnCount());
  const columnRows = ROW_PRESETS[columnCount];

  const [columnRefs, setColumnRefs] = useState(
    columnRows.map(() => React.createRef<HTMLDivElement>())
  );

  useEffect(() => {
    setColumnRefs(columnRows.map(() => React.createRef<HTMLDivElement>()));
  }, [columnCount]);

  const getRowHeight = () => {
    const cell = document.querySelector(".cell") as HTMLDivElement | null;
    return cell ? cell.getBoundingClientRect().height : 0;
  };

  const updateSpacer = () => {
    const scrollbox = scrollboxRef.current;
    const spacer = spacerRef.current;
    if (!scrollbox || !spacer) return;

    const rowHeight = getRowHeight();
    if (!rowHeight) return;

    const viewportHeight = scrollbox.clientHeight;

    const columnHeights = columnRows.map(
      (rows) => rows * rowHeight + (rows - 1) * GAP
    );

    const tallest = Math.max(...columnHeights);
    const scrollRange = Math.max(tallest - viewportHeight, 0);

    spacer.style.height = `${scrollRange}px`;
  };

  const updateColumns = () => {
    const scrollbox = scrollboxRef.current;
    if (!scrollbox) return;

    const rowHeight = getRowHeight();
    if (!rowHeight) return;

    const viewportHeight = scrollbox.clientHeight;

    const columnHeights = columnRows.map(
      (rows) => rows * rowHeight + (rows - 1) * GAP
    );

    const tallest = Math.max(...columnHeights);
    const scrollRange = Math.max(tallest - viewportHeight, 0);
    const progress = scrollRange === 0 ? 0 : scrollbox.scrollTop / scrollRange;

    columnRefs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;

      const maxOffset = Math.max(columnHeights[i] - viewportHeight, 0);
      el.style.transform = `translateY(${-progress * maxOffset}px)`;
    });
  };

  useEffect(() => {
    
    requestAnimationFrame(() => {
      updateSpacer();
      updateColumns();
    });

    const scrollbox = scrollboxRef.current;
    if (!scrollbox) return;

    scrollbox.addEventListener("scroll", updateColumns);

    const onResize = () => {
      setColumnCount(getColumnCount());

      requestAnimationFrame(() => {
        updateSpacer();
        updateColumns();
      });
    };

    window.addEventListener("resize", onResize);

    return () => {
      scrollbox.removeEventListener("scroll", updateColumns);
      window.removeEventListener("resize", onResize);
    };
  }, [columnCount, columnRefs]); 

  return (
   <div
        className={`scrollbox ${columnCount <= 1 ? "small" : "large"}`}
        ref={scrollboxRef}
        >
        <div className="viewport">
            <Grid
            columnRows={columnRows}
            columnRefs={columnRefs}
            columns={columnCount}
            />
        </div>
        <div className="scroll-spacer" ref={spacerRef} />
    </div>
  );
};

export default ScrollBox;
