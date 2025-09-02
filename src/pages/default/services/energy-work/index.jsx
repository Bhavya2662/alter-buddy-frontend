import { Box, Button, Flex, Heading, Image, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react'
import React from 'react'
import heroImgbg from "../../../../assets/new-images/images/energy-work-main.png";
import sec2Img from "../../../../assets/new-images/images/energy-work-hero.png";
import et1 from "../../../../assets/final-image/images/et1.png";
import et2 from "../../../../assets/final-image/images/et2.png";
import et3 from "../../../../assets/final-image/images/et3.png";
import et4 from "../../../../assets/final-image/images/et4.png";
import et5 from "../../../../assets/final-image/images/et5.png";
import et6 from "../../../../assets/final-image/images/et6.png";
import et7 from "../../../../assets/final-image/images/et7.png";
import sec3Img from "../../../../assets/new-images/images/sec3-energy-work.png";
import gainImg from "../../../../assets/new-images/images/gainImg-energy-work.png";
import HolisticWelness from "../dating-relationship/component/mental-wellness";
import { FaRegCircleCheck } from 'react-icons/fa6';
import { Coaches } from '../../../../component/cards/coaches';
import Index from '../../../../component/faqs';
import FaqEnergyWork from '../../../../component/faq-energy-work';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthenticationSlice } from '../../../../redux/features';

const dataa = [
  "Release built-up emotional tension and stagnant energy",
  "Rebalance your chakras and awaken inner harmony",
  "Improve mental clarity, focus, and emotional resilience",
  "Reduce stress and reconnect with a deeper sense of peace",
  "Experience a renewed connection to your authentic self",
];

