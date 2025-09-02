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


const FaqEnergyWork = () => {
    const faqs = [
        { question: "I’ve never done energy healing before—what can I expect in a session?", answer: "You’ll begin with an intuitive energy scan, followed by a gentle release of blockages, a protection ritual, and a final alignment to raise your vibration. No prior experience needed—just an open heart." },
        { question: "Can energy healing help with emotional burnout or feeling stuck?", answer: "Yes. Many clients come to us when they feel overwhelmed, depleted, or “not themselves.” Energy work clears what weighs you down, helping you reconnect with peace and clarity." },
        { question: "How is this different from therapy or meditation?", 
            answer: "Unlike talk therapy, energy work taps into your energetic field and subconscious. It doesn’t rely on reliving trauma but gently clears stored emotional residue—often with deep, lasting effects." },
        { question: "Is this spiritual? Do I need to believe in something specific?", answer: 'Energy healing is a spiritual practice, but it’s not religious or belief-based. You don’t have to believe in chakras or energy fields for it to work—your intention to heal is enough.' },
        { question: "How often should I get energy work done?", answer: 'It depends on your energetic needs. Some feel a powerful shift immediately, while others benefit from regular tune-ups. We’ll help you understand what your energy is asking for.' },
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

export default FaqEnergyWork;
