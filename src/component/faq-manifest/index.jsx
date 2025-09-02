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
} from "@chakra-ui/react";


const FaqManifest = () => {
    const faqs = [
        { question: "How do I start manifesting the life I want?", answer: "Manifestation begins within you! It starts by understanding your desires and aligning your inner thoughts and emotions with them. Through one-on-one guidance, we help you tune into your true desires and release any blockages, so you can attract the life you’re meant to live." },
        { question: "Can manifestation really help me achieve success and abundance?", answer: "Absolutely. Manifestation works by shifting your inner vibration, which directly influences your outer reality. When you become aligned with your goals, you naturally begin attracting opportunities, success, and abundance in all areas of life—from money to relationships to personal growth." },
        { question: "Do I need to be spiritual to manifest my desires?", 
            answer: "No. While manifestation works well with spiritual practices, it’s not limited to them. It’s about aligning your mindset and actions with your intentions. Whether you’re spiritual or not, our tools and techniques can help you tap into the power of manifestation and bring your dreams to life." },
        { question: "What makes AlterBuddy’s manifestation services different from others?", answer: 'Unlike traditional manifestation methods, we offer personalized, one-on-one support that includes channeled guidance, intuitive healing, and advanced energetic techniques. We focus on transformation from within, helping you uncover your true desires and create the energetic shift needed to manifest them.' },
        { question: "How long will it take to start seeing results?", answer: 'Manifestation is a journey, and results can vary depending on your goals and the effort you put into aligning your inner self with your desires. However, many clients begin experiencing shifts in their mindset, energy, and opportunities within days and sometimes weeks of working with us. The key is consistency and alignment.' },
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

export default FaqManifest;
