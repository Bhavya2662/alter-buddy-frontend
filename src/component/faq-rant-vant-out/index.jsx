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


const FaqRant = () => {
    const faqs = [
        { question: "What exactly happens during a Rant session?", answer: "You get upto 15 uninterrupted minutes to speak your heart out—vent, cry, scream, or just talk. Our trained listeners won’t offer advice unless you ask; they’re simply here to listen without judgement." },
        { question: "Will someone actually understand me, or just nod along?", answer: "Our listeners are trained in active listening and emotional validation. You won’t be dismissed or given cliché responses—you’ll be genuinely heard." },
        { question: "Is it really okay to talk about anything? Even things I feel ashamed of?", 
            answer: "Yes. This is a completely judgment-free space. You can talk about anger, sadness, regrets, guilt—whatever you need to let out. Nothing is too “small” or too “big” here." },
        { question: "What if I cry or break down during the call?", answer: 'That’s completely okay. Crying is healing. Our listeners hold emotional space for you with compassion and patience—you don’t have to hide your real feelings.' },
        { question: "Will my identity and what I say remain confidential?", answer: 'Absolutely. Your privacy is sacred. You can even use an alias if that feels safer for you. Everything you share stays within the session—no judgement, no trace.' },
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
                                                <Box flex="1" textAlign="left" fontSize={{ base: "16px", md: "22px" }} fontWeight={500}>
                                                    {item.question}
                                                </Box>
                                                <AccordionIcon color="var(--peach)" />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4} color="black" fontSize={{ base: "14px", md: "18px" }} fontWeight={400}>
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

export default FaqRant;
