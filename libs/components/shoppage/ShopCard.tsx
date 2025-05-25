import React from "react";
import { Button, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CachedIcon from "@mui/icons-material/Cached";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ProductCard = () => {
  return (
    <div className={"card"}>
      <div className={"discountBadge"}>10% Off</div>
      <div className={"iconGroup"}>
        <IconButton className={"iconBtn"}>
          <SearchIcon />
        </IconButton>
        <IconButton className={"iconBtn"}>
          <CachedIcon />
        </IconButton>
        <IconButton className={"iconBtn"}>
          <FavoriteBorderIcon />
        </IconButton>
      </div>
      <div className={"imagePlaceholder"}></div>

      <Button className={"cartBtn"} variant="contained">
        ADD TO CART
      </Button>

      <div className={"stars"}>
        {"★★★★★".split("").map((star, idx) => (
          <span key={idx} className={"star"}>
            {star}
          </span>
        ))}
      </div>

      <h3 className={"title"}>Fantastic Marble Shoes</h3>
      <div className={"price"}>
        <span className={"newPrice"}>$15.00</span>
        <span className={"oldPrice"}>$25.00</span>
      </div>
    </div>
  );
};

export default ProductCard;