const services = [
  {
    title: "BOOK YOUR ENERGY SCAN",
    subpara: "Before the shift begins, we listen.",
    content: <Box>
      <Text fontSize={'18px'} my={3}>To manifest what you truly desire, your energy must first be aligned. This is where real transformation begins- with insight, clarity, and the kind of spiritual precision only the top 1% of masters can offer.</Text>
      <Text fontSize={'18px'} my={3} fontWeight={'600'}>Our energy scans are conducted by seasoned spiritual coaches who’ve been doing this energy work for generations and have worked with high-level CEOs, High Net-Worth Individuals , and even billionaires.</Text>
      <Text fontSize={'18px'} my={3}>With decades of experience and countless breakthroughs under their belt, they don't just read your energy, they listen to what your soul has been trying to say all along.</Text>
      <Box fontSize={'18px'}>
        <Text mb={4} >We tap into your energy field to gently sense:</Text>
        <li>Unspoken pain</li>
        <li>Hidden energetic blocks</li>
        <li>Past life or ancestral residue</li>
        <li>Thoughts or feelings projected by others</li>
      </Box>
      <Text fontSize={'18px'} my={3}>This is your starting point. Once we know what’s there, we can start clearing it.</Text>
      <Text fontSize={'18px'} my={3} fontWeight={'600'}>This isn’t therapy. This isn’t talk. This is real energetic alignment.</Text>
      <Text fontSize={'18px'} my={3}>It’s simple. You don’t have to do anything. We just need your name, photo and date of birth.</Text>
    </Box>,
    img: et1,
    btn: "BOOK MY ENERGY SCAN NOW",
  },
  {
    title: "ENERGY REMOVAL",
    subpara: "Releasing What Was Never Yours to Carry",
    content: <Box>
      <Text fontSize={'18px'} my={3}>Some of us are walking around with years of energy that doesn’t belong to us- pain from childhood, trauma from past lives, energy picked up from people around us.</Text>
      <Text fontSize={'18px'} my={3}>This service is about a gentle but powerful release.</Text>
      <Box fontSize={'18px'}>
        <Text mb={4}>We tune in and remove:</Text>
        <li>Energy attachments</li>
        <li>Psychic debris</li>
        <li>Childhood conditioning</li>
        <li>Residue from past relationships</li>
        <li>Unseen blocks slowing you down</li>
      </Box>
      <Text fontSize={'18px'} my={3} fontStyle={'italic'}>This isn’t just a cleanse. It’s a reset for your soul.</Text>
      <Text fontSize={'18px'} my={3}>We guide you through a calming, grounded process of energy removal.
        No drama. No relieving pain. Just a gentle release.</Text>
      <Text fontSize={'18px'} my={3}>You’ll feel lighter. Brighter. More you.</Text>
      <Text fontSize={'18px'} my={3}>Healing doesn’t have to hurt. Sometimes, it’s as soft as a breath finally let out.</Text>

    </Box>,
    img: et2,
    btn: "",
  },
  {
    title: "VORTEX PROTECTION",
    subpara: "Protect your power like the stars do.",
    content: <Box>
      <Text fontSize={'18px'} my={3}>Vortex Protection creates a powerful but peaceful shield around you, allowing in only what serves you, and gently repelling what doesn’t.</Text>
      <Text fontSize={'18px'} my={3} fontWeight={'600'}>Celebrities, rising talents, industry tycoons, high-profile leaders, and influencers- when they need elite energetic shielding, they come to us.</Text>
      <Text fontSize={'18px'} my={3}>We provide one of the most powerful vortex energy protection solutions available today- trusted by the best, and tailored to maintain your manifesting frequency with zero external interference.</Text>
      <Text fontSize={'18px'} my={3}>This isn’t your average energy shield. It’s a premium-grade protection system.</Text>
      <Box fontSize={'18px'}>
        <Text mb={4}>We create a vortex of protection around you that:</Text>
        <li>Blocks draining energy from others</li>
        <li>Keeps your aura sealed</li>
        <li>Helps you stay balanced in any environment</li>
      </Box>
      <Text fontSize={'18px'} my={3} fontStyle={'italic'}>Especially powerful for empaths, performers, healers, influencers, and anyone stepping into the spotlight.</Text>
      <Text fontSize={'18px'} my={3}>If you're building something big, this is your non-negotiable layer of protection.
      </Text>
    </Box>,
    img: et3,
    btn: "BOOK ME FOR MY VORTEX PROTECTION",
  },
  {
    title: "RAISE YOUR VIBRATION",
    subpara: "Manifest faster. Live lighter. Attract more.",
    content: <Box>
      <Text fontSize={'18px'} my={3} fontWeight={'600'}>There’s a lot of talk and confusion around the Law of Vibration and what it really takes to raise your frequency.</Text>
      <Text fontSize={'18px'} my={3}>Truth is, this kind of energy elevation isn’t just a DIY fix. It’s a high-level energetic recalibration that only a rare few can facilitate, gifted mediums with extraordinary abilities.</Text>
      <Text fontSize={'18px'} my={3}>And yes, they’re right here.</Text>
      <Text fontSize={'18px'} my={3}>This is a one-time energetic upgrade designed to align you with higher frequencies so you can attract what’s meant for you- faster, smoother, and with far more clarity.</Text>
      <Box fontSize={'18px'}>
        <Text mb={4}>This session helps you:</Text>
        <li>Feel emotionally lighter</li>
        <li>Open your heart and mind</li>
        <li>Attract aligned people and opportunities</li>
        <li>Raise your intuitive powers</li>
      </Box>
      <Text fontSize={'18px'} my={3} fontStyle={'italic'}>Your vibe creates your life. Let’s upgrade it.</Text>
    </Box>,
    img: et4,
    btn: "",
  },
  {
    title: "LOVE AND RELATIONSHIPS",
    subpara: "Attract the kind of love that feels like home.",
    content: <Box>
      <Text fontSize={'18px'} my={3} fontWeight={'600'}>Ready to transform your love life or bring more harmony into your relationships? Book a private 1:1 session focused on matters of the heart- whether it’s love, marriage, or healing emotional blocks.</Text>
      <Text fontSize={'18px'} my={3}>We’ll dive into the energetic patterns surrounding your connection dynamics and heart space, offering real insights and actionable guidance.</Text>
      <Box fontSize={'18px'}>
        <Text mb={4}>We work on: </Text>
        <li>Clearing past relationship wounds</li>
        <li>Releasing attachments or cords</li>
        <li>Shifting subconscious blocks around love</li>
        <li>Activating your energy to attract healthy love</li>
      </Box>
      <Text fontSize={'18px'} my={3}>Your love story starts with your energy.</Text>
    </Box>,
    img: et5,
    btn: "",
  },
  {
    title: "CAREER AND BUSINESS",
    subpara: "Clear the energy blocks that are holding your success back.",
    content: <Box>
      <Text fontSize={'18px'} my={3} fontWeight={'600'}>Feeling stuck or uncertain about your next professional move? In a personalized 1:1 session, we’ll tap into your energy field to decode blocks, align your goals, and bring clarity to your path forward.</Text>
      <Text fontSize={'18px'} my={3}>Whether you're navigating a shift, building your empire, or craving purpose in your work, our energy-guided approach will unfold insights you didn’t know you needed.</Text>
      <Box fontSize={'18px'}>
        <Text mb={4}>This service helps you:</Text>
        <li>Release limiting beliefs around money and success</li>
        <li>Clear sabotage patterns from your field</li>
        <li>Open up to receiving opportunities</li>
        <li>Align with your soul’s true purpose</li>
      </Box>
      <Text fontSize={'18px'} my={3}>Success isn’t just about hustle. It’s also about frequency.</Text>
    </Box>,
    img: et6,
    btn: "",
  },
  {
    title: "ARE YOU A TALENT?",
    subpara: "Align your energy before you align with the world",
    content: <Box>
      <Text fontSize={'18px'} my={3} fontWeight={'600'}>If you’re someone with big dreams, bold moves, or powerful influence—you’re already a talent.</Text>
      <Text fontSize={'18px'} my={3}>But before you step into that next deal, pitch, launch, or spotlight, make sure your energy is aligned with your goals.</Text>
      <Text fontSize={'18px'} my={3}>When your energy is clear and protected, success becomes smoother—and smarter.</Text>
      <Box fontSize={'18px'}>
        <Text mb={4}>We help rising talents by:</Text>
        <li>Clearing inner blocks that silently sabotage progress</li>
        <li>Sealing your energy so nothing drains your drive</li>
        <li>Activating clarity for decision-making moments</li>
        <li>Protecting your ambition from energy leaks and doubt</li>
      </Box>
      <Text fontSize={'18px'} my={3}>🎯 This is your edge. Manifest with intention. Move with power. Let’s prepare your energy for greatness.</Text>
    </Box>,
    img: et7,
    btn: "",
  },
];

