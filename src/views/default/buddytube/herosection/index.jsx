import React, { useRef } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";

import heroImg from "../../../../assets/final-image/images/heroImg.png";


const MotionBox = motion(Box);

const HeroSectionBuddy = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // starts when section enters viewport
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -200]); // move left

  return (
    <>
      {/* Spacer before for scrolling */}
      
      <Box>
        {/* Hero Section */}
        <Box
          ref={ref}
          
          bg="#D86570"
          position="relative"
          mt={{
            base: "-20px",    // 0px and up
            sm: "-20px",       // 480px and up
            md: "-34px",    // 768px and up
            lg: "-34px"        // 992px and up
          }}
          px={{
            base: "1px",    // 0px and up
            sm: "1px",       // 480px and up
            md: "12px",    // 768px and up
            lg: "0px"        // 992px and up
          }}
        >
          {/* Group Image */}
          <Image
            src={heroImg}
            alt="Group"
            w="100%"
            
            mt={8}
          />

          {/* Scroll-Animated Person */}
          {/* <MotionBox
            style={{ x }}
            position="absolute"
            top="22%"
            left="52%"
            transform="translate(-50%, -50%)"
          >
            <Image
              src={onePerson}
              alt="Person"
              w="250px"
            />
          </MotionBox> */}
        </Box>

        
      </Box>
    </>
  );
};

export default HeroSectionBuddy;
