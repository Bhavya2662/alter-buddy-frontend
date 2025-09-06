import { Box, Button, Flex, Grid, GridItem, Heading, Image, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react'
import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuthenticationSlice } from '../../../../redux/features';
import heroImg from "../../../../assets/final-image/images/pets-hero-img.png";
import pet1 from "../../../../assets/final-image/images/pet1.png";
import pet2 from "../../../../assets/final-image/images/pet2.png";
import pet3 from "../../../../assets/final-image/images/pet3.png";
import pet4 from "../../../../assets/final-image/images/pet4.png";
import pet5 from "../../../../assets/final-image/images/pet5.png";
import pet6 from "../../../../assets/final-image/images/pet6.png";
import pet7 from "../../../../assets/final-image/images/pet7.png";
import pet8 from "../../../../assets/final-image/images/pet8.png";
import pet9 from "../../../../assets/final-image/images/pet9.png";
import pet10 from "../../../../assets/final-image/images/pet10.png";
import pet11 from "../../../../assets/final-image/images/pet11.png";
import pet12 from "../../../../assets/final-image/images/pet12.png";

import { FaRegCircleCheck } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import WhatYouGain from '../dating-relationship/component/what-gain';
import FaqPets from '../../../../component/faq-energy-pets';

const petHealingPoints = [
    {
      text: "Stress, anxiety, or sudden behavior changes",
      img: pet3,
    },
    {
      text: "Post-surgery recovery",
      img: pet4,
    },
    {
      text: "Chronic illnesses or unexplained pain",
      img: pet5,
    },
    {
      text: "Age-related discomfort",
      img: pet6,
    },
    {
      text: "Emotional withdrawal or hyperactivity",
      img: pet7,
    },
    {
      text: "Transitions: new homes, travel, separation",
      img: pet8,
    },
  ];

  const data = [
    "A calmer, more relaxed demeanor",
    "Improved mood or appetite",
    "Restful sleep",
    "Emotional balance",
    "Faster healing (in sync with medical treatment)",
    "More loving, connected behavior",
  ];

  const dataa = [
    "Completely non-invasive",
  "No stress for your pet",
  "Works across distances",
  "Complements medical care",
  "Deeply soothing and supportive",
  ];

  const steps = [
    { id: 1, title: "Share your pet’s name + clear photo" },
    { id: 2, title: "Mention your concern or reason for the session" },
    { id: 3, title: "We begin the healing and keep you updated" },
  ];

