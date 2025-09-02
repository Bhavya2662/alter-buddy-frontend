// Import necessary Chakra UI components
import { Box, Button, Flex, Heading, Icon, Image, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react';
import { FaQuoteLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
// Import images
import heroImg from "../../../../assets/new-images/images/mental-health-main.png";
import sec2Img from "../../../../assets/new-images/images/mental-health-2.png";
import mental3 from "../../../../assets/new-images/images/mental-health-3.png";

// Import custom components
import Solution from '../../../../component/solution';
import HolisticWelness from '../dating-relationship/component/mental-wellness';
import WhatYouGain from '../dating-relationship/component/what-gain';
import { Coaches } from '../../../../component/cards/coaches';
import Index from '../../../../component/faqs';
import FaqMentalHealth from '../../../../component/faq-mental-health';
import { useAuthenticationSlice } from '../../../../redux/features';

const dataa = [
    "Gain a deeper understanding of yourself, your thoughts, and your emotions.",
    "Get acquainted with practical tools and strategies to manage stress, anxiety, and depression.",
    "Strengthen your relationships, communication skills, and emotional resilience.",
    "Cultivate a greater sense of self-esteem, confidence, and well-being.",
    "Experience a renewed sense of purpose, joy, and fulfilment in your life.",
    "Discover the peace and clarity that comes from embracing your inner wisdom and resilience.",
]

const tags = {
    row1: [
        "Anxiety",
        "Depression",
        "Stress Management",
        "Self-Esteem & Confidence",
        "Anger Management",
        "Coping with grief and loss",
        "Communication skills",
        "Assertiveness training",
        "Boundary setting",
        "Emotional regulation",
        "Goal setting and motivation",
        "Relationship issues",
        "Marriage Counselling",
        "Family dynamics",
        "Parenting skills",
    ],
    
    row2: [
        "Work-life balance",
        "Career counselling",
        "Coping with life transitions",
        "Addiction recovery",
    ],

    row3: [
        "Trauma healing",
      "Personal growth and development",
      "PTSD (Post-Traumatic Stress Disorder)",  
      "Phobias and fears",
      "Sleep disorders and insomnia",
      "Chronic illness management",
    ],
};

const data = {
    row1: [
        {
            title: "Cognitive Behavioral Therapy (CBT):",
            content: "Together, we'll uncover the root causes of your negative thought patterns and develop practical strategies to challenge and reframe them."
        },
        {
            title: "Mindfulness Practices:",
            content: "Through mindfulness exercises and meditation, we'll cultivate present-moment awareness, allowing you to find peace and clarity in the here and now."
        },
        {
            title: "Emotional Regulation Techniques:",
            content: "Learn to navigate the ebb and flow of your emotions with grace and resilience, developing healthy coping mechanisms to manage stress and anxiety."
        },

    ],
    row2: [
        {
            title: "Stress Management Strategies:",
            content: "Discover personalized tools and techniques to cope with life's stressors, build resilience, and foster a sense of balance and well-being."
        },
        {
            title: "Positive Psycology Intervention:",
            content: "Together, we'll explore the power of gratitude, optimism, and self-compassion, helping you cultivate a positive mindset and enhance your overall psychological well-being."
        },
    ]
}

const MentalHealthMain = () => {
    const navigate = useNavigate();
          const { authentication } = useAuthenticationSlice();
    return (
        <Box className='main-container'>
            <Box py={24} className="section-container" bgImage={heroImg} bgPosition={'center'} bgRepeat={'no-repeat'} bgSize={'cover'}>
                <Flex justifyContent={'center'} alignItems={'center'} h={'auto'} py={{ base: 16, md: 16, lg: 36 }} >
                    <Box width={{ base: "90%", md: "50%", lg: "50%" }} textAlign={'center'}>
                        <Text className="heading" color={'#D86570'}>Your Journey to Mental Wellness Begins Here</Text>
                        
                    </Box>
                </Flex>
            </Box>


            <Box className="section-container" pt={{ base: 10, md: 16 }} pb={12}>
            <Text fontWeight={700} textAlign={'center'} fontSize={28} fontStyle={'italic'} className="paragraph"  my={6} >Find Compassionate Support to Navigate Life’s Challenges with Confidence</Text>
                <Flex gap={{ base: 6, md: 10 }} justifyContent={'space-between'}
                    alignItems={'center'}
                    flexDirection={{ base: 'column', md: 'row' }}>
                    <Box>
                    
                    
                        <Text className='heading' color={'var(--peach)'}>We Understand Your Pains</Text>
                        <Text fontSize={'17px'} mt={4} w={{ base: '100%', md: '90%' }}>
                        The journey of life frequently resembles a narrow road with many unexpected bends and twists. Along the road, we could encounter obstacles that appear impossible to solve, emotional weights that feel impossible to bear, and feelings that might overpower us.
                        </Text>
                        <UnorderedList fontSize={'17px'} mt={6} spacing={4}>
                            <ListItem>Do you struggle with <Box as='span' fontWeight={'700'}>anxiety</Box>, feeling its grip tighten each day?</ListItem>
                            <ListItem>Do you feel weighed down by <Box as='span' fontWeight={'700'}>depression</Box>, struggling to find light in the darkness?</ListItem>
                            <ListItem>Does daily <Box as='span' fontWeight={'700'}>stress</Box> leaving you exhausted, overwhelmed, and uncertain?</ListItem>
                            <ListItem>Are you navigating <Box as='span' fontWeight={'700'}>complex relationships</Box>, feeling lost, unsure of your path?</ListItem>
                            <ListItem>Have you experienced <Box as='span' fontWeight={'700'}>trauma, loss, or grief</Box> that has left scars that ache?</ListItem>
                            <ListItem>Feel <Box as='span' fontWeight={'700'}>overwhelmed by life's demands?</Box></ListItem>
                            <ListItem> Battle with <Box as='span' fontWeight={'700'}>low self-esteem or confidence?</Box></ListItem>
                            <ListItem>Are you unable to cope with <Box as='span' fontWeight={'700'}>relationship issues</Box> or family conflicts?</ListItem>
                            <ListItem>Experiencing <Box as='span' fontWeight={'700'}>uncertainty about career choices?</Box></ListItem>
                           
                        </UnorderedList>
                    </Box>
                    <Box>
                        <Image src={sec2Img} alt="sec2Img" w={'100%'} h={'100%'} maxH={'800px'} />
                    </Box>
                </Flex>
                <Box  mt={14}  py={8}>
                    <Text my={3} fontSize={'22px'} className=" paragraph"  ml={{ base: 0, md: 0 }}> Know that you are not alone in these struggles. We've been there too, facing our own battles with anxiety, depression, and uncertainty.</Text>
                    <Text my={3} fontSize={'22px'} className=" paragraph"  ml={{ base: 0, md: 0 }}> We understand the pain of feeling lost, the heaviness of carrying burdens, and the longing for peace and clarity in the midst of chaos.</Text>
                    <Text my={3} fontSize={'22px'} className=" paragraph" fontWeight={600}  ml={{ base: 0, md: 0 }}> But we also know that it doesn't have to be this way. You deserve to experience a life filled with joy, purpose, and fulfilment. You deserve to embrace your inner peace and navigate life's challenges with confidence and resilience.</Text>
                </Box>
            </Box>
            

            <Box mt={4}>
                <Solution
                    tags={tags}
                    buttonContent="WE HELP WITH"
                    heading="The Solution"
                    paragraph="At Alter Buddy, we offer more than just a listening ear or a shoulder to lean on. We provide a safe and nurturing space where you can explore your feelings, unpack your thoughts, and embark on a journey of self-discovery and healing
                    ."
                />
            </Box>

            <Box>
                <HolisticWelness
                    Mainheading="Our Methodologies"
                    Mainpara=""
                    data={data}
                />
            </Box>

            <Box>
                <WhatYouGain
                    gainList={dataa}
                    gainImg={mental3}
                    heading="What Do You Get:"
                />
            </Box>

            <Box>
            <Text my={8} textAlign={'center'} className='section-container' fontWeight={600} fontSize={'30px'} color={'var(--peach)'}>IN SHORT ‘YOU GET TO MEET THE BEST VERSION OF YOURSELF’</Text>
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
                      “As you embark on your journey to mental wellness, remember that every step you take, no matter how small, brings you closer to the peace, joy, and fulfillment you seek. Trust in the process, believe in your strength, and know that you are never alone.”
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
                    —  Brene Brown
                  </Text>
                </Box>

                <Flex mt={12} justifyContent={'center'} alignItems={'center'}>
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

            {/* <Coaches categoryId={'67f39e6871662664c302834f'}/> */}

            <Box pt={8} pb={14} >
                <Box className='section-container'>
                    <Flex marginX="auto" flexDirection="column" width="100%">
                        <Flex justifyContent="center" pb={4}>
                            <Heading mt={6} size="lg">
                                Frequently Asked Questions
                            </Heading>
                        </Flex>
                        <FaqMentalHealth />
                    </Flex>
                </Box>
            </Box>

        </Box>
    )
}

export default MentalHealthMain;
