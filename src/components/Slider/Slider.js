import React, { useRef } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Avatar from "@material-ui/core/Avatar";

import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import { useStyles } from "./Slider.style";

SwiperCore.use([Navigation]);

export function Slider({
  styles,
  currentStyleActive,
  handleStyleChange,
  ...restProps
}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const classes = useStyles();
  // https://github.com/nolimits4web/swiper/issues/3855
  return (
    <>
      <Swiper
        {...restProps}
        className={classes.wrapper}
        spaceBetween={5}
        slidesPerView={3}
        loop
        navigation={{
          prevEl: prevRef.current ? prevRef.current : undefined,
          nextEl: nextRef.current ? nextRef.current : undefined,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.update();
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {styles.map((item) => (
          <SwiperSlide
            className={classes.slide}
            key={item.id}
            tag="li"
            onClick={() => handleStyleChange(item)}
          >
            <Avatar
              src={`/images/styles/${item.image}`}
              className={classes.large}
            ></Avatar>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={classes.nav}>
        <IconButton ref={prevRef} color="primary" aria-label="add an alarm">
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton ref={nextRef} color="primary" aria-label="add an alarm">
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </>
  );
}
