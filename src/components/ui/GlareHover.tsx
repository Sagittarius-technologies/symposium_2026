import React, { useRef, useState, useCallback } from 'react';

interface GlareHoverProps {
    children: React.ReactNode;
    glareColor?: string;
    glareOpacity?: number;
    glareAngle?: number;
    glareSize?: number;
    transitionDuration?: number;
    playOnce?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const GlareHover: React.FC<GlareHoverProps> = ({
    children,
    glareColor = '#ffffff',
    glareOpacity = 0.3,
    glareAngle = -30,
    glareSize = 300,
    transitionDuration = 800,
    playOnce = false,
    className = '',
    style = {},
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [glarePosition, setGlarePosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!containerRef.current) return;
            if (playOnce && hasPlayed) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setGlarePosition({ x, y });
        },
        [playOnce, hasPlayed]
    );

    const handleMouseEnter = useCallback(() => {
        if (playOnce && hasPlayed) return;
        setIsHovering(true);
    }, [playOnce, hasPlayed]);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
        if (playOnce) setHasPlayed(true);
        setGlarePosition({ x: -100, y: -100 });
    }, [playOnce]);

    const glareGradient = `radial-gradient(circle ${glareSize}px at ${glarePosition.x}px ${glarePosition.y}px, ${glareColor} 0%, transparent 100%)`;

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
            style={style}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background: glareGradient,
                    opacity: isHovering ? glareOpacity : 0,
                    transform: `rotate(${glareAngle}deg)`,
                    transition: `opacity ${transitionDuration}ms ease`,
                    mixBlendMode: 'overlay',
                }}
            />
        </div>
    );
};

export default GlareHover;
