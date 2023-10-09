import { useEffect, useState } from 'react';

export function setupMouseDragScroll(ulGridRef) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const ulGrid = ulGridRef.current;

    if (!ulGrid) return;

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - ulGrid.offsetLeft);
      setScrollLeft(ulGrid.scrollLeft);
      ulGrid.style.scrollBehavior = 'auto';
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      ulGrid.style.scrollBehavior = 'smooth';
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const x = e.pageX - ulGrid.offsetLeft;
      const walk = (x - startX) * 2; // Adjust the scrolling speed
      ulGrid.scrollLeft = scrollLeft - walk;
    };

    ulGrid.addEventListener('mousedown', handleMouseDown);
    ulGrid.addEventListener('mouseup', handleMouseUp);
    ulGrid.addEventListener('mouseleave', handleMouseUp);
    ulGrid.addEventListener('mousemove', handleMouseMove);

    return () => {
      ulGrid.removeEventListener('mousedown', handleMouseDown);
      ulGrid.removeEventListener('mouseup', handleMouseUp);
      ulGrid.removeEventListener('mouseleave', handleMouseUp);
      ulGrid.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging, startX, scrollLeft, ulGridRef]);

  // Cleanup function
  return () => {};
}
