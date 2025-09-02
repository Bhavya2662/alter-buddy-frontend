// React & Routing
import React from "react";
import { Link } from "react-router-dom";

// Chakra UI Components
import {
  Box,
  Flex,
  Image,
  Text,
  Grid,
  GridItem,
  Textarea,
  Button,
  Input,
} from "@chakra-ui/react";

// Assets
import phn from "../../../assets/final-image/icons/call.png";
import loc from "../../../assets/final-image/icons/location.png";
import email from "../../../assets/final-image/icons/email.png";

const Contact = () => {
  return (
    <Box className="main-container">
      <Box
        background={
          "linear-gradient(95.65deg, rgba(255, 255, 255, 0.42) -13.19%, rgba(254, 118, 168, 0.7) 114.3%)"
        }
      >
        <Flex
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          h={{ base: "150px", md: "200px", lg: "250px" }}
        >
          <Text
            fontSize={{ base: "24px", md: "40px", lg: "50px" }}
            fontWeight={"bold"}
          >
            Contact <span style={{ color: "var(--peach)" }}>Us</span>
          </Text>
          <Text
            fontSize={{ base: "18px", md: "20px", lg: "24px" }}
            fontWeight={"medium"}
            mt={2}
            cursor={"pointer"}
            color={"#788094"}
            textAlign={"center"}
          >
            <Link to={"/"}>Home</Link> /{" "}
            <span style={{ color: "var(--peach)" }}>Contact</span>
          </Text>
        </Flex>
      </Box>

      <Flex
        border={"none"}
        marginY={"40px"}
        paddingY={"20px"}
        alignItems={{ base: 'start', md: "start", lg: 'center' }}
        flexDirection={{ base: 'column', md: 'column', lg: 'row' }}
        width={"90%"}
        marginX={"auto"}
        boxShadow={"0px 0px 13px #A0AEC0"}
        borderRadius={"20px"}
        justifyContent={'space-between'}
        px={{ base: 4, md: 6, lg: 10 }}
        gap={6}
      >
        <Flex justifyContent={"center"} >
          <Flex alignItems={"center"}>
            <Image width={"50px"} src={phn}></Image>
            <Flex marginLeft={"10px"} flexDirection={"column"}>
              <Text textColor={"#A0AEC0"}>Phone Number</Text>
              <Text fontWeight={"bold"} textColor={"#1A202C"}>
                +91 7718845776
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex justifyContent={"center"} >
          <Flex alignItems={"center"}>
            <Image width={"50px"} src={email}></Image>
            <Flex marginLeft={"10px"} flexDirection={"column"}>
              <Text textColor={"#A0AEC0"}>Email Address</Text>
              <Text fontWeight={"bold"} textColor={"#1A202C"}>
                cheer@alterbuddy.com
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex justifyContent={"center"} width={{ base: 'auto', md: "auto", lg: '40%' }}>
          <Flex alignItems={"center"}>
            <Image width={"50px"} src={loc}></Image>
            <Flex marginLeft={"10px"} flexDirection={"column"}>
              <Text textColor={"#A0AEC0"}>Location</Text>
              <Text fontWeight={"bold"} textColor={"#1A202C"}>
                Whispering Palms xx_clusive, Lokhandwala Complex, Kandivali East, Mumbai - 400101, Maharashtra              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        marginY={"40px"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={{
          base: "column",
          sm: "column",
          md: "column",
          lg: "row",
        }}
        width={"90%"}
        marginX={"auto"}
      >
        <Box
          width={{ base: "100%", sm: "100%", md: "100%", lg: "48%" }}
          padding={"8"}
          border={"none"}
          borderRadius={"20px"}
          boxShadow={"0px 0px 13px #A0AEC0"}
        >
          <form action="">
            <Grid
              w="100%"
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(4, 1fr)"
              gap={4}
            >
              <GridItem colSpan={2}>
                <Text fontSize={"sm"} fontWeight={"lg"}>
                  First Name
                </Text>
                <Input
                  type="text"
                  focusBorderColor="#CBD5E1"
                  placeholder="Enter first name"
                  paddingY={"2px"}
                  borderRadius={"5px"}
                  paddingX={"4"}
                  border={"2px solid #CBD5E1"}
                />
              </GridItem>
              <GridItem colSpan={2}>
                <Text fontSize={"sm"} fontWeight={"lg"}>
                  Last Name
                </Text>
                <Input
                  type="text"
                  focusBorderColor="#CBD5E1"
                  placeholder="Enter last name"
                  paddingY={"2px"}
                  borderRadius={"5px"}
                  paddingX={"4"}
                  border={"2px solid #CBD5E1"}
                />
              </GridItem>
              <GridItem colSpan={4}>
                <Text fontSize={"sm"} fontWeight={"lg"}>
                  Phone Number
                </Text>
                <Input
                  type="text"
                  focusBorderColor="#CBD5E1"
                  placeholder="Enter your phone number"
                  paddingY={"2px"}
                  borderRadius={"5px"}
                  paddingX={"4"}
                  border={"2px solid #CBD5E1"}
                />
              </GridItem>
              <GridItem colSpan={4}>
                <Text fontSize={"sm"} fontWeight={"lg"}>
                  Email Address
                </Text>
                <Input
                  type="text"
                  focusBorderColor="#CBD5E1"
                  placeholder="Enter your email address"
                  paddingY={"2px"}
                  borderRadius={"5px"}
                  paddingX={"4"}
                  border={"2px solid #CBD5E1"}
                />
              </GridItem>
              <GridItem colSpan={4}>
                <Text fontSize={"sm"} fontWeight={"lg"}>
                  Message
                </Text>

                <Textarea
                  focusBorderColor={"#CBD5E1"}
                  height={"150px"}
                  paddingY={"4px"}
                  placeholder="Type your queries or suggestions here"
                  borderRadius={"5px"}
                  border={"2px solid #CBD5E1"}
                  paddingX={"4"}
                />
              </GridItem>
            </Grid>
            <Button
              variant="solid"
              marginTop={"25px"}
              borderRadius={"20px"}
              bg="#D86570"
              color="white"
              _hover={{}}
            >
              Send Message
            </Button>
          </form>
        </Box>
        <Box
          height={"530px"}
          marginY={{ base: "20px", sm: "20px", md: "20px", lg: "0px" }}
          width={{ base: "100%", sm: "100%", md: "100%", lg: "48%" }}
          border={"none"}
          borderRadius={"20px"}
          boxShadow={"0px 0px 13px #A0AEC0"}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.93646691673!2d72.87249179999999!3d19.197977099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7157942098f%3A0xe18f13b885e3b640!2sWhispering%20Palms%20Xxclusive!5e0!3m2!1sen!2sin!4v1743804249506!5m2!1sen!2sin&zoom=15&disableDefaultUI=true&mapTypeControl=false&marker=false"
            width="100%"
            height={"100%"}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
      </Flex>

    </Box>
  );
};

export default Contact;
