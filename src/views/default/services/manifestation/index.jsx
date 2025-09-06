// Import necessary Chakra UI components
import { Box, Button, Card, Divider, Flex, Grid, Heading, Icon, Image, List, ListIcon, ListItem, Stack, Text, VStack } from '@chakra-ui/react';
import { CheckCircleIcon } from "@chakra-ui/icons";
import { FaQuoteLeft } from "react-icons/fa";
import { ChevronRightIcon } from "@chakra-ui/icons";

// Import images
import imgManifest from '../../../../assets/new-images/images/manifest-main.png';
import tick from "../../../../assets/new-images/icons/right-tick.png";
import bgManifest from "../../../../assets/new-images/images/backgroundManifest.png";
import manifestImg2 from "../../../../assets/new-images/images/manifest-2.png";
import bgeffect from "../../../../assets/new-images/images/Ellipse.png";

// Import custom components
import { Coaches } from '../../../../component/cards/coaches';
import Index from '../../../../component/faqs';
import WhatYouGain from '../dating-relationship/component/what-gain';
import { Link, useNavigate } from 'react-router-dom';
import FaqManifest from '../../../../component/faq-manifest';
import { useAuthenticationSlice } from '../../../../redux/features';

const data = [
  "Manifest more money doing what you love",
  " Reach your next degree of success and impact.",
  "Attract Dream Clients",
  "Call in Your Soulmate",
  "Attract new Friendships",
  "Deepen your Spiritual Connection",
  "Discover Your Purpose",
  "Manifest Weight Loss",
  "Uplevel ALL areas of your Life - health, relationships, home",
]

