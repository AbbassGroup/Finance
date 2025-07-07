import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'auto'};
  background-color: ${props => props.theme.colors.backgroundLightBlue};
  overflow: hidden;
  border-radius: ${props => props.borderRadius || '0'};
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit || 'cover'};
  opacity: ${props => props.isLoaded ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
  will-change: opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    ${props => props.theme.colors.backgroundLightBlue} 0%,
    ${props => props.theme.colors.backgroundOffWhite} 50%,
    ${props => props.theme.colors.backgroundLightBlue} 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  objectFit,
  borderRadius,
  className,
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;
    
    if (priority) {
      img.fetchPriority = 'high';
    }

    img.onload = () => {
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      setError(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, priority]);

  return (
    <ImageContainer
      width={width}
      height={height}
      borderRadius={borderRadius}
      className={className}
    >
      {!isLoaded && !error && <Placeholder />}
      <StyledImage
        src={src}
        alt={alt}
        isLoaded={isLoaded}
        objectFit={objectFit}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...props}
      />
    </ImageContainer>
  );
};

export default React.memo(OptimizedImage); 