const data = {
  row1: [
    {
      title: "Energy Clearing & Balancing",
      content: "Experience deep energetic cleansing to release negativity and restore your natural flow. Our sessions bring you back into alignment with calm, clarity, and balance."
    },
    {
      title: "Chakra Healing",
      content: "We focus on realigning blocked energy centers to help you regain emotional, mental, and spiritual stability. Feel renewed from within."
    },
    {
      title: "Spiritual Grounding",
      content: "Stay connected to the present and to your inner strength. Through grounding techniques, we help you feel more centered, safe, and at peace."
    },

  ],
  row2: [
    {
      title: "Mind-Body Awareness",
      content: "Reconnect your mind and body through guided breathwork, mindfulness, and intuitive healing. This creates space for inner clarity and transformation."
    },
    {
      title: "Inner Alignment",
      content: "Reconnect with your true self. We guide you to align your mind, body, and soul for a deeper sense of purpose and inner calm."
    },
  ]
}

const EnergyWork = () => {
  const navigate = useNavigate();
  const { authentication } = useAuthenticationSlice();
  return (
    <Box className='main-container'>
      <Box className="section-container" bgImage={heroImgbg} bgPosition={'center'} bgRepeat={'no-repeat'} bgSize={'cover'}>

        <Box className="section-container" pt={{ base: 10, md: 16 }} pb={12}>
          <Flex gap={{ base: 6, md: 10 }} justifyContent={'space-between'}
            alignItems={'center'}
            flexDirection={{ base: 'column', md: 'row' }}>
            <Box>
              <Text className='heading' fontWeight={'600'} color={'var(--peach)'}>YOUR ENERGY REMEMBERS WHAT YOUR MIND FORGOT. WE HELP YOU HEAR THEM AND CLEAR THEM,</Text>
              <Text className="paragraph" fontWeight={'600'} fontSize={'2xl'} mt={4} w={{ base: '100%', md: '90%' }}>
                With the Top 1% Manifestation Masters in our forum, guiding celebrities, public figures, and billionaires, you can rest assured you are in the best hands.
              </Text>

            </Box>
            <Box width={'100%'}>
              <Image src={sec2Img} alt="sec2Img" w={'100%'} h={'100%'} maxH={'800px'} />
            </Box>
          </Flex>

        </Box>

      </Box>
      {/* <Box my={2} bgGradient={'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(245,217,219,1) 100%)'} py={8}>
                                                      <Text className="section-container paragraph" ml={{ base: 0, md: 10 }}> <span style={{ color: 'var(--peach)', fontWeight: 600 }}>What is Energy Work—</span> Energy Work is a gentle, non-invasive practice that focuses on shifting and rebalancing your body’s energy systems. It helps clear emotional clutter, relieve stress, and promote deep relaxation—supporting overall mental, emotional, and physical well-being.</Text>
       </Box> */}

      <Box bg="#FFF5F6" py={16} px={{ base: 6, md: 20 }} color="gray.700">
        <VStack spacing={4} textAlign="center">
          <Heading size="lg" color="#D86570">
            Pain doesn’t always start with a memory- it starts with stuck energy.
          </Heading>
          <Text fontSize="2xl" fontWeight="semibold">
            Do You Feel Heavy For No Reason? It’s Not In Your Health, It’s In Your Energy.
          </Text>
          <Text fontSize="lg">
            Have you ever walked into a room and felt something weird, even if no one said a word?
            Or had days when your body feels tired even after a full night’s sleep.
            Your mind keeps replaying things you should’ve let go of years ago.
            And your heart? It feels heavy, like it's waiting to exhale.
          </Text>
          <Heading size="md" color="#D86570">
            That’s your energy talking.
          </Heading>
          <Text fontSize="lg">
            You can’t see it, but it’s there, just like the WiFi that helps your phone work, or the wind that moves the trees.
          </Text>
          <Heading size="md" color="#D86570" mt={6}>
            So, What’s Energy Work?
          </Heading>
          <Text fontSize="lg">
            It’s like cleaning your body and mind.
            We gently scan your energy to see where things feel blocked, tangled, or heavy.
          </Text>
          <Text fontSize="lg">
            And then?
            We help clear out the stuff that doesn’t belong to you anymore — old sadness, fear, worry, doubt, things that aren’t even yours to carry.
          </Text>
          <Heading size="md" color="#D86570" mt={6}>
            It’s Like a Soul-Detox.
          </Heading>
          <Text fontSize="lg">
            After that, you feel lighter, clearer, and more like yourself.
            You laugh more. Sleep better. Think sharper. Feel braver.
          </Text>
          <Text fontSize="lg">
            It helps the universe finally understand what you want and starts helping you get it.
          </Text>
        </VStack>
        <Flex mt={12} justifyContent={'center'} alignItems={'center'}>
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
      </Box>


      <Box className='section-container'>
        <Heading mt={10} size="xl" textAlign={'center'} color="#D86570">
          Energy work that transforms
        </Heading>
        <VStack spacing={16} py={10} >
          {services.map((service, index) => (
            <Flex
              key={index}
              direction={{ base: "column", md: index % 2 === 0 ? "row" : "row-reverse" }}
              alignItems={'center'}

              gap={10}
            >
              <Image
                src={service.img}
                alt={service.title}
                boxSize={{ base: "100%", md: "400px" }}

                borderRadius="xl"
                boxShadow="lg"
              />
              <Box maxW="4xl">
                <Text fontSize="2xl" fontWeight="bold" mb={4} color="#D86570">
                  {service.title}
                </Text>
                <Text fontSize="xl" fontWeight="bold" mb={4} color="black">
                  {service.subpara}
                </Text>
                <Text fontSize="md" color="gray.700" whiteSpace="pre-line">
                  {service.content}
                </Text>
                {service.btn === "" ? "" :
                  <Flex mt={8} alignItems={'center'}>
                    <Button mb={{ base: 6, md: 4, lg: 10 }} bg={'var(--peach)'} color={'white'}
                      px={8} py={{ base: 6, md: 6, lg: 6 }} rounded={'full'}
                      fontWeight={600} fontSize={{ base: '10px', md: '10px', lg: '14px' }} onClick={() => {
                        if (!authentication) {
                          navigate('/sign-in')

                        } else {
                          navigate('/mentor/list')

                        }
                      }} colorScheme=''>{service.btn}</Button></Flex>}
              </Box>
            </Flex>
          ))}
        </VStack>
      </Box>

      <Heading my={5} size="xl" textAlign={'center'} color="#D86570">
        Ready to Feel Lighter Inside?
      </Heading>
      <Box my={2} bgGradient={'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(245,217,219,1) 100%)'} py={8}>
        <Text textAlign={'center'} className="section-container paragraph" ml={{ base: 0, md: 10 }}> We call it an Energy Scan—but it’s just a beautiful way to say:
        </Text>
        <Text textAlign={'center'} fontWeight={'600'} className="section-container paragraph" ml={{ base: 0, md: 10 }}> "Let’s check in with your inner world... and make sure it’s as bright as you are."
        </Text>

      </Box>
      <Flex mt={8} justifyContent={'center'} alignItems={'center'}>
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

      {/* <Box>
                       <Box className="section-container" pt={{ base: 10, md: 16 }} pb={12}>
                           <Flex gap={{ base: 6, md: 10 }} justifyContent={'space-between'}
                               alignItems={'center'}
                               flexDirection={{ base: 'column', md: 'column', lg: 'row' }}>
                                <Box w={'80%'} h={'100%'}>
                                   <Image src={sec3Img} alt="sec2Img" w={'100%'} h={'90%'} maxH={'800px'} />
                               </Box>
                               <Box w={{ base: '100%', md: '90%' }}>
                                   <Text className='heading' color={'var(--peach)'}>WE UNDERSTAND YOUR ENERGY IMBALANCES</Text>
                                   
                                   <UnorderedList mt={6} spacing={4}>
                                       <ListItem>Feeling emotionally drained and energetically depleted</ListItem>
                                       <ListItem>Struggling with anxiety, restlessness, or lack of focus</ListItem>
                                       <ListItem>Blocked chakras and disrupted inner energy flow</ListItem>
                                       <ListItem>Emotional baggage stored in the body</ListItem>
                                       <ListItem>Disconnection from your true self and inner peace</ListItem>
                                       <ListItem>Struggles with grounding, clarity, and spiritual well-being</ListItem>
                                   </UnorderedList>
                                   <Button mt={{ base: 6, md: 4, lg: 10 }} bg={'var(--peach)'} color={'white'}
                                       w={{ base: 'max', md: 'max', lg: 'max' }} px={6} py={{ base: 6, md: 6, lg: 6 }} rounded={'full'}
                                       fontWeight={400} fontSize={{ base: '16px', md: '16px', lg: '20px' }} colorScheme=''>Talk to Us Now</Button>
                               </Box>
                               
                           </Flex>
       
                       </Box>
       
                   </Box> */}

      {/* <Box my={10}>
                <HolisticWelness
                    Mainheading="OUR APPROACH TO ENERGY WORK"
                    Mainpara="At AlterBuddy, our approach to energy healing is rooted in creating a tranquil, supportive space where you can reconnect with your inner self. We work through calming practices like chakra alignment, aura cleansing, and guided energy balancing to help you release stuck emotions and restore harmony. Through gentle, holistic techniques, we awaken your natural ability to heal and transform from within."
                    data={data}
                />
            </Box> */}

      {/* <Box className="section-container" pt={{ base: 10, md: 16 }} pb={12}>
                            <Flex gap={{base:6, md:10}} justifyContent={'space-between'} 
                            alignItems={'center'}
                            flexDirection={{base:'column-reverse', md:'row'}}>
                                  
                                <Box width={{base:'100%', md:'50%'}}>
                                  <Text  className='heading' color={'var(--peach)'}>WHAT YOU’LL GAIN FROM ENERGY WORK</Text>
                               
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
                                    <Image src={gainImg} alt="sec2Img" w={'100%'} h={'100%'} maxH={'600px'}/>
                                </Box>
                            </Flex>
            
                        </Box> */}

      {/* <Box>
                    <Coaches categoryId={'67f3a4b771662664c3028427'}/>
                  </Box> */}

      <Box pt={1} pb={14}>
        <Box className="section-container">
          <Flex marginX="auto" flexDirection="column" width="100%">
            <Flex justifyContent="center" pb={4}>
              <Heading mt={6} size="lg">
                Frequently Asked Questions
              </Heading>
            </Flex>
            <FaqEnergyWork />
          </Flex>
        </Box>
      </Box>
    </Box>

  )
}

export default EnergyWork
