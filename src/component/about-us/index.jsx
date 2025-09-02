// Chakra UI Components
import {
    Box,
    Button,
    Flex,
    Grid,
    Image,
    Text
} from '@chakra-ui/react';

// Assets
import aboutImg from "../../assets/new-images/images/about-main.png";
import tick from "../../assets/final-image/icons/right-tick.png";
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
    const navigate = useNavigate();
    const aboutData = ["Better relationships", "Better health", "Better career", "Better inflow of money", "Better Version of yourself"]

    return (
        <Box className='section-container' pt={16} pb={{ base: 6, md: 0 }}>
            <Flex alignItems={'center'} justifyContent={'space-between'} gap={10}
                direction={{ base: 'column', md: 'row' }}
            >

                <Box width={{ base: '100%', md: '55%' }} mb={2}>
                    <Button bg={'var(--lightpeach)'} color={'var(--peach)'} w={'fit-content'} px={8} py={6} rounded={'full'}
                        fontWeight={600} fontSize={{ base: '16px', md: '16px' }} colorScheme='' textTransform={'uppercase'}>About US </Button>

                    
                    <Text mt={8} color='var(--peach)' className='subHeading'> "Discover the Power Within, Transform Your Life."</Text>
                    
                    <Text mt={{ base: 6, md: 6, lg: 6 }} width={{ base: '100%', md: '85%' }} className='paragraph' color={'var(--grey)'}>
                        At times we are lost and filled with negativity all around us, drowning in the challenges and uncertainties of life. Our relationships, careers, health, and money all are at stake. We feel nothing is working for us and we are living the most miserable life one can ever have.
                    </Text>
                    <Text mt={{ base: 4, md: 4, lg: 4 }} width={{ base: '100%', md: '85%' }} className='paragraph' color={'var(--grey)'}>
                        We, the entire team at alterbuddy have seen hundreds and thousands of people go through the same feeling, and have beautifully healed them to come out of these traumas and helped them live the best versions of themselves.
                    </Text>
                    
                    
                    <Text mt={{ base: 4, md: 4, lg: 4 }} width={{ base: '100%', md: '85%' }} className='paragraph' color={'var(--grey)'}>
                        The entire goal of all of us coming under one roof (Alterbuddy) as your buddies, healers, and genies, was to serve you as a one-stop solution for personal growth, healing, and manifestation.
                    </Text>
                    <Text mt={{ base: 4, md: 4, lg: 4 }} width={{ base: '100%', md: '85%' }} className='paragraph' color={'var(--grey)'}>
                    Where we guide you on your journey to mental wellness and transformation for:
                    </Text>


                    <Grid templateColumns={'repeat(2, 1fr)'} gap={{ base: 2, md: 4 }} mt={6}>
                        {aboutData.map((item, index) => (
                            <Flex key={index} gap={3} alignItems={'center'}>
                                <Image src={tick} alt='image' w={{ base: '20px', md: '25px' }} h={{ base: '20px', md: '25px' }} />
                                <Text fontSize={{ base: '14px', md: '16px' }}>{item}</Text>
                            </Flex>
                        ))}
                    </Grid>
                    {/* <Button mt={{ base: 6, md: 6, lg: 12 }} bg={'var(--peach)'} color={'white'} w={'fit-content'} py={{ base: 6, md: 6 }} px={10} rounded={'full'} fontWeight={600} fontSize={'16px'} colorScheme='' onClick={() => navigate('/about-us')}>Learn More</Button> */}
                    <Text mt={8} color={'var(--grey)'} fontWeight={'600'} fontSize={'20px'}> Welcome aboard on the journey of self-discovery and transformation.</Text>

                </Box>

                <Box width={{ base: '100%', md: '45%' }}>
                    <Image src={aboutImg} alt='heroImage' width={'100%'} h={'100%'} />
                </Box>
            </Flex>
        </Box>
    )
}
export default AboutUs;