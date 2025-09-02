// Import Chakra UI components
import { Box, Flex, Heading, Image, Text, Button, UnorderedList, ListItem, Stack, Icon } from "@chakra-ui/react";
import { FaQuoteLeft } from "react-icons/fa";
// Import images
import heroImg from "../../../../assets/new-images/images/healing-hero-img.png";
import sec2Img from "../../../../assets/new-images/images/healing-sec2-img.png";
import gainImg from "../../../../assets/new-images/images/healing-gain-img.png";

// Import custom components
import Solution from "../../../../component/solution";
import WhatYouGain from "../dating-relationship/component/what-gain";
import Faqs from "../../../../component/faqs/index";
import HolisticWelness from "../dating-relationship/component/mental-wellness";
import { Coaches } from "../../../../component/cards/coaches";
import FaqHealing from "../../../../component/faq-healing";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuthenticationSlice } from "../../../../redux/features";

const tags = {
    

    row1: [
       "Emotional distress",
       "Relationship conflicts",
       "Family issues",
       "Trauma Recovery",
       "Grief & loss",
        "Stress Management",
        "Anxiety & panic attacks",
        "Depression",
        "Low self-esteem",
        "Anger Managemnt",
        "Addiction recovery",
        "Life Transitions",
        "Work-related stress",
        "Burnout preventions",
        "Personal growth & development",

    ],
    row2: [
       "Coping with chronic illness",
       "Self-discovery and identity exploration",
        "Healing from past abuse",
        "Spiritual crises",
        "Goal setting and achievement",
        "Communication skills improvement",
        "Boundary setting and assertiveness training",
        "Coping with perfectionism",
        
    ],
    row3: [
       
       "Overcoming procrastination",
       "Building resilience and coping skills",
        
    ],
};

const gainList = [
    "Clarity and understanding about your life situations and challenges.",
    "Validation of your intuitions.",
    "Resolution of emotional blockages.",
    "Guidance on making important life decisions.",
    "Relief from anxiety and stress",
    "Empowerment to take control of your life",
    "Healing of past traumas and emotional wounds.",
    "Reassurance and comfort from connecting with departed loved ones.",
    "Insights into your strengths and weaknesses.",
    "Confirmation of your path and direction in life.",
    "Healing and closure from unresolved issues and grief.",
    "Enhanced personal growth."
]

