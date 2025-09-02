// React Router
import { Link } from "react-router-dom";

// Chakra UI Components
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text
} from "@chakra-ui/react";

import story1 from "../../../assets/final-image/images/our-story-1.jpg";
import story2 from "../../../assets/final-image/images/our-story-2.jpg";

// Components
import AboutUs from "../../../component/about-us";
import FAQs from "../../../component/faqs";
import OurTeam from "../../../component/our-expert";
import ProblemStatement from "./component/problem-statement";
import Testimonial from "../../../component/testimonial";
import WhyChoose from "../../../component/why-choose";

const About = () => {
  return (
    <>
      <Box className="main-container">

        {/* Hero Section */}
        <Box bgColor={"#F4F0F1"}>
          <Flex
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            h={{ base: "150px", md: "200px", lg: "250px" }}
          >
            <Text letterSpacing={1} mt={{ base: 6, md: 6, lg: 6 }} color={'black'} className='heading' >
                        GET TO KNOW YOUR MENTORS!
                    </Text>
            {/* <Text
              fontSize={{ base: "18px", md: "20px", lg: "24px" }}
              fontWeight={"medium"}
              mt={2}
              cursor={"pointer"}
              color={"#788094"}
              textAlign={"center"}
            >
              <Link to={"/"}>Home</Link> /{" "}
              <span style={{ color: "var(--peach)" }}>About</span>
            </Text> */}
          </Flex>
        </Box>

        {/* About Us Section */}
        <Box pt={4} pb={{ base: 0, md: 12 }}>
          <AboutUs />
        </Box>

        {/* Problem Statement Section */}
        {/* <Box pt={{ base: 0, md: 8 }} pb={8}>
          <Box className="section-container">
            <ProblemStatement />
          </Box>
        </Box> */}

        <center>
                        <Button mt={8} bg={'var(--peach)'} color={'white'} w={'fit-content'} px={6} colorScheme='' py={6} rounded={'full'} fontWeight={500} fontSize={'18px'}>
                            Our Story
                        </Button>
                    </center>

        <Box>
                        <Box className="section-container" pt={{ base: 10, md: 8 }} pb={4}>
                        
                        
                            <Flex gap={{ base: 6, md: 10 }} justifyContent={'space-between'}
                                
                                flexDirection={{ base: 'column-reverse', md: 'row' }}>
                                <Box>
                                <Text fontSize={'32px'} className='heading' color={'var(--peach)'}>CA Aneel Gambhir</Text>
                                    <Text className='paragraph' color={'#636E88'} fontSize={'20px'}  mt={8} w={{ base: '100%', md: '90%' }}>
                                    My dad wears many hats, but the one I see him in most often is that of a calm guide. As the Chief Financial Officer of DTDC, he’s no stranger to numbers, pressure, or big decisions. And at AlterBuddy, he’s the one making sure we never lose direction - or <Box as="span" fontWeight={600}>funding</Box>. His support has given me the freedom to dream without worrying about how to keep the lights on.
                                    </Text>
                                    <Text className='paragraph' color={'#636E88'} fontSize={'20px'}  mt={4} w={{ base: '100%', md: '90%' }}>
                                    Most people chase investors. I just walked into the living room. AlterBuddy wouldn’t exist without him- he believed in the idea before anyone else even heard it. (THANK YOU PAPA)
                                    </Text>
                                    
                                </Box>
                                <Box>
                                    <Image border={'2px'} src={story1} alt="sec2Img" width={'800px'} />
                                </Box>
                            </Flex>
        
                        </Box>
                       
                    </Box>

                    <Box>
                        <Box className="section-container" pt={{ base: 4, md: 4 }} pb={12}>
                        
                        
                            <Flex mt={6} gap={{ base: 6, md: 10 }} justifyContent={'space-between'}
                                
                                flexDirection={{ base: 'column', md: 'row' }}>
                                  <Box >
                                    <Image border={'2px'} width={'800px'} src={story2} alt="sec2Img" />
                                </Box>
                                <Box>
                                <Text fontSize={'32px'} className='heading' color={'var(--peach)'}>Dr. Jagdish Kumar Arora</Text>
                                    <Text  fontSize={'20px'}  color={'#636E88'} className="paragraph" mt={8} w={{ base: '100%', md: '90%' }}>
                                    You won’t find him in meetings or behind a desk. But his presence is felt in every heartbeat of AlterBuddy.. He has spent his life giving: helping the poor, and offering free treatments to those in need.He is not just my inspiration- he is one of the two pillars that made AlterBuddy possible. His generosity didn’t stop there, it reached me personally.
                                    </Text>
                                    <Text fontSize={'20px'} color={'#636E88'} className="paragraph" mt={4} w={{ base: '100%', md: '90%' }}>
                                    Today, I have a vision. I have comfort. <Box as="span" fontWeight={600}>Because of him</Box>.If AlterBuddy had a soul, Nana would be it. His support made my life- and this platform- rich in every sense.
                                    </Text>
                                    
                                </Box>
                                
                            </Flex>
        
                        </Box>
                       
                    </Box>

        {/* Our Team Section */}
        <Box pt={10} pb={{ base: 10, md: 14 }}>
          <Box className="section-container">
            <OurTeam />
          </Box>
        </Box>



        {/* Why Choose Us Section */}
        {/* <Box pt={6} pb={{ base: 10, md: 14 }}>
          <Box className="section-container" pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }} bgColor={'#F3EFF0'}>
            <WhyChoose />
          </Box>
        </Box> */}

        {/* Testimonial Section */}
        {/* <Box pt={10} pb={{ base: 10, md: 14 }}>
          <Box>
            <Testimonial />
          </Box>
        </Box> */}

        {/* FAQs Section */}
        {/* <Box pt={6} pb={{ base: 10, md: 14 }}>
          <Box className="section-container">
            <Flex marginX="auto" flexDirection="column" width="100%">
              <Flex justifyContent="center" pb={4}>
                <Heading mt={6} size="lg">
                  Frequently Asked Questions
                </Heading>
              </Flex>
              <FAQs />
            </Flex>
          </Box>
        </Box> */}

      </Box>
    </>
  );
};

export default About;
