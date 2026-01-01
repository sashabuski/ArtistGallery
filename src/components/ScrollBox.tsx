import React, { useEffect, useRef } from "react";
import Grid from "./Grid";

// const ROW_HEIGHT = 140;
const GAP = 16;

const columnRows = [14, 9, 18, 11, 7, 15];

const ScrollBox: React.FC = () => {
  const scrollboxRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  const columnRefs = useRef(
    columnRows.map(() => React.createRef<HTMLDivElement>())
  );

  /*
  const columns = useRef(
    columnRows.map((rows) => ({
      height: rows * ROW_HEIGHT + (rows - 1) * GAP
    }))
  );
  */

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

    columnRefs.current.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;

      const maxOffset = Math.max(
        columnHeights[i] - viewportHeight,
        0
      );

      el.style.transform = `translateY(${-progress * maxOffset}px)`;
    });
  };

  useEffect(() => {
    // Initial setup
    updateSpacer();
    updateColumns();

    const scrollbox = scrollboxRef.current;
    if (!scrollbox) return;

    // Scroll listener
    scrollbox.addEventListener("scroll", updateColumns);

    // Resize listener
    const onResize = () => {
      updateSpacer();
      updateColumns();
    };

    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      scrollbox.removeEventListener("scroll", updateColumns);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="scrollbox" ref={scrollboxRef}>
      <div className="viewport">
        <Grid
          columnRows={columnRows}
          columnRefs={columnRefs.current}
        />
      </div>
      <div className="scroll-spacer" ref={spacerRef} />
    </div>
  );
};

export default ScrollBox;
