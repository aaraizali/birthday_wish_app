// src/components/EmojiPicker.tsx

import React from 'react';

const emojis = [
  '😊', '😂', '😍', '😎', '😢', '😡', '🥳', '🤔', '😴', '🤗'
];

interface EmojiPickerProps {
  onEmojiClick: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiClick }) => {
  return (
    <div className="emoji-picker" style={{ display: 'flex', flexWrap: 'wrap', width: '200px', border: '1px solid #ccc', borderRadius: '4px' }}>
      {emojis.map((emoji) => (
        <span
          key={emoji}
          className="emoji"
          style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}
          onClick={() => onEmojiClick(emoji)}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
};

export default EmojiPicker;
