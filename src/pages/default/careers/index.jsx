import React, { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Textarea,
  Select,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Container,
  useToast,
  useBreakpointValue,
} from '@chakra-ui/react';

const CareersPage = () => {
  const toast = useToast();
  const topMargin = useBreakpointValue({ base: 20, md: 10, lg: 20 });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    category: '',
    description: '',
  });

  // Count non-whitespace characters only
  const getCharacterCount = (text) => {
    return text.replace(/\s+/g, '').length;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'description') {
      const charCount = value.replace(/\s+/g, '').length;
      if (charCount > 100) return; // prevent typing beyond 100 characters
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, phone, category, description } = formData;
    const charCount = getCharacterCount(description);

    if (!firstName || !lastName || !phone || !category) {
      toast({
        title: 'Please fill all required fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (charCount > 100) {
      toast({
        title: 'Description is too long.',
        description: 'Please limit your description to 100 characters.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: 'Application submitted!',
      description: 'Thank you! We will contact you soon.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      category: '',
      description: '',
    });
  };

  const charCount = getCharacterCount(formData.description);

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, #fcefee, white)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pt={topMargin}
      pb={10}
      px={4}
    >
      <Container
        maxW="lg"
        bg="white"
        boxShadow="2xl"
        rounded="xl"
        p={{ base: 6, md: 8 }}
        width="100%"
      >
        <Heading
          as="h1"
          size="xl"
          mb={6}
          textAlign="center"
          color="#D86570"
        >
          Career Page
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={5}>
            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                placeholder="Select category"
                value={formData.category}
                onChange={handleChange}
                maxH="150px"
                overflowY="auto"
              >
                <option value="mental">Mental Health</option>
                <option value="manifestation">Manifestation</option>
                <option value="healing">Healing</option>
                <option value="rant">Rant</option>
                <option value="dating">Dating And Relationship</option>
                <option value="energy">Energy Work</option>
                <option value="petHealing">Energy Healing For Pets</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Description (Max 100 characters)</FormLabel>
              <Textarea
                name="description"
                placeholder="Tell us about yourself..."
                value={formData.description}
                onChange={handleChange}
                borderColor={charCount > 100 ? 'red.500' : 'gray.200'}
                focusBorderColor={charCount > 100 ? 'red.500' : 'blue.500'}
              />
              <Box
                textAlign="right"
                mt={1}
                fontSize="sm"
                color={charCount > 100 ? 'red.500' : 'gray.500'}
              >
                {charCount} / 100 characters
              </Box>
            </FormControl>

            <Button
              type="submit"
              bg="#D86570"
              color="white"
              _hover={{ bg: '#c65061' }}
              width="full"
              size="lg"
              fontWeight="bold"
            >
              Submit Application
            </Button>
          </VStack>
        </form>
      </Container>
    </Box>
  );
};

export default CareersPage;