const Manifest = () => {

    const navigate = useNavigate();
    const { authentication } = useAuthenticationSlice();

    const carddata = [
      {
          title: "Channeled Guidence",
          desc: "Gain clarity and insight for your journey.",
          
      },
      {
          title: "Intuitive Healing",
          desc: "Release blocks and align with your highest self",
       
      },
      {
          title: "Advanced Energetic Techniques",
          desc: "Unlock your full manifestation potential",
          
      },
  ]

    const ManifestPoints = [" Live with Your Loving Soulmate", "Scaling the heights of Success", "Making Immense amounts of Money", " Attracting Top- Notch, High-paying Clients", "Having That Perfect Dream Body", "Living a Purpose-Driven Life"]
  return (
    <Box className='main-container'>
      <Flex bgSize={'cover'} bgRepeat={'no-repeat'} bgPosition={'center'} flexDirection={'row'} mx={5}   marginTop={'15px'} paddingY={'20px'}>
                      <Flex marginX={'40px'} justifyContent={'center'} flexDirection={'column'}>
                          <Heading size={'xl'} textColor={'#D86570'}>Ready To Manifest Your Next Level of Abundance and Success?</Heading>
                          <Text marginTop={'25px'}  fontSize={'28px'} fontWeight={'600'} textColor={'#1A1D1F'}>We all have that one desire, and that is having a perfect life. A life where we are:</Text>
                          <Flex marginY={'30px'} gap={3} flexDirection={'column'}>
                            {ManifestPoints.map((item, index) => (
                                                            <Flex key={index} gap={3} alignItems={'center'}>
                                                                <Image src={tick} alt='image' w={{ base: '20px', md: '25px' }} h={{ base: '20px', md: '25px' }} />
                                                                <Text fontSize={{ base: '16px', md: '20px' }}>{item}</Text>
                                                            </Flex>
                            ))}
                          </Flex>
                          <Text marginTop={'5px'} fontSize={'20px'} fontWeight={'400'} textColor={'#1A1D1F'}>AND ABOVE ALL ELSE...</Text>
                          <Text marginTop={'15px'} fontSize={'20px'} fontWeight={'700'} textColor={'#1A1D1F'}>We Want To Be Happy!</Text>
                      </Flex>
                      <Image src={imgManifest} alt='heroImage' width={'45%'} display={{ base: 'none', md: 'none', lg: 'block' }} h={{ base: '100%', md: '100%', lg: '100%' }}></Image>
                  </Flex>

      {/* <Box p={10} width={'100vw'} backgroundImage={bgManifest} bgSize={'cover'} bgPosition={'center'} bgRepeat={'no-repeat'}>
            <Flex borderRadius={'20px'} width={{ base: '100%', md: '80%' }} marginX={'auto'}  justifyContent={'center'} alignItems={'center'} flexDirection={'column'} bg={'white'}>
                <Flex width={'70%'} marginBottom={'12px'} marginTop={'40px'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                <Heading size={'xl'} textAlign={'center'} textColor={'#D86570'}>Manifest the Life You Desire</Heading>
                <Text textAlign={'center'} marginTop={'25px'} fontSize={'18px'} fontWeight={'400'} textColor={'#1A1D1F'}>Are you seeking deeper love, financial freedom, success, or a purpose-driven life?
                We all have a burning desire for something more—but chasing it endlessly can leave us exhausted.</Text>
                
                </Flex>
                <Divider bgColor={'#D86570'} color={'#D86570'} height={'2px'}/>
                <Flex  width={'70%'} marginTop={'50px'} marginBottom={'12px'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                <Heading size={'xl'} textAlign={'center'} textColor={'#D86570'}>What if the key isn’t outside, but within you?</Heading>
                <Text textAlign={'center'} marginTop={'25px'} fontSize={'18px'} fontWeight={'400'} textColor={'#1A1D1F'}>The success, love, and abundance you crave don’t come from constant hustle.
                They come from aligning your inner energy with your desires.</Text>

                <Box textAlign={'center'} fontSize={'18px'}  mt={{ base: 6, md: 6, lg: 6 }} width={{ base: '100%', md: '85%' }}  color={'var(--grey)'}>
                           <Box as='span' display={'inline-block'} textColor={'black'} fontWeight={'500'}><li ></li></Box> The moment you shift your inner vibration, your outer reality transforms.
                        </Box>
                        <Box textAlign={'center'} fontSize={'18px'}  mt={{ base: 4, md: 4, lg: 4 }} width={{ base: '100%', md: '85%' }}  color={'var(--grey)'}>
                           <Box as='span' display={'inline-block'} textColor={'black'} fontWeight={'500'}><li ></li></Box> It’s not just a belief—it’s a Universal Law.
                        </Box>
                
                </Flex>
                <Divider bgColor={'#D86570'} color={'#D86570'} height={'2px'}/>
                <Flex width={'70%'} marginY={'50px'}  justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                <Heading size={'xl'} textAlign={'center'} textColor={'#D86570'}>Are you ready to unlock your full potential?</Heading>
                <Button mt={{ base: 6, md: 4, lg: 10 }} bg={'#D86570'} color={'white'}
                w={{ base: '70%', md: '50%', lg: '30%' }} py={{ base: 6, md: 6, lg: 8 }} rounded={'full'}
                fontWeight={600} fontSize={{ base: '16px', md: '16px', lg: '18px' }} onClick={() => navigate('/login')} colorScheme=''>TALK TO US NOW</Button>
                
                </Flex>
            </Flex>
        </Box> */}

<Box bg="#FFF5F6" px={8} py={10} >
      <VStack  spacing={2} align="start">
        <Heading size="lg" color="#D86570">
          We know how it feels to have a burning desire for wanting more in life.
        </Heading>

        <VStack mt={5} align="start" spacing={1}>
          <Text fontSize={{ base: '16px', md: '20px' }} color="gray.700">- Deeper Love and Relationships</Text>
          <Text fontSize={{ base: '16px', md: '20px' }} color="gray.700">- More Money To Create A Powerful Impact,</Text>
          <Text fontSize={{ base: '16px', md: '20px' }} color="gray.700">- A healthy life and</Text>
          <Text fontSize={{ base: '16px', md: '20px' }} color="gray.700">- Soul-Stirring Abundance.</Text>
        </VStack>

        <Text fontSize={{ base: '14px', md: '18px' }} fontWeight="bold" color="#D86570" pt={4}>
          BUT
        </Text>

        <Text fontSize={{ base: '16px', md: '20px' }} color="gray.700">
          We also don’t want to keep pushing, hustling, and working till it hurts, to get it!
        </Text>

        <Text fontSize={{ base: '16px', md: '20px' }} color="gray.700">
          Somewhere every one of us:
        </Text>

        <List spacing={3} pl={4}>
          <ListItem>
            <ListIcon fontSize={{ base: '16px', md: '20px' }} as={ChevronRightIcon} color="#D86570" />
            Are spending years trying to succeed in a business that isn’t our purpose.
          </ListItem>
          <ListItem>
            <ListIcon fontSize={{ base: '16px', md: '20px' }} as={ChevronRightIcon} color="#D86570" />
            Forever pushing and hustling to reach our next big business goal which leaves us feeling depleted and burnt out.
          </ListItem>
          <ListItem>
            <ListIcon fontSize={{ base: '16px', md: '20px' }} as={ChevronRightIcon} color="#D86570" />
            Are not happy in our relationships.
          </ListItem>
        </List>

        <Text fontSize={{ base: '16px', md: '20px' }} color="gray.700" pt={6}>
          We want you to know that the <strong>Impact, Success, Love, Money, and Abundance</strong> you are seeking will not come from looking outside of yourself —
          <Text as="span" fontWeight="bold" color="#D86570"> it will come from changing from within.</Text>
        </Text>

        <Text fontSize={{ base: '16px', md: '20px' }} color="gray.700">
          Because the minute we change our inner vibration, our outer reality changes to reflect that.
        </Text>

        <Text w={'100vw'} mt={6} textAlign={'center'} fontSize={{ base: '20px', md: '28px' }} fontWeight="semibold" color="#D86570">
          It is a universal law.
        </Text>
      </VStack>
    </Box>

    <Flex mt={2} ml={'70px'} justifyContent={'center'} alignItems={'center'}>
                              <Button mb={{ base: 6, md: 4, lg: 10 }} bg={'var(--peach)'} color={'white'}
                                         px={8}     py={{ base: 6, md: 6, lg: 7 }} rounded={'full'}
                                              fontWeight={600} fontSize={{ base: '16px', md: '16px', lg: '18px' }} onClick={() => {
                                                if(!authentication){
                                                  navigate('/sign-in')
                              
                                                }else{
                                                  navigate('/mentor/list')
                              
                                                }
                                              }}  colorScheme=''>TALK TO US NOW</Button>
                              </Flex>

        <Box>
                <WhatYouGain
                    gainList={data}
                    gainImg={manifestImg2}
                    heading="IMAGINE IF YOU COULD:"
                    para1 = "AND"
                    para2 = "Become the ULTIMATE MANIFESTOR you were born to be!"
                    para3 = "THIS CAN ALL BE YOURS!"
                />
            </Box>

            <Flex mt={2} justifyContent={'center'} alignItems={'center'}>
                              <Button mb={{ base: 6, md: 4, lg: 4 }} bg={'var(--peach)'} color={'white'}
                                         px={8}     py={{ base: 6, md: 6, lg: 7 }} rounded={'full'}
                                              fontWeight={600} fontSize={{ base: '16px', md: '16px', lg: '18px' }} onClick={() => {
                                                if(!authentication){
                                                  navigate('/sign-in')
                              
                                                }else{
                                                  navigate('/mentor/list')
                              
                                                }
                                              }} colorScheme=''>TALK TO US NOW</Button>
                              </Flex>

        {/* <Flex my={5} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} gap={3}>
          <Text color={'#D86570'} fontWeight={700} className='heading'>You Were Born to Manifest Abundance!</Text>
          <Text fontSize={'20px'} color={'#D86570'} fontWeight={700} className='paragraph'>Now is your time to claim it.</Text>
          <Button mt={{ base: 6, md: 4, lg: 6 }} bg={'var(--peach)'} color={'white'}
                w={{ base: '40%', md: '40%', lg: '30%' }} py={{ base: 6, md: 6, lg: 8 }} rounded={'full'}
                fontWeight={600} fontSize={{ base: '16px', md: '16px', lg: '18px' }} onClick={() => navigate('/login')} colorScheme=''>TALK TO US NOW</Button>
        </Flex> */}

        {/* <Flex my={16} width={{ base: '100%', md: '60%' }} flexDirection={'column'} gap={3} className='section-container'>
        <Text color={'#D86570'} fontSize={'35px'} fontWeight={600} className='heading'>This is the power of Manifestation</Text>
        <Text fontSize={'20px'} color={'#383F45'} fontWeight={300} className='paragraph'>We connect with you one-on-one and give you the inner transformation necessary to achieve the outer results you desire.</Text>
        </Flex> */}

        {/* <Grid bgImage={bgeffect} className='section-container' templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={{ base: 6, md: 0, lg: 0 }} mt={10}>
                        {carddata.map((item, index) => (
                            <Box  key={index} p={5} border={'none'} borderStyle={'none'}>
                                <Text textAlign={'center'} fontSize={{ base: '18px', md: '24px' }} fontWeight={600} color={'#1D2B4F'}>{item.title}</Text>
                                <Text marginX={'auto'} width={'60%'} textAlign={'center'} mt={4} className='paragraph' color={'#636E88'}>{item.desc}</Text>
                            </Box>
                           
                        ))}
                    </Grid> */}

<Box bg="white" py={10} px={8}>
      <VStack spacing={4} align="start">
        <Heading size="lg" color="#D86570">
          We connect with you one-on-one and give you the inner transformation necessary to achieve the outer results you desire
        </Heading>

        <Text fontSize="20px" fontWeight="bold" color="#D86570">
          WE GIVE YOU:
        </Text>

        <List spacing={4} pl={2}>
          <ListItem fontSize="18px" color="gray.700">
            <ListIcon as={CheckCircleIcon} color="#D86570" />
            CHANNELLED GUIDANCE
          </ListItem>
          <ListItem fontSize="18px" color="gray.700">
            <ListIcon as={CheckCircleIcon} color="#D86570" />
            INTUITIVE HEALING
          </ListItem>
          <ListItem fontSize="18px" color="gray.700">
            <ListIcon as={CheckCircleIcon} color="#D86570" />
            ADVANCED ENERGETIC TECHNIQUES
          </ListItem>
        </List>

        <Text fontSize="22px"  color="gray.700">
          We firmly believe in searching deep inside to find your true desires and then taking the necessary steps to bring them to fruition.
        </Text>

        <Text mt={4}  textAlign={'center'} w={'100vw'} fontSize="xl" fontWeight="bold" color="#D86570">
          THIS IS WHAT WE CALL MANIFESTING.
        </Text>
      </VStack>
    </Box>

    <Flex  ml={'60px'} justifyContent={'center'} alignItems={'center'}>
                              <Button mb={{ base: 6, md: 4, lg: 4 }} bg={'var(--peach)'} color={'white'}
                                         px={8}     py={{ base: 6, md: 6, lg: 7 }} rounded={'full'}
                                              fontWeight={600} fontSize={{ base: '16px', md: '16px', lg: '18px' }} onClick={() => {
                                                if(!authentication){
                                                  navigate('/sign-in')
                              
                                                }else{
                                                  navigate('/mentor/list')
                              
                                                }
                                              }}  colorScheme=''>TALK TO US NOW</Button>
                              </Flex>

                   

        

        {/* <Coaches categoryId={'67f39e7a71662664c3028358'}/> */}

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
                              “True manifestation is not about changing the world around you, but rather, changing the world within you. When you align your thoughts, emotions, and actions with your deepest desires, miracles happen.”
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
                            —  Unknown
                          </Text>
                        </Box>
      
        <Box pt={8} pb={14} >
                <Box className='section-container'>
                    <Flex marginX="auto" flexDirection="column" width="100%">
                        <Flex justifyContent="center" pb={4}>
                            <Heading mt={6} size="lg">
                                Frequently Asked Questions
                            </Heading>
                        </Flex>
                        <FaqManifest />
                    </Flex>
                </Box>
            </Box>
    </Box>
  )
}

export default Manifest
