// React Router & Chakra UI
import { Box, Button, Flex, Image, Text, Heading, Icon, Stack, UnorderedList, ListItem, VStack, SimpleGrid, HStack } from '@chakra-ui/react';
import { MinusIcon, PhoneIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { FaQuoteLeft } from "react-icons/fa";
import { CheckCircleIcon } from "@chakra-ui/icons";

// Images
import heroImg from "../../../assets/final-image/images/hero-sec-img.png";
import sec2Img from "../../../assets/new-images/images/rantvant-sec2-img.png";
import step1 from "../../../assets/final-image/images/step-img1.png"
import step2 from "../../../assets/final-image/images/step-img2.png"
import step3 from "../../../assets/final-image/images/step-img3.png"


//icons
import icon1 from "../../../assets/final-image/icons/icon1.png";
import icon2 from "../../../assets/final-image/icons/icon2.png";
import icon3 from "../../../assets/final-image/icons/icon3.png";
import icon4 from "../../../assets/final-image/icons/icon4.png";


// Components - Shared
import Navbar from '../../../component/navbar';
import Footer from '../../../component/footer';
import AboutUs from '../../../component/about-us';
import OurExpert from '../../../component/our-expert';
import WhyChoose from '../../../component/why-choose';
import Testimonial from "../../../component/testimonial";
import FAQs from "../../../component/faqs";

// Components - Page Specific
import Services from './components/services';
import StepToBook from './components/step-to-book';
import ExploreWebApp from './components/explore-web-app';
import { useAuthenticationSlice } from '../../../redux/features';
import WhatYouGain from '../services/dating-relationship/component/what-gain';
import { useState } from 'react';
import { motion } from "framer-motion";

// Wrap Chakra component with motion
const MotionHeading = motion(Heading);

const wishListing = [
  "You will have the most loving soulmate in the entire universe.",
      "You will have the person you crave for, chase you like crazy.",
      "You will attract plenty of money.",
      "You will have the most awesome career.",
      "You will reach ladders of success like nobody else.",
      "You will live the healthiest Life.",
      "You will have the looks of an angel.",
      "You will live a life of contentment and satisfaction.",
];

const ageGroups = [
  {
    id: "13-25",
    label: "13 - 24 Years",
    para:"Are you aged between 13 years-25 years who is facing:",
    points: [
      "Unnoticed Admiration",
      "Relationship Issues",
      "Academic pressure or exam stress",
      "Social anxiety",
      "Peer pressure",
      "Identity and confidence issues",
      "Body Shaming / Self Image",
      "Bullying",
      "Family Conflicts",
      "Break-up Trauma",
      "Uncertainty about your career choices",
      "Substance abuse / Addiction of any sort",
      "Coping with transitions like moving away or starting college"
    ],
    footer: ""
  },
  {
    id: "25-50",
    label: "25 - 50 Years",
    para:"Are you Aged between 25 to 50 who is facing:",
    points: [
      "Rejection in marriage or love",
      "In love with someone who doesn’t want you",
      "Work stress and burnout",
      "Stress at Home",
      "Loneliness",
      "Issues on Being Single",
      "Societal Pressure",
      "Pressure of Work-Life Balance",
      "Marital problems or divorce",
      "Issues of not being able to have a child",
      "Financial stress & managing debt",
      "Coping with aging parents",
      "Career problems",
      "Health concerns",
      "Existential questions about your life’s purpose",
      "Issues of spouse and Parents not getting along",
      "Dealing with children leaving home",
      "Feeling stuck or unfulfilled in life"
    ],
    footer: ""
  },
  {
    id: "50+",
    label: "Above 50 Years",
    para:"Are you Aged above 50 who:",
    points: [
      "Has problems in adjusting to retirement",
      "Is facing loneliness, especially after the loss of loved ones",
      "Has health concerns",
      "Has problems coping with age-related changes",
      "Is dealing with regrets or past unresolved issues",
      "Struggles to maintain mental sharpness",
      "Is facing financial worries",
      "Is seeking purpose and meaning in life"
    ],
    footer: ""
  }
];


const features = [
 {
  cont:"EXPERT CARE",
  img:icon1,
},
  {
    cont:"INSTANT HELP",
  img:icon2,
  },
  {
    cont:"YOUR SAFE SPACE",
  img:icon3,
},
  {
    cont:"EXPERIENCED TEAM",
  img:icon4,
},
];


const Index = () => {

  const [selectedAgeGroup, setSelectedAgeGroup] = useState("13-25");

  const activeGroup = ageGroups.find((group) => group.id === selectedAgeGroup);

  const steps = [
    {
      title: "CHOOSE YOUR MENTOR.",
      description: "Choose your pick, from the list of our experts.",
      image: step1,
    },
    {
      title: "SAY HI OVER A CHAT OR CALL",
      description: "Start a conversation with them.",
      image: step2,
    },
    {
      title: "GET HELP INSTANTLY",
      description: "Share your problem and heal beautifully.",
      image: step3,
    },
  ];
  const navigate = useNavigate();
  const { authentication } = useAuthenticationSlice();

  return (
    <>
      <Box >
        <Box className='section-container' pt={{ base: 28, md: 12, lg: 28 }} bgColor={'#F4F0F1'} h={'100%'} >
          <Flex alignItems={'center'} justifyContent={'space-between'} gap={0} h={'100%'}
            direction={{ base: 'column', md: 'row' }}
          >
            <Box width={{ base: '100%', md: '55%' }} pb={{ base: 2, md: 4, lg: 2 }}>
            {/* <MotionHeading
      fontSize="4xl"
      fontWeight="bold"
      textAlign="center"
      mt={10}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      Welcome to My Page
    </MotionHeading> */}
              <Text color={'black'} className='heading'>DISCOVER LIFE’S BRIGHTER SIDE <br /> WITH YOUR PERSONAL COACHES AT</Text>
              <Text color={'var(--peach)'} className='heading'>ALTERBUDDY</Text>

              <Flex gap={'2'} marginTop={'18px'} flexDirection={'column'}>
                <Text color={'gray.600'} fontWeight={'700'} fontSize={'20px'}><MinusIcon marginRight={'5px'} /> MENTAL HEALTH BUDDIES AND COMPASSIONATE HEALERS
                </Text>
                <Text color={'gray.600'} fontWeight={'700'} fontSize={'20px'}><MinusIcon marginRight={'5px'} />  ENERGY WORK EXPERTS AND MANIFESTATION GENIES
                </Text>
                <Text color={'gray.600'} fontWeight={'700'} fontSize={'20px'}><MinusIcon marginRight={'5px'} /> DATING AND RELATIONSHIP COACHES</Text>
              </Flex>
              <Text fontWeight={600} fontSize={'22px'} mt={{ base: 5, md: 3, lg: 8 }} width={{ base: '100%', md: '95%', lg: '85%' }} className='paragraph' color={'var(--peach)'}>
                Take your first step to create a life you desire.</Text>
              <Button mt={{ base: 6, md: 4, lg: 10 }} bg={'var(--peach)'} color={'white'}
                w={{ base: '70%', md: '50%', lg: '40%' }} py={{ base: 6, md: 6, lg: 8 }} rounded={'full'}
                fontWeight={600} fontSize={{ base: '16px', md: '16px', lg: '18px' }} onClick={() => {
                  if(!authentication){
                    navigate('/sign-in')

                  }else{
                    navigate('/mentor/list')

                  }
                }
                  
                } colorScheme=''>TALK TO OUR EXPERTS NOW!</Button>
            </Box>
            <Box width={{ base: '100%', md: '45%' }}>
              <Image src={heroImg} display={{ base: 'none', md: "block", lg: "block" }} alt='heroImage' width={'100%'} h={{ base: '100%', md: '350px', lg: '100%' }} />
            </Box>
          </Flex>
        </Box>


        <Box className='section-container'>
        <Box py={10} px={4}>
      <Text
        fontSize="4xl"
        textAlign="center"
        textTransform="capitalize"
        
        fontWeight={'bold'}
        mb={5}
      >
        We Understand your{" "}
        <Box as="span" fontWeight="bold" color="#D86570">
          Problems/Traumas
        </Box>
      </Text>

      <Text
        maxW="80%"
        mx="auto"
        textAlign="center"
        fontSize="xl"
        fontWeight="semibold"
        color="gray.600"
      >
        NOTE:- Problems mentioned in a specific age band{" "}
        <Box as="span" color="#D86570">
          can resonate with anyone
        </Box>
        , not just limited to that group.
      </Text>

      <Box py={10} px={6}>
      <HStack spacing={4} justify="center" flexWrap="wrap" mb={8}>
        {ageGroups.map(({ id, label }) => (
          <Button
            key={id}
            onClick={() => setSelectedAgeGroup(id)}
            variant={selectedAgeGroup === id ? "solid" : "outline"}
            colorScheme="gray"
           
            borderRadius="full"
            px={6}
            py={2}
            fontWeight="semibold"
          >
            {label}
          </Button>
        ))}
      </HStack>

      <Box maxW="6xl" mx="auto">
      <Text my={8} fontSize={'lg'} fontWeight={600}>{activeGroup.para}</Text>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
        {activeGroup.points.map((point, index) => {
    const columns = 3; // Match your `md` breakpoint
    const isLast = index === activeGroup.points.length - 1;
    const isAloneInLastRow = activeGroup.points.length % columns === 1 && isLast;

    return (
      <Box
        key={index}
        gridColumn={isAloneInLastRow ? "1 / -1" : "auto"}
        display={isAloneInLastRow ? "flex" : "block"}
        justifyContent={isAloneInLastRow ? "center" : "flex-start"}
      >
        <HStack
         key={index}
         align="start"
         border={'2px solid var(--peach)'} rounded={'full'} py={{base:3, md:4}} bg={'var(--lightpeach)'} px={4}
                     whiteSpace={'wrap'}
         p={4}
        
         shadow="sm"
         _hover={{ shadow: "md" }}
        >
          
          <Text fontSize="md" color="gray.700">
            {point}
          </Text>
        </HStack>
      </Box>
    );
  })}
        </SimpleGrid>

        {activeGroup.footer && (
          <Text mt={6} fontSize="lg" fontWeight="bold" color="#D86570" textAlign="center">
            {activeGroup.footer}
          </Text>
        )}
      </Box>
    </Box>
    </Box>
        </Box>

        <Flex  justifyContent={'center'} alignItems={'center'}>
                                     <Button mb={{ base: 6, md: 4, lg: 10 }} bg={'var(--peach)'} color={'white'} px={8} py={{ base: 6, md: 6, lg: 7 }} rounded={'full'} fontWeight={600} fontSize={{ base: '16px', md: '16px', lg: '18px' }} onClick={() => {
                  if(!authentication){
                    navigate('/sign-in')

                  }else{
                    navigate('/mentor/list')

                  }
                }}  colorScheme=''>GET IN TOUCH WITH US</Button>
                                      </Flex>

        <Box className='section-container' bg="#FFF5F6" py={16} px={{ base: 6, md: 20 }} color="gray.700">
      <VStack spacing={4}   textAlign="center">
        <Heading size="lg" color="#D86570">
          Heal Your Energy, Transform Your Life
        </Heading>
        <Text fontSize="lg">
          People and sometimes the situations around us are so toxic, that we feel everything bad happens only to us, making us bitter.
        </Text>
        <Text fontSize="lg">
          And unconsciously, we send so many negative energies to the universe, that it has no choice but to return the same back to us, making us even more miserable.
        </Text>
        <Text fontSize="lg" fontWeight="semibold" color="#D86570">
          The universe has made it really simple for us to understand:
          <br />
          ‘Whatever you give me, so shall you get back’.
        </Text>
        <Text fontSize="lg">
          And we are here to help you become the best version of yourself with only a positive aura all around you, making sure the universe is at your side granting you everything you desire.
        </Text>
        <Text fontSize="lg">
          We get you out of all your traumas and negativity, however bad and toxic the situation is for you, healing your wounds from within, at the cellular level.
        </Text>
        <Text fontSize="lg">
          We believe that everyone deserves to live a life filled with joy and fulfillment. And we are here to give you exactly that.
        </Text>
      </VStack>
      <Flex mt={12} justifyContent={'center'} alignItems={'center'}>
                              <Button mb={{ base: 2, md: 4, lg: 4 }} bg={'var(--peach)'} color={'white'}
                                           px={8} py={{ base: 6, md: 6, lg: 7 }} rounded={'full'}
                                                fontWeight={600} fontSize={{ base: '16px', md: '16px', lg: '18px' }} 
                                                onClick={() => {
                                                  if(!authentication){
                                                    navigate('/sign-in')
                                
                                                  }else{
                                                    navigate('/mentor/list')
                                
                                                  }
                                                }}  colorScheme=''>TALK TO US</Button>
                                </Flex>
    </Box>


        {/* about us section */}
        {/* <Box mt={2} pb={{ base: 10, md: 12 }}>
          <AboutUs />
        </Box> */}

        {/* our expert section */}
        {/* <Box className='section-container' pt={{ base: 10, md: 16 }} pb={12} bgColor={'#F4F0F1'}>
          <OurExpert />
        </Box> */}

        {/* How we wish */}
        <Box>
                <Box className="section-container" pt={{ base: 10, md: 16 }} pb={12}>
                  <Flex
                    gap={{ base: 6, md: 10 }}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    flexDirection={{ base: "column", md: "row" }}
                  >
                    <Box>
                      <Text className="heading" color={"var(--peach)"}>
                        HOW WE WISH
                      </Text>
                      <Text
                        className="paragraph"
                        mt={4}
                        w={{ base: "100%", md: "90%" }}
                      >
                       There would be a genie, who would come out of a lamp and say:
                      </Text>
                      <UnorderedList mt={6} spacing={4}>
                        {wishListing.map((list, index) => (
                          <ListItem key={index}>{list}</ListItem>
                        ))}
                      </UnorderedList>
                    </Box>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                      <Image
                        src={sec2Img}
                        alt="sec2Img"
                        w={"70%"}
                        h={"100%"}
                        maxH={"800px"}
                      />
                    </Box>
                  </Flex>
                  <Box mt={6}>
                  <Text fontSize={'20px'} fontWeight={'700'} color={"var(--peach)"}>
                  And what if I say that any or all of these are possible?
                      </Text>
                      <Text
                        className="paragraph"
                        mt={4}
                        w={{ base: "100%", md: "90%" }}
                      >
                       With our services,we help you manifest and attract the right energies towards you, with the right mindset.
                      </Text>
                  </Box>
                </Box>
               
              </Box>

        {/* our services section */}
        <Box className='section-container' pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }} >
          <Services />
        </Box>

        {/* why choose us section */}
        <Box className='section-container' pt={{ base: 10, md: 6 }} pb={{ base: 10, md: 16 }} bgColor={'#F3EFF0'}>
          <WhyChoose />
        </Box>

        <Box bg="white" py={20}>
      <VStack spacing={10} align="center" className='section-container' >
        <Heading size="xl" color="#D86570" textAlign="center">
          HOW DOES IT WORK? (THE PROCESS)
        </Heading>

        {/* Horizontal Step Cards */}
        <HStack  spacing={8} flexWrap="wrap" justify="center">
          {steps.map((step, index) => (
            <Flex
              key={index}
              direction="column"
              bg="#FFF5F6"
              borderRadius="xl"
              boxShadow="md"
              p={6}
              maxW="sm"
              align="center"
            >
              <Image
                src={step.image}
                alt={step.title}
                width={'80%'}
                objectFit="cover"
                borderRadius="md"
                mb={4}
              />
              <Text fontSize="lg" fontWeight="bold" color="#D86570" textAlign="center">
                {step.title}
              </Text>
              <Text fontSize="md" color="gray.700" textAlign="center" mt={2}>
                {step.description}
              </Text>
            </Flex>
          ))}
        </HStack>
      </VStack>
    </Box>

        <Box bg="#FFF5F6" py={10} mt={3} px={{ base: 6, md: 20 }}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={10} textAlign="center">
        {features.map((feature, index) => (
          <VStack key={index} spacing={3}>
            <Image src={feature.img} boxSize={16} color="#D86570" />
            <Text fontSize="lg" fontWeight="semibold" color="#D86570" letterSpacing="wide">
              {feature.cont}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>

    

        {/* step to book us section */}
        <Box pt={{ base: 10, md: 16 }} pb={{ base: 2, md: 12 }} >
          <Box className='section-container'>
            <StepToBook />
          </Box>
        </Box>

        {/* explore web app section */}
        <Box className='section-container' pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }} bgColor={'#F4F0F1'}>
          <ExploreWebApp />
        </Box>

        <Box bg="#D86570" color="white" py={16} px={{ base: 6, md: 20 }} textAlign="center">
      <VStack spacing={6} maxW="2xl" mx="auto">
        <Box className='heading' size="xl">Reach Out Our Experts Now!</Box>

        <Text fontSize="lg">
          Get professional advice and steadfast support whenever and wherever you need it.
        </Text>

        <Button
          size="lg"
          
          colorScheme="white"
          variant="outline"
          _hover={{ bg: "whiteAlpha.300" }}
          fontSize={'18px'}
          fontWeight={400}
          fontStyle={'italic'}
          fontFamily="'Roboto', sans-serif"
          onClick={() => {
           
              navigate('/mentor/list')

            
          }} 
        >
          Talk to us @ just ₹1
        </Button>
      </VStack>
    </Box>

        {/* testimonial section */}
        <Box pt={16} pb={14} >
          <Box >
            <Testimonial />
          </Box>
        </Box>

        <Box
      as="blockquote"
      bg="gray.50"
      borderLeft="6px solid"
      borderColor="#D86570"
      boxShadow="md"
      p={6}
      mt={4}
      rounded="md"
      position="relative"
      mx={{ base: "1rem", md: "1.2rem", lg:"4.5rem" }}
    >
      <Stack direction="row" align="start" spacing={3}>
        <Icon as={FaQuoteLeft} boxSize={6} color="#D86570" mt={1} />
        <Text fontSize="lg" color="gray.700" fontStyle="italic">
          “Change your conception of yourself and you will automatically change the world in which you live. Do not try to change people; they are only messengers telling you who you are. Revalue yourself and they will confirm the change.”
        </Text>
      </Stack>
      <Text
        mt={4}
        textAlign="right"
        fontWeight="medium"
        fontSize="sm"
        color="gray.600"
        as="cite"
        display="block"
      >
        — Neville Goddard
      </Text>
    </Box>

        {/* faqs section */}

        <Box pt={8} pb={14} >
          <Box className='section-container'>
            <Flex marginX="auto" flexDirection="column" width="100%">
              <Flex justifyContent="center" pb={4}>
                <Heading mt={6} size="lg">
                  Frequently Asked Questions
                </Heading>
              </Flex>
              <FAQs />
            </Flex>
          </Box>
        </Box>
      </Box>

    </>

  )
}

export default Index;
