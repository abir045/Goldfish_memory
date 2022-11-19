import React from "react";

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card relative">
      <div className={flipped ? "flipped" : ""}>
        <img
          className="front border-2 border-solid border-white "
          src={card.src}
          alt="card front"
        />

        <img
          className="back border-2 border-solid border-white "
          src="/img/cover.png"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SingleCard;
