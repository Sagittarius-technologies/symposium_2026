import React, { useRef, useState, useCallback, useEffect } from 'react';

interface MagicCardProps {
    children: React.ReactNode;
    enableSpotlight?: boolean;
    enableBorderGlow?: boolean;
    enableStars?: boolean;
    spotlightRadius?: number;
    glowColor?: string;
    className?: string;
}

const MagicCard: React.FC<MagicCardProps> = ({
    children,
    enableSpotlight = true,
    enableBorderGlow = true,
    enableStars = true,
    spotlightRadius = 400,
    glowColor = '59, 130, 246', // Blue color (RGB)
    className = '',
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

    useEffect(() => {
        if (enableStars) {
            const newStars = Array.from({ length: 12 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 2 + 1,
                delay: Math.random() * 2,
            }));
            setStars(newStars);
        }
    }, [enableStars]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    const handleMouseEnter = useCallback(() => setIsHovering(true), []);
    const handleMouseLeave = useCallback(() => setIsHovering(false), []);

    const spotlightStyle = enableSpotlight && isHovering
        ? {
            background: `radial-gradient(circle ${spotlightRadius}px at ${mousePosition.x}px ${mousePosition.y}px, rgba(${glowColor}, 0.15), transparent 80%)`,
        }
        : {};

    const borderGlowStyle = enableBorderGlow && isHovering
        ? {
            boxShadow: `0 0 20px rgba(${glowColor}, 0.3), 0 0 40px rgba(${glowColor}, 0.1), inset 0 0 60px rgba(${glowColor}, 0.05)`,
            borderColor: `rgba(${glowColor}, 0.5)`,
        }
        : {};

    return (
        <div
            ref={cardRef}
            className={`relative overflow-hidden transition-all duration-300 ${className}`}
            style={{
                ...borderGlowStyle,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Spotlight overlay */}
            {enableSpotlight && (
                <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                    style={{
                        ...spotlightStyle,
                        opacity: isHovering ? 1 : 0,
                    }}
                />
            )}

            {/* Stars */}
            {enableStars && isHovering && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {stars.map((star) => (
                        <div
                            key={star.id}
                            className="absolute rounded-full bg-white animate-pulse"
                            style={{
                                left: `${star.x}%`,
                                top: `${star.y}%`,
                                width: `${star.size}px`,
                                height: `${star.size}px`,
                                animationDelay: `${star.delay}s`,
                                opacity: 0.6,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
};

export default MagicCard;
