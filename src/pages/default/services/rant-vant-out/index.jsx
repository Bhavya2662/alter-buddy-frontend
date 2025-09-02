// Import Chakra UI components
import { Box, Button, Flex, Heading, Icon, Image, ListItem, Stack, Text, UnorderedList, VStack, SimpleGrid, useToast } from "@chakra-ui/react";
import { FaQuoteLeft, FaVideo, FaVolumeUp, FaComments } from "react-icons/fa";
import {  useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

// Import images
import heroImg from "../../../../assets/new-images/images/rant-vant-out-hero-img.png";
import sec2Img from "../../../../assets/new-images/images/rantvant-sec2-img.png";
import mental3 from "../../../../assets/new-images/images/rent-outt.png";
// Import custom components
import HolisticWelness from "../dating-relationship/component/mental-wellness";
import WhatYouGain from "../dating-relationship/component/what-gain";
import FaqRant from "../../../../component/faq-rant-vant-out";
import { useAuthenticationSlice } from "../../../../redux/features";

const struggleListing = [
  "Overwhelming stress",
  "Emotional turmoil",
  "Bottled-up feelings",
  "Communication barriers",
  "Mental exhaustion",
  "Loneliness and Isolation",
  "Decision paralysis",
  "Lack of support",
  "Coping with trauma",
  "Seeking Validations",
];

const dataa = [
  "Release pent-up emotions and frustrations, leading to a sense of relief.",
  "Feel heard, understood, and supported in a safe and non-judgmental environment.",
  "Gain clarity and perspective on your challenges by expressing them openly and honestly.",
  "Reduce stress and tension, promoting overall emotional well-being and mental health.",
];

const data = {
  row1: [
    {
      title: "Active Listening",
      content:
        "Our listeners are trained to provide empathetic and non-judgmental support, allowing you to express yourself freely.",
    },
    {
      title: "Emotional Validation",
      content:
        "We understand that your feelings are valid, and we're here to acknowledge and validate them without criticism.",
    },
    {
      title: "Confidentiality",
      content:
        "Your privacy is our priority. Rest assured that anything you share during your rant session will be kept confidential.",
    },
  ],
};

const sessionTypes = [
  {
    type: 'audio',
    icon: FaVolumeUp,
    title: 'Audio Session',
    description: 'Voice-only anonymous call with a mentor'
  },
  {
    type: 'chat',
    icon: FaComments,
    title: 'Chat Session',
    description: 'Text-based anonymous chat with a mentor'
  }
];
const RantVantOut = () => {
  const navigate = useNavigate();
  const { authentication } = useAuthenticationSlice();
  const toast = useToast();
  const [selectedSessionType, setSelectedSessionType] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [socket, setSocket] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const redirectToSession = useCallback((sessionId, sessionType) => {
    const roomId = sessionData?.roomId || sessionId;
    const userToken = localStorage.getItem('USER_TOKEN');
    
    if (sessionType === 'chat') {
      // For chat sessions, use the existing user chat route with mentor ID and room ID
      const mentorId = sessionData?.mentorId || sessionId; // Use sessionId as fallback for anonymous
      navigate(`/user/chat/${mentorId}/${roomId}?sessionId=${sessionId}&userToken=${userToken}&isAnonymous=true`);
    } else if (sessionType === 'video' || sessionType === 'audio') {
      // For video/audio sessions, use the call page with session parameters
      navigate(`/call?sessionId=${sessionId}&roomId=${roomId}&userToken=${userToken}&callType=${sessionType}&isAnonymous=true`);
    } else {
      // Fallback to anonymous rant page for unknown session types
      navigate(`/anonymous-rant?sessionId=${sessionId}&userToken=${userToken}`);
    }
  }, [sessionData, navigate]);

  const handleSessionTypeSelect = useCallback(async (sessionType) => {
    if (!authentication) {
      toast({
        title: 'Please Login',
        description: 'Please login first to start a session',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      navigate('/sign-in');
      return;
    }

    setSelectedSessionType(sessionType);
    setIsConnecting(true);
    setConnectionStatus('connecting');
    setErrorMessage('');

    try {
      const token = localStorage.getItem('USER_TOKEN');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/1.0/rant/anonymous-session`,
        { sessionType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setSessionData(response.data.data);
        setConnectionStatus('waiting');
        toast({
          title: 'Connecting...',
          description: 'Connecting you to a mentor...',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
        
        // Set a timeout to handle cases where no mentor responds
        const waitingTimeout = setTimeout(() => {
          if (connectionStatus === 'waiting') {
            setIsConnecting(false);
            setConnectionStatus('no_mentors');
            setErrorMessage('No mentors are currently available. Please try again later.');
            toast({
              title: 'Connection Timeout',
              description: 'No mentors are currently available. Please try again later.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
        }, 60000); // 60 seconds timeout
        
        return () => clearTimeout(waitingTimeout);
      } else {
        throw new Error(response.data.message || 'Failed to create session');
      }
    } catch (error) {
      setIsConnecting(false);
      setConnectionStatus('error');
      const message = error.response?.data?.message || error.message || 'Failed to connect. Please try again.';
      setErrorMessage(message);
      toast({
        title: 'Connection Failed',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [authentication, toast, navigate, connectionStatus]);

  const handleRetry = useCallback(() => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      handleSessionTypeSelect(selectedSessionType);
    }
  }, [retryCount, maxRetries, handleSessionTypeSelect, selectedSessionType]);

  const handleCancelConnection = useCallback(() => {
    setIsConnecting(false);
    setConnectionStatus('');
    setErrorMessage('');
    setSelectedSessionType('');
    setRetryCount(0);
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  }, [socket]);

  // Socket connection and event listeners
  useEffect(() => {
    if (selectedSessionType) {
      const newSocket = io(process.env.REACT_APP_API_URL || 'http://localhost:8080');
      setSocket(newSocket);

      // Listen for session acceptance
      newSocket.on('anonymousSessionAccepted', (data) => {
        setIsConnecting(false);
        setConnectionStatus('connected');
        toast({
          title: 'Success!',
          description: 'Mentor has joined the session!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        redirectToSession(data.sessionId, selectedSessionType);
      });

      // Listen for session rejection
      newSocket.on('anonymousSessionRejected', (data) => {
        setIsConnecting(false);
        setConnectionStatus('rejected');
        setErrorMessage(data.message || 'Session was rejected by the mentor.');
        toast({
          title: 'Session Rejected',
          description: data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });

      // Listen for no mentors available
      newSocket.on('noMentorsAvailable', (data) => {
        setIsConnecting(false);
        setConnectionStatus('no_mentors');
        setErrorMessage('No mentors are currently available. Please try again later.');
        toast({
          title: 'No Mentors Available',
          description: 'No mentors are currently available. Please try again later.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [selectedSessionType, toast, redirectToSession, handleSessionTypeSelect]);

  // All function definitions are now properly defined above with useCallback
  return (
    <Box className="main-container">
      <Box
        sx={{
          filter: "brightness(1.2)", // Adjust the brightness here
        }}
        className="section-container"
        bgImage={heroImg}
        bgPosition={"center"}
        bgRepeat={"no-repeat"}
        bgSize={"cover"}
      >
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          h={"auto"}
          py={{ base: 16, md: 16, lg: 32 }}
        >
          <Box textAlign={"center"}>
            <Text className="heading" color={"var(--peach)"}>
              RANT (VENT IT OUT)
            </Text>
            <Text
              color={"white"}
              fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}
              fontWeight={600}
              mt={2}
            >
              Release, Renew, Reclaim: Find Relief with <br /> Our Rant Support
            </Text>
          </Box>
        </Flex>
      </Box>

      <Box mt={16} py={14} className="section-container" bg="pink.50">
      <VStack spacing={6} textAlign="center">
        <Heading
          as="h2"
          fontSize={{ base: "2xl", md: "3xl" }}
          color={"var(--peach)"}
          fontWeight="bold"
        >
          Let Go of Stress and Tension in a Safe Environment, without the fear of being judged.
        </Heading>

        <Text fontSize="lg" color="gray.700">
          Our <strong>Rant (Vent it Out) Services</strong>, where your feelings find a safe harbour amidst life's storms. We understand that sometimes, the weight of emotions can be too heavy to carry alone.
        </Text>

        <Text fontSize="lg" color="gray.700">
          That's why we're here, offering you a compassionate space to unload, express, and release whatever's weighing on your heart and mind.
        </Text>

        <Text fontSize="lg" color="gray.700">
          We believe that sharing your burdens is the first step towards healing, and we're here to listen, without judgement or interruption. So take a deep breath, let it all out, and know that you're not alone on this journey.
        </Text>
      </VStack>
    </Box>

      {/* second section */}

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
                We understand your pains:
              </Text>
              <Text
                className="paragraph"
                fontSize={'20px'}
                mt={4}
                w={{ base: "100%", md: "90%" }}
              >
                We understand the weight of stress, loneliness, and bottled-up
                emotions. You're not alone—let us support and guide you through
                it.
              </Text>
              <UnorderedList mt={6} spacing={4}>
                {struggleListing.map((list, index) => (
                  <ListItem fontSize={'20px'} key={index}>{list}</ListItem>
                ))}
              </UnorderedList>
            </Box>
            <Box>
              <Image
                src={sec2Img}
                alt="sec2Img"
                w={"100%"}
                h={"100%"}
                maxH={"800px"}
              />
            </Box>
          </Flex>
        </Box>
        <Box
      
          py={8}
        >
          <Text my={5} fontSize={'22px'} className="section-container paragraph" textAlign={"left"}>
          Bottling up emotions and frustrations can lead to increased stress and tension. You feel overwhelmed by life's challenges without an outlet for release.
          </Text>
          <Text fontSize={'22px'} className="section-container paragraph" textAlign={"left"}>
          If you are struggling to find someone who will listen without judgement or interruption
          </Text>
        </Box>
        {/* Session Type Selection */}
        <Box className="section-container" py={8}>
          <VStack spacing={8}>
            <Heading size="lg" textAlign="center" color="var(--peach)">
              Choose Your Session Type
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="100%">
              {sessionTypes.map((session) => {
                const IconComponent = session.icon;
                return (
                  <Box
                    key={session.type}
                    p={6}
                    border="2px"
                    borderColor={selectedSessionType === session.type ? "var(--peach)" : "gray.200"}
                    borderRadius="lg"
                    textAlign="center"
                    cursor="pointer"
                    transition="all 0.3s"
                    bg={selectedSessionType === session.type ? "pink.50" : "white"}
                    _hover={{ borderColor: "var(--peach)", transform: "translateY(-2px)" }}
                    onClick={() => setSelectedSessionType(session.type)}
                  >
                    <Icon as={IconComponent} boxSize={8} color="var(--peach)" mb={4} />
                    <Heading size="md" mb={2}>{session.title}</Heading>
                    <Text color="gray.600" fontSize="sm">{session.description}</Text>
                  </Box>
                );
              })}
            </SimpleGrid>
            
            {/* Connect Button */}
            {selectedSessionType && (
              <Button
                size="lg"
                bg="var(--peach)"
                color="white"
                px={12}
                py={6}
                rounded="full"
                fontWeight={600}
                fontSize="18px"
                isLoading={isConnecting}
                loadingText={connectionStatus === 'connecting' ? 'Connecting...' : 'Waiting for mentor...'}
                onClick={() => handleSessionTypeSelect(selectedSessionType)}
                _hover={{ bg: "#c56570" }}
                disabled={isConnecting}
              >
                {isConnecting ? 'Connecting...' : `Start ${selectedSessionType.charAt(0).toUpperCase() + selectedSessionType.slice(1)} Session`}
              </Button>
            )}
            
            {/* Connection Status */}
            {connectionStatus !== 'idle' && connectionStatus !== 'connected' && (
              <Box
                p={4}
                bg={connectionStatus === 'error' || connectionStatus === 'rejected' || connectionStatus === 'no_mentors' ? 'red.50' : 'blue.50'}
                border="1px"
                borderColor={connectionStatus === 'error' || connectionStatus === 'rejected' || connectionStatus === 'no_mentors' ? 'red.200' : 'blue.200'}
                borderRadius="md"
                textAlign="center"
                w="100%"
                maxW="md"
              >
                {connectionStatus === 'waiting' && (
                  <Text color="blue.600">Waiting for an available mentor... This may take up to 60 seconds.</Text>
                )}
                {(connectionStatus === 'error' || connectionStatus === 'rejected' || connectionStatus === 'no_mentors') && (
                  <VStack spacing={3}>
                    <Text color="red.600">{errorMessage}</Text>
                    <Flex gap={3}>
                      {retryCount < maxRetries && (
                        <Button
                          size="sm"
                          bg="blue.500"
                          color="white"
                          onClick={handleRetry}
                          _hover={{ bg: "blue.600" }}
                        >
                          Retry ({retryCount}/{maxRetries})
                        </Button>
                      )}
                      <Button
                        size="sm"
                        bg="gray.500"
                        color="white"
                        onClick={handleCancelConnection}
                        _hover={{ bg: "gray.600" }}
                      >
                        {connectionStatus === 'waiting' ? 'Cancel Connection' : 'Close'}
                      </Button>
                    </Flex>
                  </VStack>
                )}
              </Box>
            )}
          </VStack>
        </Box>
      </Box>

      <Box mb={10}
          
          py={2}
        >
          <Text my={6} fontSize={'22px'} className="section-container paragraph" textAlign={"left"}>
          Whether you're dealing with work-related stress, relationship issues, or simply need to vent about life's frustrations, our trained listeners are here to offer support and understanding. You can pour out your heart without fear of judgement or interruption, allowing you to release negative emotions and find relief
          </Text>
        </Box>

      <Box>
        <HolisticWelness
          Mainheading="Rant (Vent It Out): Your Safe Space to Release & Heal"
          Mainpara="At AlterBuddy, we offer more than just guidance—we create a safe, nurturing space where you can heal, grow, and rediscover your inner strength. Through a blend of evidence-based techniques and spiritual healing, we help you release past wounds, restore balance, and embrace a renewed sense of peace and clarity."
          data={data}
        />
      </Box>

      <Box>
        <WhatYouGain
          gainList={dataa}
          gainImg={mental3}
          heading="WHAT DO YOU GET?"
        />
      </Box>

      {/* <Box>
        <Coaches categoryId={'67f3a4b771662664c3028427'}/>
      </Box> */}

<Flex justifyContent={"center"} alignItems={"center"}>
         <Text fontSize="lg" color="gray.700" textAlign="center" fontStyle="italic">
           Ready to start your anonymous session? Choose your preferred session type above and connect instantly with a mentor.
         </Text>
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
                                  <Text fontSize={'22px'} color="gray.700" fontStyle="italic">
                                    “Sometimes, the most powerful thing you can do is simply let it out. By giving voice to your struggles and frustrations, you create space for healing and transformation to occur.”
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

      <Box pt={8} pb={14}>
        <Box className="section-container">
          <Flex marginX="auto" flexDirection="column" width="100%">
            <Flex justifyContent="center" pb={4}>
              <Heading mt={6} size="lg">
                Frequently Asked Questions
              </Heading>
            </Flex>
            <FaqRant />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
export default RantVantOut;
