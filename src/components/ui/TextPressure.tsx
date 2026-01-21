import React, { useRef, useState, useEffect, useCallback } from 'react';

interface TextPressureProps {
    text: string;
    textColor?: string;
    strokeColor?: string;
    minFontSize?: number;
    weight?: boolean;
    width?: boolean;
    italic?: boolean;
    alpha?: boolean;
    stroke?: boolean;
    flex?: boolean;
    className?: string;
}

const TextPressure: React.FC<TextPressureProps> = ({
    text,
    textColor = '#ffffff',
    strokeColor = '#5227FF',
    minFontSize = 36,
    weight = true,
    width = true,
    italic = true,
    alpha = false,
    stroke = false,
    flex = true,
    className = '',
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [chars, setChars] = useState<Array<{ char: string; style: React.CSSProperties }>>([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const calculateStyles = useCallback(() => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = mousePos.x;
        const centerY = mousePos.y;
        
        const newChars = text.split('').map((char, index) => {
            // Calculate approximate character position
            const charWidth = rect.width / text.length;
            const charX = charWidth * index + charWidth / 2;
            const charY = rect.height / 2;
            
            // Calculate distance from mouse
            const dx = centerX - charX;
            const dy = centerY - charY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = Math.max(rect.width, rect.height);
            const normalizedDistance = Math.min(distance / maxDistance, 1);
            
            // Calculate variable font properties based on distance
            const fontWeight = weight ? Math.round(900 - normalizedDistance * 600) : 400;
            const fontStretch = width ? Math.round(150 - normalizedDistance * 50) : 100;
            const fontStyle = italic && normalizedDistance < 0.3 ? 'italic' : 'normal';
            const opacity = alpha ? 1 - normalizedDistance * 0.5 : 1;
            
            const style: React.CSSProperties = {
                fontWeight,
                fontStretch: `${fontStretch}%`,
                fontStyle,
                opacity,
                color: textColor,
                WebkitTextStroke: stroke ? `1px ${strokeColor}` : 'none',
                transition: 'all 0.15s ease-out',
                display: 'inline-block',
            };
            
            return { char: char === ' ' ? '\u00A0' : char, style };
        });
        
        setChars(newChars);
    }, [text, mousePos, weight, width, italic, alpha, stroke, textColor, strokeColor]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        // Reset to center when mouse leaves
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({ x: rect.width / 2, y: rect.height / 2 });
    }, []);

    useEffect(() => {
        calculateStyles();
    }, [calculateStyles]);

    useEffect(() => {
        // Initialize with center position
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({ x: rect.width / 2, y: rect.height / 2 });
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className={`${flex ? 'flex items-center justify-center' : ''} cursor-default select-none ${className}`}
            style={{ fontSize: `${minFontSize}px`, fontFamily: "serif" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {chars.map((item, index) => (
                <span key={index} style={item.style}>
                    {item.char}
                </span>
            ))}
        </div>
    );
};

export default TextPressure;
