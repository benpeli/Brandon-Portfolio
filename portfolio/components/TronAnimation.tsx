"use client";

import React, { useRef, useEffect, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Line {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  angle: number;
  length: number;
  maxLength: number;
  growing: boolean;
  color: string;
  width: number;
  speed: number;
  bendPoints: {
    x: number; 
    y: number;
    bendAngle: number;
  }[];
  segments: {start: Point, end: Point}[];
  currentSegmentIndex: number;
  progressOnCurrentSegment: number;
}

interface TronAnimationProps {
  triggerElementId?: string;
}

const TronAnimation: React.FC<TronAnimationProps> = ({ triggerElementId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationFrameRef = useRef<number>(0);

  // Utility function to check if two line segments intersect
  const doLinesIntersect = (line1Start: Point, line1End: Point, line2Start: Point, line2End: Point): boolean => {
    // Line 1 represented as a1x + b1y = c1 
    const a1 = line1End.y - line1Start.y; 
    const b1 = line1Start.x - line1End.x; 
    const c1 = a1 * line1Start.x + b1 * line1Start.y; 
  
    // Line 2 represented as a2x + b2y = c2 
    const a2 = line2End.y - line2Start.y; 
    const b2 = line2Start.x - line2End.x; 
    const c2 = a2 * line2Start.x + b2 * line2Start.y; 
  
    const determinant = a1 * b2 - a2 * b1; 
  
    if (determinant === 0) { 
      // Lines are parallel
      return false; 
    } else { 
      const x = (b2 * c1 - b1 * c2) / determinant; 
      const y = (a1 * c2 - a2 * c1) / determinant; 
      
      // Check if the intersection point lies on both line segments
      const onLine1 = (x >= Math.min(line1Start.x, line1End.x) && x <= Math.max(line1Start.x, line1End.x)) && 
                     (y >= Math.min(line1Start.y, line1End.y) && y <= Math.max(line1Start.y, line1End.y));
      
      const onLine2 = (x >= Math.min(line2Start.x, line2End.x) && x <= Math.max(line2Start.x, line2End.x)) && 
                     (y >= Math.min(line2Start.y, line2End.y) && y <= Math.max(line2Start.y, line2End.y));
      
      return onLine1 && onLine2;
    } 
  };

  // Check if a new segment would intersect with any existing segments
  const willIntersectExistingLines = (newSegment: {start: Point, end: Point}, existingLines: Line[]): boolean => {
    for (const line of existingLines) {
      for (const segment of line.segments) {
        if (doLinesIntersect(
            newSegment.start, 
            newSegment.end, 
            segment.start, 
            segment.end
          )) {
          return true;
        }
      }
    }
    return false;
  };

  // Calculate the total length of all segments in a line
  const calculateTotalLength = (segments: {start: Point, end: Point}[]): number => {
    return segments.reduce((total, segment) => {
      const dx = segment.end.x - segment.start.x;
      const dy = segment.end.y - segment.start.y;
      return total + Math.sqrt(dx * dx + dy * dy);
    }, 0);
  };

  const createLines = (centerX: number, centerY: number) => {
    const newLines: Line[] = [];
    const numLines = 8; // Number of lines to create
    
    for (let i = 0; i < numLines; i++) {
      let validLine = false;
      let attempts = 0;
      
      while (!validLine && attempts < 20) {
        attempts++;
        
        const angle = (Math.PI * 2 * i) / numLines + (Math.random() * 0.2 - 0.1); // Add slight randomness
        const maxLength = 150 + Math.random() * 200; // Random max length between 150-350px
        
        // Always create at least 2 bend points for each line
        const numBends = 2 + Math.floor(Math.random() * 2); // 2-3 bends
        const bendPoints = [];
        const segments: {start: Point, end: Point}[] = [];
        
        let currentAngle = angle;
        let currentX = centerX;
        let currentY = centerY;
        let remainingLength = maxLength;
        let isValid = true;
        
        let prevPoint = { x: currentX, y: currentY };
        
        for (let j = 0; j < numBends; j++) {
          // Calculate segment length (divide remaining length more evenly)
          const segmentLength = remainingLength / (numBends - j + 1) * (0.7 + Math.random() * 0.6);
          remainingLength -= segmentLength;
          
          // Calculate this bend point position
          const nextX = currentX + Math.cos(currentAngle) * segmentLength;
          const nextY = currentY + Math.sin(currentAngle) * segmentLength;
          
          // Create new segment
          const newSegment = {
            start: { x: currentX, y: currentY },
            end: { x: nextX, y: nextY }
          };
          
          // Check if this segment would intersect with any existing lines
          if (willIntersectExistingLines(newSegment, newLines)) {
            isValid = false;
            break;
          }
          
          segments.push(newSegment);
          
          // Create bend angle that avoids sharp turns (avoid exact 90 degrees)
          const bendAngle = currentAngle + ((Math.PI / 2) - Math.random() * 0.5) * (Math.random() > 0.5 ? 1 : -1);
          
          bendPoints.push({
            x: nextX,
            y: nextY,
            bendAngle
          });
          
          // Update current position and angle for next segment
          currentX = nextX;
          currentY = nextY;
          currentAngle = bendAngle;
          prevPoint = { x: nextX, y: nextY };
        }
        
        // Add final segment after last bend
        if (isValid && remainingLength > 0) {
          const finalX = currentX + Math.cos(currentAngle) * remainingLength;
          const finalY = currentY + Math.sin(currentAngle) * remainingLength;
          
          const finalSegment = {
            start: { x: currentX, y: currentY },
            end: { x: finalX, y: finalY }
          };
          
          if (willIntersectExistingLines(finalSegment, newLines)) {
            isValid = false;
          } else {
            segments.push(finalSegment);
          }
        }
        
        if (isValid) {
          validLine = true;
          const actualMaxLength = calculateTotalLength(segments);
          
          newLines.push({
            id: i,
            x1: centerX,
            y1: centerY,
            x2: centerX,
            y2: centerY,
            angle,
            length: 0,
            maxLength: actualMaxLength,
            growing: true,
            color: '#00BFFF', // Bright blue color
            width: 3, // Medium thickness
            speed: 1.2 + Math.random() * 0.8, // Slower speed for better visualization
            bendPoints,
            segments,
            currentSegmentIndex: 0,
            progressOnCurrentSegment: 0
          });
        }
      }
      
      // If couldn't create a valid line after max attempts, create a simpler line
      if (!validLine) {
        // Create a simple line with 2 bends in a direction with minimal chance of intersection
        const angle = (Math.PI * 2 * i) / numLines;
        const bendPoints = [];
        const segments: {start: Point, end: Point}[] = [];
        
        let currentX = centerX;
        let currentY = centerY;
        let currentAngle = angle;
        
        // First segment - shorter
        const firstSegLength = 175;
        const firstBendX = currentX + Math.cos(currentAngle) * firstSegLength;
        const firstBendY = currentY + Math.sin(currentAngle) * firstSegLength;
        
        segments.push({
          start: { x: currentX, y: currentY },
          end: { x: firstBendX, y: firstBendY }
        });
        
        bendPoints.push({
          x: firstBendX,
          y: firstBendY,
          bendAngle: currentAngle + Math.PI/4// 45 degree turn
        });
        
        // Second segment
        currentX = firstBendX;
        currentY = firstBendY;
        currentAngle = currentAngle + Math.PI/4;
        
        const secondSegLength = 110;
        const secondBendX = currentX + Math.cos(currentAngle) * secondSegLength;
        const secondBendY = currentY + Math.sin(currentAngle) * secondSegLength;
        
        segments.push({
          start: { x: currentX, y: currentY },
          end: { x: secondBendX, y: secondBendY }
        });
        
        bendPoints.push({
          x: secondBendX,
          y: secondBendY,
          bendAngle: currentAngle - Math.PI/3 // Another turn
        });
        
        // Third segment (final)
        currentX = secondBendX;
        currentY = secondBendY;
        currentAngle = currentAngle - Math.PI/3;
        
        const finalSegLength = 50;
        const finalX = currentX + Math.cos(currentAngle) * finalSegLength;
        const finalY = currentY + Math.sin(currentAngle) * finalSegLength;
        
        segments.push({
          start: { x: currentX, y: currentY },
          end: { x: finalX, y: finalY }
        });
        
        const actualMaxLength = calculateTotalLength(segments);
        
        newLines.push({
          id: i,
          x1: centerX,
          y1: centerY,
          x2: centerX,
          y2: centerY,
          angle,
          length: 0,
          maxLength: actualMaxLength,
          growing: true,
          color: '#00BFFF',
          width: 3,
          speed: 2 + Math.random(),
          bendPoints,
          segments,
          currentSegmentIndex: 0,
          progressOnCurrentSegment: 0
        });
      }
    }
    
    return newLines;
  };

  // Calculate the current position along the line path
  const calculateCurrentPosition = (line: Line): {x: number, y: number, segmentPoints: Point[]} => {
    if (line.length <= 0) {
      return { 
        x: line.x1, 
        y: line.y1,
        segmentPoints: [{ x: line.x1, y: line.y1 }]
      };
    }
    
    let remainingLength = line.maxLength;
    let currentX = line.x1;
    let currentY = line.y1;
    const segmentPoints: Point[] = [{ x: line.x1, y: line.y1 }];
    
    for (let i = 0; i < line.segments.length; i++) {
      const segment = line.segments[i];
      const dx = segment.end.x - segment.start.x;
      const dy = segment.end.y - segment.start.y;
      const segmentLength = Math.sqrt(dx * dx + dy * dy);
      
      if (remainingLength >= segmentLength) {
        // We've passed this entire segment
        currentX = segment.end.x;
        currentY = segment.end.y;
        remainingLength -= segmentLength;
        segmentPoints.push({ x: currentX, y: currentY });
      } else {
        // We're on this segment
        const ratio = remainingLength / segmentLength;
        currentX = segment.start.x + dx * ratio;
        currentY = segment.start.y + dy * ratio;
        segmentPoints.push({ x: currentX, y: currentY });
        break;
      }
    }
    
    return { x: currentX, y: currentY, segmentPoints };
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let stillAnimating = false;
    
    // Update and draw lines
    setLines(prevLines => {
      return prevLines.map(line => {
        // Update line length
        let updatedLine = { ...line };
        
        if (line.growing) {
          updatedLine.length += line.speed;
          if (updatedLine.length >= line.maxLength) {
            updatedLine.growing = false;
            updatedLine.length = line.maxLength;
          }
          stillAnimating = true;
        } else {
          updatedLine.length -= line.speed;
          if (updatedLine.length <= 0) {
            updatedLine.length = 0;
          } else {
            stillAnimating = true;
          }
        }
        
        if (updatedLine.length > 0) {
          // Calculate current position and segments to draw
          const { x, y, segmentPoints } = calculateCurrentPosition(updatedLine);
          
          // Draw the line with glow effect
          ctx.lineCap = 'round';
          
          // Draw with glow effect
          ctx.shadowColor = line.color;
          ctx.shadowBlur = 8;
          ctx.strokeStyle = line.color;
          ctx.lineWidth = line.width;
          
          // Draw line segments
          if (segmentPoints.length > 1) {
            ctx.beginPath();
            ctx.moveTo(segmentPoints[0].x, segmentPoints[0].y);
            
            for (let i = 1; i < segmentPoints.length; i++) {
              ctx.lineTo(segmentPoints[i].x, segmentPoints[i].y);
            }
            
            ctx.stroke();
          }
          
          // Draw leading point with extra glow
          ctx.beginPath();
          ctx.arc(x, y, line.width * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
          
          // Reset shadow for next line
          ctx.shadowBlur = 0;
          
          return { ...updatedLine, x2: x, y2: y };
        }
        
        return updatedLine;
      });
    });
    
    if (stillAnimating) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      setIsAnimating(false);
    }
  };

  const startAnimation = () => {
    if (isAnimating) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Get profile image position
    const profileImg = document.querySelector('.profileImage');
    if (!profileImg) return;
    
    // Get profile position relative to viewport
    const rect = profileImg.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Set canvas size to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create new lines
    setLines(createLines(centerX, centerY));
    setIsAnimating(true);
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Listen for the custom event to trigger animation
    const handleTriggerAnimation = () => {
      startAnimation();
    };
    
    window.addEventListener('triggerTronAnimation', handleTriggerAnimation);
    
    // Also listen for direct clicks on the profile image
    const profileImg = document.querySelector('.profileImage');
    if (profileImg) {
      profileImg.addEventListener('click', startAnimation);
    }
    
    // Handle window resize
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up animation frame and event listeners on unmount
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('triggerTronAnimation', handleTriggerAnimation);
      window.removeEventListener('resize', handleResize);
      if (profileImg) {
        profileImg.removeEventListener('click', startAnimation);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
    />
  );
};

export default TronAnimation;