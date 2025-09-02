// React
import { useState } from "react";

// Chakra UI Components
import {
  Box,
  Flex,
  Button,
  Card,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Link,
} from "@chakra-ui/react";


const Index = () => {
    const faqs = [
        { question: "What is AlterBuddy and what value does it provide?", answer: "AlterBuddy isn't just a platform; it's your companion on the journey to mental well-being and personal growth. It's a haven where you can explore healing, manifestation, self-discovery, dating support, and energy alignment.. By providing tailored resources and expert guidance, AlterBuddy empowers you to manifest positive changes and cultivate a life of balance and fulfillment." },
        { question: "How can AlterBuddy help me?", answer: "AlterBuddy empowers you on your mental health and personal development journey through personalized healing resources, 1:1 sessions, expert dating and relationship coaching, guided meditation, energy work sessions, and manifestation tools—fostering a positive and transformative mindset from within." },
        { question: "Who are Buddies, Healers, Genies, Dating buddies and Energy Experts?", 
            answer: <><Text><Box as="span" fontWeight={600}>Buddies:</Box> Compassionate companions who will listen to your rants, empathise with you and help you heal.</Text>
            <Text><Box as="span" fontWeight={600}>Healers:</Box> Experts guiding you to inner peace and healing. Genies: Mentors helping you manifest your dreams.</Text> 
            <Text><Box as="span" fontWeight={600}>Dating Buddy:</Box> Experts helping you build strong, healthy relationships.</Text>
            <Text><Box as="span" fontWeight={600}>Energy Experts:</Box> Helping balance your energy for emotional and spiritual well-being.</Text></> },
        { question: "What is the 'RANT' feature at AlterBuddy?", answer: 'The "RANT" feature at AlterBuddy allows you to book a call and express your feelings openly for 15 minutes, providing a therapeutic space to purge and release emotions in a supportive and confidential environment.' },
        { question: "How can I talk to a therapist on AlterBuddy?", answer: 'You can engage with buddies, healers, coaches, energy work experts and genies on AlterBuddy through chat, audio and video calls, offering a seamless and flexible communication experience for your mental health and well-being needs.' },
        { question: "How do I sign up/login on AlterBuddy?", answer: <>To create an account on AlterBuddy, simply visit our website, click on the "Get Started" button, and follow the easy step-by-step registration process to unlock access to our transformative, mental health, manifestation and healing services. <Link textColor={'blue'} href="/sign-in">Sign up</Link> </> },
        { question: "Is my privacy and anonymity guaranteed on AlterBuddy?", answer: 'Yes, at AlterBuddy, we prioritize your privacy and anonymity. Your personal information is treated with the utmost confidentiality and our platform is designed to ensure a secure and discreet environment for your mental health and well-being journey. You also have the option to use ALIAS or pseudonyms to provide you with a safe space where you can express yourself without revealing your identity to your peers.' },
        // { question: "Can I share my personal stories and experiences on AlterBuddy?", answer: 'Certainly! On AlterBuddy, feel free to share your personal stories and experiences in a supportive and non-judgmental environment, fostering connection and understanding- be it about your healing journey, dating challenges, energetic shifts, or mental health, anonymously.' },
        { question: "How can I connect with others on AlterBuddy?", answer: 'To connect with others on AlterBuddy, explore our community forums, engage in group activities, or use our comment feature to foster meaningful connections and supportive relationships with like-minded individuals on similar journeys.' },
        // { question: "Is AlterBuddy available in the app too?", answer: 'Yes, AlterBuddy is available as a mobile app for both iOS and Android devices. You can download the app for iOS here and for Android here for better user interface and seamless services.' },
        { question: "Can you message other users privately on AlterBuddy?", answer: 'No. You can not message other users privately. It is an anonymous app for peer-to-peer communication.' },
        { question: "How can I find relevant discussions and communities on AlterBuddy?", answer: 'On AlterBuddy, you can explore different topics using our search function. You can find interesting conversations and connect with like-minded individuals to engage in meaningful conversations.' },
        // { question: "Is there a limit to the number of posts I can make on AlterBuddy?", answer: 'There is no limit to the number of posts you can make on AlterBuddy. We encourage you to share and engage with others as much as you feel comfortable.' },
        // { question: "How can I engage with others' posts and provide support?", answer: "To engage with others' posts and provide support on AlterBuddy, you can leave comments, offer words of encouragement, share your own experiences, and provide empathetic responses. By actively participating in discussions, you can create a supportive environment where individuals can feel heard, understood, and supported. Your engagement can make a meaningful difference in someone's journey and foster connections within the Alterbuddy community." },
        { question: "Are there any age restrictions for using AlterBuddy?", answer: 'AlterBuddy is designed for adults aged 18 and above. We believe in providing a safe and mature environment for individuals to explore their mental health and personal growth journey.' },
        { question: "Is there a moderation team that ensures the safety of users on AlterBuddy?", answer: 'Yes, AlterBuddy has a dedicated moderation team that monitors discussions, enforces community guidelines, and ensures the safety and well-being of all users. If you encounter any issues, you can report them to our moderation team for prompt action.' },
        // { question: "Does AlterBuddy offer Self-help books?	", answer: 'AlterBuddy offers a collection of self-help books to complement your journey, providing valuable resources for personal growth, healing, and empowerment.' },
        { question: "Can AlterBuddy help with dating and relationships?", answer: "Yes. Whether you're navigating heartbreak, feeling disconnected, or unsure how to approach someone, our 1:1 relationship coaching and courses helps you build genuine confidence, improve communication, and attract meaningful, aligned connections." },
        { question: "What happens in an Energy Work session?	", answer: 'In an Energy Work session, we begin with a scan to understand what your energy has been carrying. We gently remove emotional or energetic blocks, create a protective vortex around you, and help you raise your vibration—so you walk away feeling lighter, empowered, and more connected to yourself.' },
        { question: "What makes AlterBuddy different from other mental health platforms?", answer: "AlterBuddy is a heartfelt movement. Unlike traditional platforms, we blend therapy, energy work, dating and relationship guidance, and spiritual healing into one safe, judgment-free space. Whether you're looking to vent, heal, connect, or grow, AlterBuddy meets you where you are, with compassion, anonymity, and the support of a like-minded community that genuinely cares." },
       	
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(faqs.length / itemsPerPage);
    return (
        <>
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
        </>
    );
};

export default Index;
