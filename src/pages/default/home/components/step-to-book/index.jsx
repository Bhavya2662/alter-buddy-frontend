// React Hooks
import { useEffect, useState, useRef } from "react";

// Chakra UI Components
import {
  Box,
  Text,
  VStack,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";


const steps = [
  { id: 1, title: "Choose our expert’s" },
  { id: 2, title: "Check slots availability" },
  { id: 3, title: "Select date & time slot" },
  { id: 4, title: "Book an Appointment" },
];

const Index = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top, bottom } = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (top < windowHeight && bottom > 0) {
          setInView(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev < steps.length ? prev + 1 : prev));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [inView]);

  return (
    <Box ref={sectionRef} w="full" py={6}>
      <VStack spacing={4} textAlign="left" alignItems={'start'}>
        <Text className="heading" fontWeight="bold">
          4 Easy to book an online appointment
        </Text>
        <Text fontSize="lg" color="gray.600">
          Walk just four steps for your good health
        </Text>
      </VStack>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={4} py={7}>
        {steps.map((step, index) => (
          <GridItem key={step.id} py={3}>
            <Box
              position="relative"
              py={{ base: 4, md: 1 }}
              px={4}
              borderRadius="20px 300px 300px 20px"
              bg={index < activeStep ? "var(--lightpeach)" : "#F1F5F9"}
              transition="background 2s ease"
            >
              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontSize="md" fontWeight="semibold" color={index < activeStep ? "var(--peach)" : "#475569"}>
                    Step {step.id}
                  </Text>
                  <Text fontSize="xl" fontWeight="500" mt={0} >
                    {step.title}
                  </Text>
                </Box>
                <Text fontSize={{ base: "5xl", md: "5xl", lg: "5rem" }} fontWeight="extrabold" color={index < activeStep ? "var(--peach)" : "gray.300"}>
                  {step.id}
                </Text>
              </Flex>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Index;
