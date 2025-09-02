// Import Chakra UI components
import { Box, Button, Divider, Flex, Grid, Heading, Highlight, Icon, Image, List, ListItem, Stack, Text, UnorderedList, VStack } from '@chakra-ui/react';

// Import images
import heroImg from "../../../../assets/new-images/images/dating-relationship-main.png";
import datingrelation from "../../../../assets/new-images/images/dating-relation-2.png";
import datingrelationn from "../../../../assets/new-images/images/dating-relation-3.png";
import bgeffect from "../../../../assets/new-images/images/Ellipse.png";
import dr1 from "../../../../assets/final-image/images/dr1.png";
import dr2 from "../../../../assets/final-image/images/dr-2.png";
import dr3 from "../../../../assets/final-image/images/dr-3.png";
import dr4 from "../../../../assets/final-image/images/dr-4.png";
import dr5 from "../../../../assets/final-image/images/dr-5.png";
import dr6 from "../../../../assets/final-image/images/dr-6.png";

// Import custom components
import HolisticWelness from './component/mental-wellness';
import WhatYouGain from './component/what-gain';
import { Coaches } from '../../../../component/cards/coaches';
import FAQs from '../../../../component/faqs';
import { useAuthenticationSlice } from '../../../../redux/features';

// Import react-router's useNavigate hook
import { Link, useNavigate } from 'react-router-dom';
import { FaQuoteLeft } from "react-icons/fa";
import FaqDatingRelation from '../../../../component/faq-dating-relation';

const content = [
  {
    section: "1. Personality Makeover",
    items: [
      {
        title1: <Box fontSize={'20px'}>
              <li>Self-Discovery & Goal Mapping</li></Box>,
        description1:
          "We start by getting to know you—what you believe, what you fear, and who you want to become in love and life. Then, we build a path around your version of success.",
          title2: <Box fontSize={'20px'}>
              <li>Real Confidence Training</li></Box>,
          description2:
            "Through hands-on exercises, mindset shifts, and guided challenges, we help you develop a grounded, quiet confidence that holds strong, especially when it matters most.",
            image: dr1,
      },
    ],
  },
  {
    section: "2. Style That Speaks Before You Do",
    items: [
      {
        title1: <Box fontSize={'20px'}>
              <li> Wardrobe That Matches Your Energy</li></Box>,
        description1:
          "No makeovers. No trends. We help you dress in a way that feels like you, but sharper, stronger, and unmistakably attractive.",
          title2: <Box fontSize={'20px'}>
              <li> Grooming + Modern Etiquette</li></Box>,
          description2:
            "We show you the details women actually notice. Clean grooming, subtle gestures, respectful behavior, all the unspoken things that set you apart.",
            image: dr2,
      },
    ],
  },
  {
    section: "3. Body Language Training (Non-Verbal Communication)",
    items: [
      {
        title1: "",
        description1:
          <Box fontSize={'20px'}>
            <li > We coach you on how to walk, how to stand tall, and how to make eye contact.</li>
            <Text ml={2} fontSize={'20px'}> Emphasizing non-verbal cues like smiling at the right time, making the right conversations and owning the room with presence.</Text>
          </Box>,
          title2: "",
          description2:
          <Box fontSize={'20px'}>
              <li> We teach you “how to hold a woman’s gaze without making it awkward.”</li></Box>,
            
            image: dr3,
      },
    ],
  },
  {
    section: "4. Conversation Skills",
    items: [
      {
        title1: "",
        description1:
          "We train you on : ",
          title2: "",
          description2:
            <Box mt={'-24px'}>
              <li>Small talk strategies</li>
              <li>How to compliment without sounding creepy</li>
              <li>Active Listening</li>
              <li>Witty responses and timing</li>
              <li>Active Listening</li>
              <li>Using storytelling to be more engaging.</li>
              
            </Box>,
            image: dr4,
      },
    ],
  },
  {
    section: "5. Flirting and Attracting Strategies (WITHOUT THE CRINGE):",
    items: [
      {
        title1: "",
        description1:
          "",
          title2: "",
          description2:
            <Box mt={'-50px'}>
              <li>We introduce you to the art of flirting: playful, respectful, and confident.</li>
              <li>Help you understand when to speak, when to pause, and when to let silence work.</li>
              <li>Make you practice scenarios, where we teach you how to drop subtle hints of interest.</li>
            </Box>,
            image: dr5,
      },
    ],
  },
  {
    section: "6. Practice. Feedback. Progress.",
    items: [
      {
        title1: <Box fontSize={'20px'}>
              <li>Role-Play & Real-World Scenarios</li></Box>,
        description1:
          "We don’t just talk- we train. Step into safe, guided scenarios where you can test what you’ve learned in real conversations.",
          title2: <Box fontSize={'20px'}>
              <li>One-on-One Feedback</li></Box>,
          description2:
            "No fluff, no judgment. Just honest, actionable insights on what’s working, what isn’t, and how to level up, fast.",
            image: dr6,
      },
    ],
  },
];