const data = {
    row1: [
        {
            title: "Tarot Reading",
            content: "Using a deck of cards to gain insights into past, present, and future events, providing guidance and clarity on life's questions and challenges."
        },
        {
            title: "Psychic Reading",
            content: "Tapping into intuitive abilities to perceive information beyond the five senses, offering guidance and predictions about various aspects of life."
        },
        {
            title: "Automatic Reading",
            content: "Channeling subconscious thoughts and energies to provide spontaneous insights and messages without conscious control or interpretation."
        },
        {
            title: "Ancient Divine Reading",
            content: "Drawing upon ancient divination methods and rituals to access higher wisdom and spiritual guidance for individuals seeking clarity and direction."
        },
        {
            title: "Numerology Reading",
            content: "Analyzing numbers and their symbolic meanings to uncover insights about personality traits, life paths, and future possibilities."
        },
        {
            title: "Face Reading",
            content: "Interpreting facial features and expressions to understand personality traits, emotions, and life patterns, providing insights into individual behaviour and character."
        },
        {
            title: "Pendulum Reading",
            content: "Using a swinging pendulum to access subconscious knowledge and spiritual guidance, providing yes or no answers to specific questions."
        },
        {
            title: "Soul Reading",
            content: "Connecting with an individual's soul essence to uncover deep-seated truths, past-life experiences, and spiritual lessons for personal growth and healing."
        },
        {
            title: "Akashic Records",
            content: "Gain insights into past, present, and future accessing universal energy for spiritual growth. Our experts help you uncover valuable information and wisdom to support your spiritual journey and personal growth."
        },

    ],
    row2: [
        {
            title: "Cord Cutting",
            content: "A powerful technique for cutting cords with toxic relationships. We facilitate the removal of attachments that may be draining your energy or hindering your progress. This leads to a greater sense of freedom, clarity, and emotional well-being."
        },
        {
            title: "Mediumship",
            content: "Communicating with spirits of the deceased to provide messages, closure, and reassurance to the living, facilitating healing and connection with the spirit world."
        },
    ]
}
const Healing = () => {
    const navigate = useNavigate();
          const { authentication } = useAuthenticationSlice();
    return (
        <Box className="main-container">
            <Box className="section-container"  bgImage={heroImg} bgPosition={'center'} bgRepeat={'no-repeat'} bgSize={'cover'}>
                <Flex justifyContent={'center'} alignItems={'center'} h={'auto'} py={{ base: 16, md: 16, lg: 36 }} >
                    <Box textAlign={'center'}>
                        
                        <Text fontSize={{ base: "xl", md: '2xl', lg: '6xl' }} fontWeight={600} mt={2}>Transform Pain into Power:<br /> Embrace Healing and Wholeness</Text>
                        
                    </Box>
                </Flex>
            </Box>

            <Box>
                <Box className="section-container" pt={{ base: 10, md: 16 }} pb={12}>
                <center>                        <Text fontWeight={700} fontSize={{ base: "18px", md: "24px", lg: "28px" }}  my={8} width={{ base: '90%', md: '90%' }}>Release Past Traumas and Experience Profound Healing— Physically, Emotionally, and Spiritual Level.</Text>
                </center>
                    <Flex gap={{ base: 6, md: 10 }} justifyContent={'space-between'}
                        alignItems={'center'}
                        flexDirection={{ base: 'column', md: 'row' }}>
                        <Box>
                            <Text className='heading' color={'var(--peach)'}>WE UNDERSTAND YOUR PAINS:</Text>
                            <Text fontSize={'20px'} className="paragraph" mt={4} w={{ base: '100%', md: '90%' }}>
                            Our spiritual and emotional scars from life's journey can be very heavy on our hearts and souls. Unsolved sorrow, unsolved traumas, and lingering emotions can weigh us down and prevent us from reaching true peace and clarity.
                            </Text>
                            <UnorderedList mt={6} spacing={4}>
                                <ListItem fontSize={'20px'}>Do you find it <Box as="span" fontWeight={'700'}>difficult to forgive and let go</Box> of the hurts and betrayals from the past?</ListItem>
                                <ListItem fontSize={'20px'}>Are you having <Box as="span" fontWeight={'700'}>trouble finding closure and acceptance</Box> because of the memories of loss, grief, or abandonment?</ListItem>
                                <ListItem fontSize={'20px'}>Do you wish you could <Box as="span" fontWeight={'700'}>reconnect with your inner self</Box> and recover your sense of significance and purpose?</ListItem>
                                <ListItem fontSize={'20px'}>Are you navigating personal problems or mental obstacles and <Box as="span" fontWeight={'700'}>looking for direction and clarity</Box>?</ListItem>
                                <ListItem fontSize={'20px'}>Do you long to connect with people, the world, and yourself on a deeper level, yet feel <Box as="span" fontWeight={'700'}>blocked by fear, doubt, or uncertainty</Box>?</ListItem>
                                
                            </UnorderedList>
                        </Box>
                        <Box>
                            <Image src={sec2Img} alt="sec2Img" w={'100%'} h={'100%'} maxH={'800px'} />
                        </Box>
                    </Flex>

                </Box>
                <Box bgGradient={'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(245,217,219,1) 100%)'} py={8}>
                    <Text className="section-container paragraph" fontSize={'20px'} textAlign={'center'} ml={{ base: 0, md: 10 }}> Trust us when we say this, that you are not alone. We and many people like us have walked similar paths, facing their battles with pain and uncertainty. And through healing have beautifully found their way back to wholeness.</Text>
                </Box>
            </Box>
            {/* solution section */}
            <Box mt={4}>
                <Solution
                    tags={tags}
                    buttonContent="WE HELP WITH"
                    heading="THE SOLUTION"
                    paragraph="At AlterBuddy, we're more than just listeners. Here, we create a safe sanctuary for your innermost thoughts and emotions to flourish. It's a journey of self-discovery and healing, where every step is embraced with warmth and compassion
"
                />
            </Box>

            <Box>
                <HolisticWelness
                    Mainheading="Our Approach: Holistic & Transformational Healing"
                    Mainpara="At AlterBuddy, we offer more than just guidance—we create a safe, nurturing space where you can heal, grow, and rediscover your inner strength. Through a blend of evidence-based techniques and spiritual healing, we help you release past wounds, restore balance, and embrace a renewed sense of peace and clarity."
                    data={data}
                />
            </Box>
            <Box>
                <WhatYouGain
                    gainList={gainList}
                    gainImg={gainImg}
                    heading="WHAT DO YOU GET"
                />
            </Box>

            <Box>
                        <Text my={8} textAlign={'center'} className='section-container' fontWeight={600} fontSize={'30px'} color={'var(--peach)'}>IN SHORT ‘WE BECOME YOUR GUIDING ANGEL ON YOUR JOURNEY TOWARDS GROWTH’</Text>
                        </Box>

            {/* <Box>
              <Coaches categoryId={'67f3a49a71662664c3028410'}/>
            </Box> */}
            <Flex  justifyContent={'center'} alignItems={'center'}>
                                          <Button mb={{ base: 6, md: 4, lg: 4 }} bg={'var(--peach)'} color={'white'}
                                                     px={8}     py={{ base: 6, md: 6, lg: 7 }} rounded={'full'}
                                                          fontWeight={600} fontSize={{ base: '16px', md: '16px', lg: '18px' }}  onClick={() => {
                                                            if(!authentication){
                                                              navigate('/sign-in')
                                              
                                                            }else{
                                                              navigate('/mentor/list')
                                              
                                                            }
                                                          }} colorScheme=''>TALK TO US NOW</Button>
                                          </Flex>

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
                                        <Text fontSize="20px" color="gray.700" fontStyle="italic">
                                          “Believe in yourself and your dreams, for you are the architect of your destiny. Let your actions speak louder than your fears.”
                                        </Text>
                                      </Stack>
                                      <Text
                                        mt={4}
                                        textAlign="right"
                                        fontWeight="semibold"
                                        fontSize="lg"
                                        color="gray.600"
                                        as="cite"
                                        display="block"
                                      >
                                        —  Brendon Burchard
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
                        <FaqHealing />
                    </Flex>
                </Box>
            </Box>
        </Box>
    )
}
export default Healing;