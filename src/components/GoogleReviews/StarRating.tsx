import React from "react";

interface StarRatingProps {
    rating: number; 
    maxRating?: number;
    size?: number; 
    color?: string; 
}

const StarRating: React.FC<StarRatingProps> = ({
    rating,
    maxRating = 5,
    size = 24,
    color = "gold",
}) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
        <div aria-label={`Rating: ${rating} out of ${maxRating}`} style={{ display: "flex", alignItems: "center" }}>
            {[...Array(maxRating)].map((_, index) => {
                if (index < filledStars) return <Star key={index} size={size} color={color} />;
                if (index === filledStars && hasHalfStar) return <HalfStar key={index} size={size} color={color} />;
                return <Star key={index} size={size} color={color} outline />;
            })}
        </div>
    );
};

const Star: React.FC<{ size: number; color: string; outline?: boolean }> = ({ size, color, outline }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={outline ? "none" : color}
        stroke={color}
        strokeWidth="2"
        aria-hidden="true"
    >
        <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847 1.417 8.264L12 18.897l-7.417 4.962L6 15.595 0 9.748l8.332-1.73z" />
    </svg>
);

const HalfStar: React.FC<{ size: number; color: string }> = ({ size, color }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        aria-hidden="true"
        style={{ position: "relative", overflow: "hidden" }}
    >
        <defs>
            <clipPath id="clip-half-star">
                <rect x="0" y="0" width="50%" height="100%" />
            </clipPath>
        </defs>
        <path
            d="M12 0l3.668 7.431L24 9.748l-6 5.847 1.417 8.264L12 18.897l-7.417 4.962L6 15.595 0 9.748l8.332-1.73z"
            clipPath="url(#clip-half-star)"
            fill={color}
        />
    </svg>
);

export default StarRating;
