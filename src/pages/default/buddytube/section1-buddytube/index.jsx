import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react'
import personone from "../../../../assets/final-image/images/person-one.png"
import persontwo from "../../../../assets/final-image/images/person-two.png"

const Sec1BuddyTube = () => {
  return (
    <Box background="linear-gradient(52.19deg, rgba(216, 101, 112, 0) -23.88%, rgba(216, 101, 112, 0.64) 119.64%)" >
       <Flex
       
    p={8}
    
    pt={["20px", "55px"]}
    align="center"
    
    justifyContent={'space-around'}
    gap={1}
    direction={["column-reverse", "row"]}
  >
    <Image
      src={personone}
      alt="Person"
      mt={["20px", ""]}
      w={{
        base: "300px",    // 0px and up
        sm: "300px",       // 480px and up
        md: "400px",    // 768px and up
        lg: "550px"        // 992px and up
      }}
    />
    <Box maxW="500px">
      <Text  align={["center", "end"]}  fontSize="3xl" fontWeight="bold" mb={4}>
      Our Mission at AlterBuddy
      </Text>
      <Text align={["center", "end"]}  fontSize="xl">
      Breaking the Stigma. Empowering Minds & Bodies.
      </Text>
      <Text align={["center", "end"]}  fontSize="xl">
      At AlterBuddy, we’re on a mission to normalize conversations around mental and sexual health. Through awareness, education, compassionate support, and expert care, we strive to build a safe, inclusive space where healing begins and judgment ends.
      </Text>
    </Box>
  </Flex>

  
  <Flex
       
       p={8}
       pt={20}
       align="center"
       
       justifyContent={'space-around'}
       gap={1}
       direction={["column", "row"]}
     >
      
       <Box maxW="500px">
         <Text  align={["center", "end"]} fontSize="3xl" fontWeight="bold" mb={4}>
         Our Mission at AlterBuddy
         </Text>
         <Text align={["center", "end"]}  fontSize="xl">
         Breaking the Stigma. Empowering Minds & Bodies.
         </Text>
         <Text align={["center", "end"]}  fontSize="xl">
         At AlterBuddy, we’re on a mission to normalize conversations around mental and sexual health. Through awareness, education, compassionate support, and expert care, we strive to build a safe, inclusive space where healing begins and judgment ends.
         </Text>
       </Box>
       <Image
         src={persontwo}
         alt="Person"
         w={{
          base: "350px",    // 0px and up
          sm: "350px",       // 480px and up
          md: "450px",    // 768px and up
          lg: "550px"        // 992px and up
        }}
       />
     </Flex>
    </Box>
  )
}

export default Sec1BuddyTube;
