import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeartButton = () => {
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setBookmarked(!bookmarked);
    const message = bookmarked
      ? "Removed from bookmarks"
      : "Added to bookmarks";
    toast.info(message);
  };

  return (
    <div
      className="relative hover:opacity-80 transition cursor-pointer"
      onClick={handleBookmarkClick}
    >
      {bookmarked ? (
        <AiFillHeart size={24} className="fill-rose-500" />
      ) : (
        <AiOutlineHeart
          size={24}
          className="  fill-white   hover:fill-rose-500"
        />
      )}
    </div>
  );
};

export default HeartButton;
