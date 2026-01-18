import { Box, IconButton, Typography } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useRef, useState } from 'react';

interface ImageEditorProps {
  image: string | null | undefined;
  onImageChange: (file: File) => void;
  onImageRemove?: () => void;
  width?: string | number;
  height?: string | number;
}

const ImageEditor: React.FC<ImageEditorProps> = ({
                                                   image,
                                                   onImageChange,
                                                   onImageRemove,
                                                   width = '100%',
                                                   height = '300px',
                                                 }) => {
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageChange(file);
      setTransform({ x: 0, y: 0, scale: 1 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!image) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - transform.x,
      y: e.clientY - transform.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !image) return;

    setTransform(prev => ({
      ...prev,
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!image) return;
    e.preventDefault();

    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.5, Math.min(3, transform.scale * delta));

    setTransform(prev => ({
      ...prev,
      scale: newScale,
    }));
  };

  const handleRemove = () => {
    onImageRemove?.();
    setTransform({ x: 0, y: 0, scale: 1 });
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleAddImageClick = () => {
    inputRef.current?.click();
  };

  return (
      <Box
          ref={containerRef}
          sx={{
            width,
            height,
            border: '2px dashed #826C5C',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f5f5f0',
            position: 'relative',
            overflow: 'hidden',
            cursor: image ? (isDragging ? 'grabbing' : 'grab') : 'pointer',
            userSelect: 'none',
            flexShrink: 0,
            '&:hover': {
              borderColor: '#8B7355',
              bgcolor: '#dfdfda',
            },
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
      >
        {image ? (
            <Box
                component="img"
                src={image}
                alt="Preview"
                sx={{
                  maxWidth: 'none',
                  maxHeight: 'none',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                  transition: isDragging ? 'none' : 'transform 0.1s',
                  pointerEvents: 'none',
                }}
            />
        ) : (
            <Box
                onClick={handleAddImageClick}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                }}
            >
              <PhotoCameraIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Добавить картинку
              </Typography>
            </Box>
        )}

        {/* Input всегда скрыт, управляется через handleAddImageClick */}
        <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{
              display: 'none', // Всегда скрыт
            }}
        />

        {image && (
            <>
              <IconButton
                  onClick={handleRemove}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'rgba(211, 47, 47, 0.9)',
                    color: 'white',
                    zIndex: 2,
                    '&:hover': { bgcolor: 'rgba(211, 47, 47, 1)' },
                  }}
              >
                <DeleteIcon />
              </IconButton>

              <Box
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    left: 8,
                    right: 8,
                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    textAlign: 'center',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }}
              >
                Перетащите для перемещения, колесико для масштаба
              </Box>
            </>
        )}
      </Box>
  );
};

export default ImageEditor;