const EnergyHealPets = () => {
    const [activeStep, setActiveStep] = useState(0);
      const [inView, setInView] = useState(false);
      const sectionRef = useRef(null);
      const navigate = useNavigate();
      const { authentication } = useAuthenticationSlice();
    
      useEffect(() => {
        const handleScroll = () => {
          if (sectionRef.current) {
            const { top, bottom } = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (top < windowHeight && bottom > 0) {
              setInView(true);
            }
          }
        };
    
        window.addEventListener("scroll", handleScroll);
        handleScroll();
    
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
    
      useEffect(() => {
        if (inView) {
          const interval = setInterval(() => {
            setActiveStep((prev) => (prev < steps.length ? prev + 1 : prev));
          }, 2000);
          return () => clearInterval(interval);
        }
      }, [inView]);
  return (
    <Box className='main-container'>
      <Box className="section-container" py={22}  bgImage={heroImg} bgPosition={'center'} bgRepeat={'no-repeat'} bgSize={'cover'}>
                      <Flex mt={28} justifyContent={'center'} alignItems={'center'} h={'auto'} py={{ base: 16, md: 16, lg: 36 }} >
                          <Box textAlign={'center'}>
                              
                              <Text fontSize={{ base: "xl", md: '2xl', lg: '5xl' }} color={'white'} fontWeight={600} mt={2}> <Box color={"#ce515d"}>ENERGY HEALING FOR PETS</Box>Support Your Furry Friend’s Well-being, From Afar, With Love</Text>
                              
                          </Box>
                      </Flex>
                  </Box>

      <Box className="section-container" pt={{ base: 10, md: 16 }} pb={12}>
                          <Flex gap={{ base: 6, md: 10 }} justifyContent={'space-between'}
                              alignItems={'center'}
                              flexDirection={{ base: 'column', md: 'row' }}>
                              <Box>
                                  <Text className='heading' color={'var(--peach)'}>Because Pets Deserve Healing Too 💛</Text>
                                  <Text fontSize={20} mt={4} w={{ base: '100%', md: '90%' }}>
                                  Just like us, our pets feel.
                                  </Text>
                                  <Text fontSize={20} mt={4} w={{ base: '100%', md: '90%' }}>
                                  They absorb our energies, experience stress, pain, emotional imbalance, and sometimes, they carry silent suffering we can’t always see.
                                  </Text>
                                  <Text fontSize={20} mt={4} w={{ base: '100%', md: '90%' }}>
                                  Whether your pet is dealing with anxiety, unexplained fatigue, illness, or just needs some loving energy to thrive…
                                  </Text>
                                  <Text fontSize={20} mt={4} w={{ base: '100%', md: '90%' }}>
                                  We’re here for them.
                                  </Text>
                                  
                              </Box>
                              <Box>
                                  <Image src={pet1} alt="sec2Img" w={'650px'} />
                              </Box>
                          </Flex>

                          <Flex mt={8} justifyContent={'center'} alignItems={'center'} >
                                                      <Button mb={{ base: 6, md: 4, lg: 2 }} bg={'var(--peach)'} color={'white'}
                                                                   px={12}     py={{ base: 6, md: 6, lg: 7 }} rounded={'full'}
                                                                        fontWeight={600} fontSize={{ base: '16px', md: '16px', lg: '18px' }} onClick={() => {
                                                                          if(!authentication){
                                                                            navigate('/sign-in')
                                                            
                                                                          }else{
                                                                            navigate('/mentor/list')
                                                            
                                                                          }
                                                                        }} colorScheme=''>CALL NOW!</Button>
                                                        </Flex>
      
                      </Box>

                      
      <Box className="section-container" pt={{ base: 10, md: 1 }} pb={12}>
                          <Flex gap={{ base: 6, md: 10 }} justifyContent={'space-between'}
                              alignItems={'center'}
                              flexDirection={{ base: 'column', md: 'row' }}>
                                <Box>
                                  <Image src={pet2} alt="sec2Img" w={'90%'} h={'100%'} maxH={'800px'} />
                              </Box>
                              <Box w={'80%'}>
                              <Flex my={6}>
                          <Box>
                              
                              <Text className='heading' color={"#D86570"} fontWeight={600}>WHAT WE OFFER?</Text>
                              
                          </Box>
                      </Flex>
                                  <Text fontSize={28} color={'black'}> <Box as='span' fontWeight={'600'} >Distant Energy Healing for Pets –</Box> no in-person sessions, no fuss.</Text>
                                  <Text fontSize={20} mt={4} w={{ base: '100%', md: '90%' }}>
                                  All we need is:
                                  </Text>
                                  <Text fontWeight={600} fontSize={18} mt={4} w={{ base: '100%', md: '90%' }}>
                                  📸 A recent photo of your pet
                                  </Text>
                                  <Text fontWeight={600} fontSize={18} mt={4} w={{ base: '100%', md: '90%' }}>
                                  🐶 Their name
                                  </Text>
                                  <Text fontWeight={600} fontSize={18} mt={4} w={{ base: '100%', md: '90%' }}>
                                  💗 Your intention or concern
                                  </Text>
                                  <Text fontSize={20} mt={4} w={{ base: '100%', md: '90%' }}>
                                  That’s it. Our energy experts connect energetically with your pet and gently channel pure, supportive energy to wherever it’s needed most — physically, emotionally, or spiritually.
                                  </Text>

                                  <Flex mt={6} >
                                                      <Button mb={{ base: 6, md: 4, lg: 10 }} bg={'var(--peach)'} color={'white'}
                                                                   px={8}     py={{ base: 6, md: 6, lg: 7 }} rounded={'full'}
                                                                        fontWeight={600} fontSize={{ base: '16px', md: '16px', lg: '18px' }} onClick={() => {
                                                                          if(!authentication){
                                                                            navigate('/sign-in')
                                                            
                                                                          }else{
                                                                            navigate('/mentor/list')
                                                            
                                                                          }
                                                                        }} colorScheme=''>CONNECT ME NOW</Button>
                                                        </Flex>
                                  
                              </Box>
                              
                          </Flex>

                          
      
                      </Box>

                      <Box py={12} px={{ base: 4, md: 16 }} bg="gray.50">
      <Heading
        
        
        className='heading'
        textAlign="center"
        mb={10}
        color={'var(--peach)'}
      >
        WHEN IS ENERGY HEALING HELPFUL FOR PETS
      </Heading>

      <Grid
        templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
        gap={10}
      >
        {petHealingPoints.map((point, index) => (
          <VStack key={index} spacing={1} textAlign="center">
            <Image
              src={point.img}
              alt={point.text}
              boxSize="300px"
              objectFit="contain"
            />
            <Text fontSize="lg" fontWeight="semibold" color="black">
              {point.text}
            </Text>
          </VStack>
        ))}
      </Grid>

      <Text  fontSize={20} fontWeight={600} mt={20} w={{ base: '100%', md: '90%' }}>
      And especially… when nothing else works.</Text>
                                  <Text fontSize={20} mt={4} w={{ base: '100%', md: '90%' }}>
                                  When medicines no longer help, and the vets say “There's <Box as='span' fontWeight={600}>no hope left,</Box> what your pet truly needs is prayers and love”.
                                  </Text>
                                  <Text fontSize={20} mt={4} w={{ base: '100%', md: '90%' }}>
                                  That’s when we step in.
                                  </Text>
                                  <Text fontSize={20} mt={4} w={{ base: '100%', md: '90%' }}>
                                  As energy healers, we offer comfort, strength, and a chance for them to heal and survive through energy work.
                                  </Text>
    </Box>

    <Box>
                <WhatYouGain
                    gainList={data}
                    gainImg={pet9}
                    heading="WHAT YOU MIGHT NOTICE AFTER A SESSION:"
                />
            </Box>

            <Flex mt={'-4px'} alignItems={'center'} justifyContent={'center'} >
                                                      <Button  mb={{ base: 6, md: 4, lg: 10 }} bg={'var(--peach)'} color={'white'}
                                                                   px={8}     py={{ base: 6, md: 6, lg: 7 }} rounded={'full'}
                                                                        fontWeight={600} fontSize={{ base: '16px', md: '16px', lg: '18px' }} onClick={() => {
                                                                          if(!authentication){
                                                                            navigate('/sign-in')
                                                            
                                                                          }else{
                                                                            navigate('/mentor/list')
                                                            
                                                                          }
                                                                        }} colorScheme=''>BOOK ME FOR MY PET</Button>
                                                        </Flex>


    <Box className="section-container" pt={{ base: 10, md: 6 }} pb={12}>
               
                    <Flex gap={{ base: 6, md: 10 }} justifyContent={'space-between'}
                        alignItems={'center'}
                        flexDirection={{ base: 'column', md: 'row' }}>
                        <Box>
                        
                        
                            <Text className='heading' color={'var(--peach)'}>HOW IT WORKS</Text>
                            
                            <UnorderedList fontSize={18} mt={6} spacing={4}>
                                <ListItem>We don’t need to be in the same room as your pet to work our magic.</ListItem>
                                <ListItem>Our energy healers work in a quiet, meditative state to send healing vibrations directly to your pet.</ListItem>
                                <ListItem>Every session is done with deep compassion, pure intent, and love.</ListItem>
                                <ListItem>No machines, no invasive techniques. Just energy — tuned into your pet’s highest good.</ListItem>
                               
                            </UnorderedList>
                        </Box>
                        <Box>
                            <Image src={pet10} alt="sec2Img" w={'550px'} />
                        </Box>
                    </Flex>
    
                </Box>

                <Box className="section-container" pt={{ base: 10, md: 16 }} pb={12}>
               
               <Flex gap={{ base: 6, md: 10 }} justifyContent={'space-between'}
                   alignItems={'center'}
                   flexDirection={{ base: 'column', md: 'row' }}>
                    <Box>
                       <Image src={pet11} alt="sec2Img" w={'550px'} />
                   </Box>
                   <Box>
                       <Text  className='heading' color={'var(--peach)'}>WE HEAL MORE THAN JUST CATS AND DOGS</Text>
                       
                       <Text fontSize={18} my={3}>While many of our furry clients are cats and dogs, energy healing isn't limited to them.</Text>
                       <Text fontSize={18} my={3}>We lovingly extend our services to all kinds of pets—including rabbits, tortoises, birds, guinea pigs, and even farm or exotic animals.</Text>
                       <Text fontSize={18} my={3}>Every soul matters, and every creature deserves healing. If they hold a special place in your heart, they hold a special place in ours.</Text>
                   </Box>
                   
               </Flex>

           </Box>

           <Box>
                <Box className="section-container" pt={{ base: 10, md: 16 }} pb={12}>
                                <Flex gap={{base:6, md:2}} justifyContent={'space-around'} 
                                alignItems={'center'}
                                flexDirection={{base:'column-reverse', md:'row'}}>
                                     
                                    <Box width={{base:'100%', md:'60%'}}>
                                      <Text  className='heading' color={'var(--peach)'}>WHY PET PARENTS LOVE IT:</Text>
                                   
                                   <Box pt={4}>
                                    {dataa.map((list, index)=>(
                                        <Flex key={index} mt={4} alignItems={'start'} gap={4}>
                                            <Box color={'var(--peach)'} pt={1}><FaRegCircleCheck/></Box>
                                            <Text className="paragraph">{list}</Text>
                                        </Flex>
                                    ))}
                                   </Box>
                                    </Box>
                                    <Box width={{base:'100%', md:'50%', lg:'40%'}}>
                                        <Image src={pet12} alt="sec2Img" w={'600px'}/>
                                    </Box>
                                  
                                </Flex>
                
                            </Box>
            </Box>

        <Box className='section-container' ref={sectionRef} w="full" py={6}>
              <VStack spacing={4} textAlign="left" alignItems={'start'}>
                <Text className="heading" fontWeight="bold">
                 GET STARTED
                </Text>
                
              </VStack>
        
              <Grid  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={4} py={4}>
                {steps.map((step, index) => (
                  <GridItem key={step.id} py={3}>
                    <Box
                      position="relative"
                      py={{ base: 4, md: 1 }}
                      px={4}
                      borderRadius="20px 300px 300px 20px"
                      bg={index < activeStep ? "var(--lightpeach)" : "#F1F5F9"}
                      transition="background 2s ease"
                    >
                      <Flex justify="space-between" align="center">
                        <Box>
                          <Text fontSize="md" fontWeight="semibold" color={index < activeStep ? "var(--peach)" : "#475569"}>
                            Step {step.id}
                          </Text>
                          <Text fontSize="xl" fontWeight="500" mt={0} >
                            {step.title}
                          </Text>
                        </Box>
                        <Text fontSize={{ base: "5xl", md: "5xl", lg: "5rem" }} fontWeight="extrabold" color={index < activeStep ? "var(--peach)" : "gray.300"}>
                          {step.id}
                        </Text>
                      </Flex>
                    </Box>
                  </GridItem>
                ))}
              </Grid>

              <Text mt={7} textAlign={'center'} w={'100vw'} color={'#D86570'} fontWeight={500} fontSize={26} >Many pets show subtle shifts within a day or two! </Text>
            </Box>

        <Heading my={5} size="xl" textAlign={'center'} color="#D86570">
        Because They Deserve a Life Full of Comfort, Love, and Light
                </Heading>
                <Box my={2} bgGradient={'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(245,217,219,1) 100%)'} py={8}>
                                                              <Text textAlign={'center'} fontSize={'20px'} className="section-container paragraph" ml={{ base: 0, md: 10 }}> We treat your pets like our own, with devotion, empathy, and powerful energy work that helps them return to a place of peace and vitality.
                                                              </Text>
                                                              
               </Box>
               <Flex mt={14} justifyContent={'center'} alignItems={'center'}>
                                     <Button mb={{ base: 6, md: 4, lg: 6 }} bg={'var(--peach)'} color={'white'}
                                                 px={8} py={{ base: 6, md: 6, lg: 7 }} rounded={'full'}
                                                 fontWeight={600} fontSize={{ base: '16px', md: '16px', lg: '18px' }} onClick={() => {
                                                   // if(!authentication){
                                                   //   navigate('/sign-in')
                                     
                                                   // }else{
                                                   //   navigate('/mentor/list')
                                     
                                                   // }
                                     
                                                 }} colorScheme=''><a href="https://docs.google.com/forms/d/e/1FAIpQLSc9KPahBJEbyLHyuWEjxk-E32Dh1hMFiFbe85Wi_SfjGiwM1Q/viewform?usp=dialog">TALK TO US NOW</a></Button>
                                      </Flex>

                                      <Box pt={8} pb={14} >
                <Box className='section-container'>
                    <Flex marginX="auto" flexDirection="column" width="100%">
                        <Flex justifyContent="center" pb={4}>
                            <Heading mt={6} size="lg">
                                Frequently Asked Questions
                            </Heading>
                        </Flex>
                        <FaqPets />
                    </Flex>
                </Box>
            </Box>
    </Box>
  )
}

export default EnergyHealPets;
