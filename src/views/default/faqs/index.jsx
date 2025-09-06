// React
import { useState } from 'react';

// Chakra UI Components
import {
  Box,
  Flex,
  Text,
  Button,
  Card,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react';

// Custom Components
import Footer from '../../../component/footer';
import Navbar from '../../../component/navbar';

// React Router
import { useNavigate } from 'react-router-dom';

const FaqPage = () => {
  const navigate = useNavigate();
  const faqs = [
    { question: "What is AlterBuddy and what value does it provide?", answer: "AlterBuddy isn't just a platform; it's your companion on the journey to mental well-being and personal growth. It's a haven where you can explore healing, manifestation, and self-discovery. By providing tailored resources and expert guidance, AlterBuddy empowers you to manifest positive changes and cultivate a life of balance and fulfillment." },
    { question: "How can AlterBuddy help me?", answer: "AlterBuddy empowers you on your mental health and personal development journey through personalized healing resources, 1:1 sessions, guided meditation sessions, expert advice, and manifestation tools, fostering a positive and transformative mindset." },
    { question: "Who are buddies, healers, and genies?", answer: "Buddies are more than just psychologists; they're compassionate companions on your journey to healing and growth, offering support and understanding every step of the way. Healers bring their expertise and empathy to help you navigate challenges and find inner peace. Genies are like mentors, offering wisdom and guidance to help you unlock your full potential and manifest your dreams." },
    { question: "What is the 'RANT' feature at AlterBuddy?", answer: 'The "RANT" feature at AlterBuddy allows you to book a call and express your feelings openly for 15 minutes, providing a therapeutic space to purge and release emotions in a supportive and confidential environment.' },
    { question: "How can I talk to a therapist on AlterBuddy?", answer: 'You can engage with buddies, healers, and genies on AlterBuddy through both chat and audio calls, offering a seamless and flexible communication experience for your mental health and well-being needs.' },
    { question: "How do I sign up/login on AlterBuddy?", answer: 'To create an account on AlterBuddy, simply visit our website, click on the "Login" button, and follow the easy step-by-step registration process to unlock access to our transformative, mental health, manifestation and healing services.' },
    { question: "Is my privacy and anonymity guaranteed on AlterBuddy?", answer: 'Yes, at AlterBuddy, we prioritize your privacy and anonymity. Your personal information is treated with the utmost confidentiality and our platform is designed to ensure a secure and discreet environment for your mental health and well-being journey. You also have the option to use ALIAS or pseudonyms to provide you with a safe space where you can express yourself without revealing your identity to your peers.' },
    { question: "Can I share my personal stories and experiences on AlterBuddy?", answer: 'Certainly! On AlterBuddy, feel free to share your personal stories and experiences in a supportive and non-judgmental environment, fostering connection and understanding of your mental health and manifesting journey, anonymously.' },
    { question: "How can I connect with others on AlterBuddy?", answer: 'To connect with others on AlterBuddy, explore our community forums, engage in group activities, or use our comment feature to foster meaningful connections and supportive relationships with like-minded individuals on similar journeys.' },
    { question: "Is AlterBuddy available in the app too?", answer: 'Yes, AlterBuddy is available as a mobile app for both iOS and Android devices. You can download the app for iOS here and for Android here for better user interface and seamless services.' },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(faqs.length / itemsPerPage);
  return (
    <>
      <Box className='main-container'>
        <Box paddingLeft={'40px'} background={'linear-gradient(95.65deg, rgba(255, 255, 255, 0.42) -13.19%, rgba(254, 118, 168, 0.7) 114.3%)'} >
          <Flex direction={'column'} justifyContent={'center'} h={{ base: '150px', md: '200px', lg: '250px' }}>
            <Text fontWeight={'medium'} color='var(--peach)'>The FAQs</Text>
            <Text fontSize={{ base: '24px', md: '40px', lg: '50px' }} fontWeight={'medium'}>Help Center </Text>
            <Text fontSize={'16px'} mt={2} color={'#788094'} ><Text>Everything you need to know about alter-buddy plateform</Text></Text>
          </Flex>
        </Box>

        <Box paddingX={'30px'} marginY={'30px'}>
          <Flex marginX={'auto'} flexDirection={{ base: 'column', lg: 'row' }} justifyContent={'space-between'} width={'100%'} >
            <Box width={{ base: '98%', md: '98%', lg: '90%' }} marginX={'auto'} >
              <Text color='var(--peach)'  >Support</Text>
              <Text fontSize={'35px'} mt={1} color={'black'}>Frequently Asked Questions</Text>
              <Text marginTop={'3px'} color='#64748B'>Everything you need to know about the product and billing. Can’t find the answer you’re looking for ? Please chat with our friendly team.</Text>
              <Button onClick={() => navigate('/contact-us')} variant="solid" marginY={'25px'} borderRadius={'20px'} bg="#D86570" color="white" _hover={{}}>
                Contact Our Team
              </Button>
            </Box>
            <Box>
              {/* Paginated Accordion */}
              <Accordion
                w={{ base: "99%", md: "99%", lg: "80%" }
                }
                m="auto"
                allowToggle
                defaultIndex={[0]}
              >
                {
                  faqs
                    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                    .map((item, index) => (
                      <AccordionItem key={index} border="none">
                        {({ isExpanded }) => (
                          <Card mt={3} p={{ base: 0, md: 6 }} rounded={12} bg="#F8FAFC">
                            <h2>
                              <AccordionButton
                                _hover={{ backgroundColor: "#F8FAFC" }}
                                _expanded={{ color: "var(--peach)", bg: "#F8FAFC" }}
                                bg="#F8FAFC"
                                rounded={10}
                              >
                                <Box flex="1" textAlign="left" fontSize={{ base: "16px", md: "20px" }} fontWeight={500}>
                                  {item.question}
                                </Box>
                                <AccordionIcon color="var(--peach)" />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4} color="black" fontSize={{ base: "14px", md: "16px" }} fontWeight={400}>
                              {item.answer}
                            </AccordionPanel>
                          </Card>
                        )}
                      </AccordionItem>
                    ))
                }
              </Accordion >

              {/* Pagination Buttons */}
              <Flex justify="center" mt={6} gap={2} flexWrap="wrap" >
                {
                  Array.from({ length: totalPages }).map((_, pageIndex) => (
                    <Button
                      key={pageIndex}
                      onClick={() => setCurrentPage(pageIndex)}
                      bg={currentPage === pageIndex ? 'var(--peach)' : 'white'}
                      color={currentPage === pageIndex ? 'white' : 'black'}
                      border="1px solid"
                      borderColor={currentPage === pageIndex ? 'var(--peach)' : 'gray.300'}
                      _hover={{
                        bg: currentPage === pageIndex ? 'var(--peach)' : 'gray.100',
                      }}
                      size="sm"
                      px={4}
                      py={2}
                      borderRadius="md"
                    >
                      {pageIndex + 1}
                    </Button>
                  ))
                }
              </Flex >
            </Box>
          </Flex>
        </Box>
       
      </Box>
    </>
  )
}

export default FaqPage;
