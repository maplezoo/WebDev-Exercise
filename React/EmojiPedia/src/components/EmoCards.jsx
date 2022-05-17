import React from "react";
import Card from "./Card";

function EmoCards(emoji) {
  return (
    <Card
      key={emoji.id}
      name={emoji.name}
      meaning={emoji.meaning}
      emoji={emoji.emoji}
    />
  );
}

export default EmoCards;
