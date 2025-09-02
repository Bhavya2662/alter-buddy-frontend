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


const FaqPets = () => {
    const faqs = [
        { question: "How does energy healing work for pets?", answer: "We tap into your pet’s energetic field using their name and photo—no need for in-person sessions. It’s gentle, remote, and deeply effective." },
        { question: "Is it safe for all types of animals?", answer: "Absolutely! Dogs, cats, birds, rabbits—energy healing is non-invasive and safe for all breeds and species." },
        { question: "What kind of issues can this help with?", 
            answer: "From anxiety, restlessness, and low energy to physical pain and post-surgery recovery—it supports healing on every level." },
        { question: "How will I know if it’s working?", answer: 'You may notice your pet becoming calmer, more relaxed, sleeping better, or even showing signs of faster physical healing.' },
        { question: "Do I need to be present during the session?", answer: 'Not at all. Just send us your pet’s name and a clear photo—we’ll handle the rest from' },
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

export default FaqPets;