const data = {
    row1: [
        {
            title: "Active Listening",
            content: "Experience a warm, judgment-free space where you can express your feelings freely. Our compassionate team is here to truly listen and support your emotional journey."
        },
        {
            title: "Emotional Clarity",
            content: "We help you understand your emotions, triggers, and desires, providing compassionate guidance that empowers you to navigate your relationships with confidence and clarity."
        },
        {
            title: "Guidence & Healing",
            content: "Receive practical tools and insights to confidently navigate your relationships. Our holistic approach empowers you to heal and thrive in every connection."
        },

    ],
    row2: [
        {
            title: "Self-Love & Growth",
            content: "Embrace your authentic self while building healthy connections and setting strong boundaries. We nurture your journey toward lasting self-love and continual growth."
        },
        {
            title: "Mindfulness & Relfection",
            content: "Cultivate self-awareness through mindful practices and reflective exercises. We encourage continuous personal development to support your overall well-being."
        },
    ]
}

const dataa = [
    "Release emotional baggage and past heartbreak, finding a sense of relief.",
    "Feel heard, valued, and supported in a safe, judgment-free space.",
    "Gain clarity on relationship challenges and personal growth.",
    "Reduce stress and build healthier, more fulfilling connections",
]
const DatingRelationship = () => {

  const carddata = [
    {
        title: "No Pretending. Just Becoming.",
        desc1: '“We don’t teach you to fake it. We help you become it—for real.”',
        desc2: "It’s about becoming the kind of man who’s magnetic because he’s real—grounded, confident, and aware of his own worth."
        
    },
    {
        title: "Tailored to Your Story",
        desc1: "No two men are the same.That’s why nothing we offer is cookie-cutter.",
        desc2: "Every move, every strategy, and every conversation we guide you through is built around your personality, experiences, and goals.",
     
    },
    {
        title: "Authenticity Over Tricks",
        desc1: "We won’t hand you tricks to impress her.",
        desc2: "We’ll help you express yourself—clearly, confidently, and in a way that makes her want to know more.",
        
    },
]

    const navigate = useNavigate();
    const { authentication } = useAuthenticationSlice();
    return (
        <Box className='main-container'>
            <Box pt={72} className="section-container" bgImage={heroImg} bgPosition={'center'} bgRepeat={'no-repeat'} bgSize={'cover'}>
                <Flex justifyContent={'center'} alignItems={'center'} h={'auto'} py={{ base: 16, md: 16, lg: 20 }} >
                    <Box textAlign={'center'}>
                        <Text className="heading" color={'var(--peach)'}>YOU THINK SHE’D NEVER LOOK YOUR WAY: WAIT TILL SHE CAN’T LOOK AWAY.</Text>
                        <Text fontSize={{ base: "xl", md: '2xl', lg: '3xl' }} color={'white'} fontWeight={600} mt={2}>Style. Presence. Energy. We’ll build it with you, step by step.</Text>

                    </Box>
                </Flex>
            </Box>

            {/* <Box>
                <Box className="section-container" pt={{ base: 10, md: 16 }} pb={12}>
                    <Flex gap={{ base: 6, md: 10 }} justifyContent={'space-between'}
                        alignItems={'center'}
                        flexDirection={{ base: 'column', md: 'column', lg: 'row' }}>
                        <Box>
                            <Text className='heading' color={'var(--peach)'}>WE UNDERSTAND YOUR STRUGGLES</Text>
                            <Text className="paragraph" mt={4} w={{ base: '100%', md: '90%' }}>
                                Life’s journey often leaves emotional and spiritual scars. Unresolved grief, past traumas,
                                and lingering pain can weigh us down, making peace and clarity seem out of reach.
                            </Text>
                            <UnorderedList mt={6} spacing={4}>
                                <ListItem>Unresolved heartbreak and emotional pain</ListItem>
                                <ListItem>Trust issues and fear of vulnerability</ListItem>
                                <ListItem>Communication gaps and misunderstandings</ListItem>
                                <ListItem>Toxic realtionship patterns and unhealthy attachments</ListItem>
                                <ListItem>Uncertanity about commitment and future compatibility</ListItem>
                                <ListItem>Struggles with self love and self-worth in relationships</ListItem>
                            </UnorderedList>
                            <Button mt={{ base: 6, md: 4, lg: 10 }} bg={'var(--peach)'} color={'white'}
                                w={{ base: 'max', md: 'max', lg: 'max' }} py={{ base: 6, md: 6, lg: 8 }} rounded={'full'}
                                fontWeight={400} fontSize={{ base: '16px', md: '16px', lg: '20px' }} onClick={() => navigate('/login')} colorScheme=''>Feel Free to Connect with Us</Button>
                        </Box>
                        <Box w={'80%'} h={'100%'}>
                            <Image src={datingrelation} alt="sec2Img" w={'100%'} h={'90%'} maxH={'800px'} />
                        </Box>
                    </Flex>

                </Box>

            </Box> */}

            <Box mt={14} bg="#FFF5F6" py={8} >
      <VStack spacing={1}  align={"start"} className='section-container'>
        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="#D86570">
          You see her. She’s so captivating, you forget to blink.
        </Text>

        <Text fontSize={'20px'} color="gray.700">
          You know she’s stunning, But a quiet voice inside you whispers, "She’s out of your league."
        </Text>

        <Text fontSize="20px" color="gray.700">
          You want to walk up to her, say something, anything. But your feet stay frozen.
        </Text>

        <Text fontSize="20px" color="gray.700">
          Your voice, stuck somewhere between your heart and your throat. You try, but fumble.
        </Text>

        <Text fontSize="20px" color="gray.700">
          And then you finally back out. With a sigh, you tell yourself: She deserves someone better.
         {" "}
          Someone more handsome. More confident.
        </Text>

        <Text fontSize="2xl" fontWeight="semibold" color="#D86570" pt={4}>
          But, here’s the truth:
        </Text>

        <VStack align="start" spacing={3}>
          <Text fontSize="20px" color="gray.700">
            You don’t need to be richer, taller, or cooler.
          </Text>
          <Text fontSize="20px" color="gray.700">
            You just need someone to show you how to show up.
          </Text>
          <Text fontSize="20px" color="gray.700">
            The version of you that turns hesitation into connection.
          </Text>
          <Text fontSize="20px" color="gray.700">
            The one she not just notices but remembers.
          </Text>
        </VStack>

        <Text fontSize="2xl" fontWeight="bold" color="#D86570" pt={4}>
          That’s what we do.
        </Text>
      </VStack>
    </Box>

    <Box bg="white" pt={'-6px'} >
      <VStack spacing={1} align="start" className='section-container' >
        <Heading
          as="h2"
          textAlign={'center'}
          w={'100vw'}
          color="#D86570"
          pb={1}
        >
          WHAT WE DO
        </Heading>

        <Text mt={6} fontSize="22px" color="gray.700">
          We help you become the <strong>Man she would walk up to</strong>. Someone who knows:
        </Text>

        <VStack  mt={4} align="start" spacing={0}>
          <Text fontSize="22px" color="gray.700">
           - What to wear and how to speak.
          </Text>
          <Text fontSize="22px" color="gray.700">
           - How to give subtle gestures (when to lean in just enough), to the timing of a smile.
          </Text>
          <Text fontSize="22px" color="gray.700">
           - How to enter a room with quiet confidence and leave a lingering presence.
          </Text>
          <Text fontSize="22px" color="gray.700">
           - How to hold a gaze, start a spark, and leave a lasting impression.
          </Text>
        </VStack>

        <Text my={2} fontSize="22px" color="gray.700" pt={4}>
          We help you master it all.
        </Text>

        <Text my={2} fontSize="22px" color="gray.700">
          We’re with you, every moment, building the kind of confidence that radiates.
        </Text>

        <Text mt={2}  fontSize="22px" color="gray.700">
          We guide you step by step, into becoming the man who doesn’t chase attention… he naturally draws it.
        </Text>

        <Text my={1} fontSize="22px" fontStyle="italic" color="gray.600" pt={4}>
          You’re not invisible. You’re just undiscovered.
        </Text>

        <Text my={2} fontSize="2xl" fontWeight="bold" color="#D86570">
          Let’s change that.
        </Text>
      </VStack>
    </Box>

    <Flex mt={2} justifyContent={'center'} alignItems={'center'}>
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

            {/* <Box my={10}>
                <HolisticWelness
                    Mainheading="OUR APPROACH TO RELATIONSHIP WELLNESS"
                    Mainpara="At AlterBuddy, our approach to relationship wellness starts with creating a safe, non-judgmental space where you can freely explore your feelings and experiences. We emphasize active listening and emotional clarity, guiding you through self-discovery to understand your inner world. Through compassionate support, we empower you to build healthy, fulfilling relationships that truly resonate with who you are."
                    data={data}
                />
            </Box>

            <Box>
                <WhatYouGain
                    gainList={dataa}
                    gainImg={datingrelationn}
                    heading="WHAT YOU’LL GAIN IN RELATIONSHIPS"
                />
            </Box>

            <Coaches categoryId={'67f3a4aa71662664c302841c'}/> */}

<Box bg="#FFF5F6" py={6} px={10}>
      <VStack  spacing={5} align="start">
        <Box my={4} w={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
        <Heading size="xl" color="#D86570">
          WHAT YOU GET:
        </Heading>

        <Text mt={4} fontSize="22px" color="#D86570">
          Here’s a detailed breakdown of what you will gain:
        </Text>
        </Box>

        {content.map((section, idx) => (
          <Stack key={idx} spacing={10} w="full">
            

            {section.items.map((item, i) => (
              <Flex
                key={i}
                direction={{ base: "column", md: idx % 2 === 0 ? "row" : "row-reverse" }}
                align="center"
                justifyContent={idx===3 ? "space-between": ""}
                gap={6}
                bg="white"
                borderRadius="xl"
                boxShadow="md"
                p={6}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  boxSize={{ base: "250px", md: "300px" }}
                  borderRadius="lg"
                  objectFit="cover"
                />
                <VStack align="start" spacing={2}>
                <Heading mb={6} size="lg" color="#D86570">
              {section.section}
            </Heading>
                  <Text fontSize="20px" ml={4} fontWeight="semibold" color="gray.800">
                    {item.title1}
                  </Text>
                  <Text ml={6} fontSize="20px" color="gray.700">
                    {item.description1}
                  </Text>

                  <Text mt={6} ml={4} fontSize="20px" fontWeight="semibold" color="gray.800">
                    {item.title2}
                  </Text>
                  <Text ml={6} fontSize="20px" color="gray.700">
                    {item.description2}
                  </Text>
                </VStack>
              </Flex>
            ))}

            {idx < content.length - 1 && (
              <Divider borderColor="#D86570" opacity={0.3} />
            )}
          </Stack>
        ))}
      </VStack>
    </Box>
<Flex mt={8} justifyContent={'center'} alignItems={'center'}>
                              <Button mb={{ base: 6, md: 4, lg: 10 }} bg={'var(--peach)'} color={'white'}
                                         px={8}     py={{ base: 6, md: 6, lg: 7 }} rounded={'full'}
                                              fontWeight={600} fontSize={{ base: '16px', md: '16px', lg: '18px' }}
                                              onClick={() => {
                                                if(!authentication){
                                                  navigate('/sign-in')
                                  
                                                }else{
                                                  navigate('/mentor/list')
                                  
                                                }
                                              }}  colorScheme=''>TALK TO US NOW!</Button>
                              </Flex>
    <Box mt={2}  w={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
        <Heading size="xl" color="#D86570">
          WHY CHOOSE US:
        </Heading>
        </Box>

    <Grid bgImage={bgeffect} className='section-container' templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={{ base: 6, md: 0, lg: 0 }} mt={10}>
                        {carddata.map((item, index) => (
                            <Box  key={index} p={5} border={'none'} borderStyle={'none'}>
                                <Text textAlign={'center'} fontSize={{ base: '18px', md: '24px' }} fontWeight={600} color={'#1D2B4F'}>{item.title}</Text>
                                <Text marginX={'auto'} width={'60%'} textAlign={'center'} fontSize={'20px'} mt={4} className='paragraph' color={'#636E88'}>{item.desc1}</Text>
                                <Text marginX={'auto'} width={'60%'} fontSize={'20px'} textAlign={'center'} mt={4} className='paragraph' color={'#636E88'}>{item.desc2}</Text>
                            </Box>
                           
                        ))}
                    </Grid>

                    <Flex mt={12} justifyContent={'center'} alignItems={'center'}>
                              <Button mb={{ base: 6, md: 4, lg: 10 }} bg={'var(--peach)'} color={'white'}
                                         px={8}     py={{ base: 6, md: 6, lg: 7 }} rounded={'full'}
                                              fontWeight={600} fontSize={{ base: '16px', md: '16px', lg: '18px' }} onClick={() => {
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
                                          “Don’t just dream about her. Become the reason she starts dreaming about you.”
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
                                        —  Unknown
                                      </Text>
                                    </Box>

                                    <Box  mt={8} bgGradient={'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(245,217,219,1) 100%)'} py={8}>
                <Text fontSize={'2xl'} mb={4} fontWeight={700} className="section-container paragraph" textAlign={'center'} ml={{ base: 0, md: 10 }}> Book your 1-on-1 consultation now.
                The path to confidence, connection, and real attraction begins here</Text>
                
            </Box>

            <Box pt={8} pb={14} >
                <Box className='section-container'>
                    <Flex marginX="auto" flexDirection="column" width="100%">
                        <Flex justifyContent="center" pb={4}>
                            <Heading mt={6} size="lg">
                                Frequently Asked Questions
                            </Heading>
                        </Flex>
                        <FaqDatingRelation />
                    </Flex>
                </Box>
            </Box>
        </Box>
    )
}

export default DatingRelationship
