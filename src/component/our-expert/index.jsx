// Chakra UI Components
import { Box, Button, Card, Image, Text, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

// React & Hooks
import { useRef } from 'react';

// Third-Party Libraries
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Images
import serviceImg1 from "../../assets/final-image/images/mudit.png";
import serviceImg2 from "../../assets/final-image/images/priyanka.png";
import serviceImg3 from "../../assets/final-image/images/ramandeep.png";


const Index = () => {
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const services = [
        {
            img: serviceImg1,
            title: "Mudit Gambhir",
            subtitle: "Founder",
            desc: "As the Founder of AlterBuddy, I am responsible for guiding the vision and direction of the platform. My focus is on building and nurturing our communities—whether it's manifestation, healing, or mental health—ensuring that each person who visits leaves feeling happier and more connected.",
        },
        // {
        //     img: serviceImg3,
        //     title: "Ramandeep Kaur",
        //     subtitle: "Managing Director",
        //     desc: "As a Healer at AlterBuddy, I guide others on their spiritual paths, helping them heal from past traumas and uncover deeper truths. My work involves leading meditation sessions and providing personalized healing practices that align the body, mind, and soul.",
        // },
        // {
        //     img: serviceImg2,
        //     title: "Priyanka Jaiswal",
        //     subtitle: "Content Writer",
        //     desc: "As the Content Writer at AlterBuddy, I craft content that connects with our audience on a deep level. From blog posts to web copy, my goal is to ensure that every word reflects our brand’s mission of spreading happiness and support.",
        // },

    ];

    return (
        <Box width={'100%'}>
            {/* <center>
                <Button bg={'var(--peach)'} color={'white'} w={'fit-content'} px={6} colorScheme='' py={6} rounded={'full'} fontWeight={500} fontSize={'18px'}>
                    Our Team
                </Button>
            </center>

            <Text textAlign={'center'} className='heading' mt={5} color={'black'}>Meet our Founding Team</Text>
            <Text fontSize={'20px'} fontWeight={500} width={{ base: '100%', md: '75%', lg: '55%' }} m={'auto'} textAlign={'center'} mt={4} color={'#636E88'}>
                Our team is a passionate group of professionals dedicated to innovation, collaboration, and delivering exceptional results.
            </Text> */}

            <Box position="relative" mt={8}>
                <IconButton
                    icon={<ChevronLeftIcon boxSize={6} />}
                    position="absolute"
                    left={{ base: -4, md: -2, lg: -12 }}
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex={2}
                    onClick={() => sliderRef.current.slickPrev()}
                    aria-label="Previous"
                    bg="var(--peach)"
                    color="white"
                    rounded="full"
                    colorScheme=''
                    size={'sm'}
                />

                <Slider ref={sliderRef} {...settings}>
                    {services.map((item, index) => (
                        <Box p={{ base: 0, md: 1 }} key={index}>
                            <Card bgColor={'white'} textAlign={'center'} p={{ base: 2, md: 2, lg: 2 }} rounded={20}>
                                <center>
                                    <Image src={item.img} alt={item.title} h={'450px'}  rounded={12} />
                                </center>
                                <Text fontSize={'24px'} fontWeight={600} color={'#1D2B4F'} mt={6}>{item.title}</Text>
                                <center>
                                    <Button bg={'#F1F5F9'} color={'#636E88'} colorScheme='' py={6} width={'fit-content'} px={8} rounded={12} mt={4}>{item.subtitle}</Button>

                                </center>                                <Text mt={4} className='paragraph' color={'#636E88'} noOfLines={8}>{item.desc}</Text>

                            </Card>
                        </Box>
                    ))}
                </Slider>

                <IconButton
                    icon={<ChevronRightIcon boxSize={6} />}
                    position="absolute"
                    right={{ base: -4, md: -2, lg: -12 }}
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex={2}
                    onClick={() => sliderRef.current.slickNext()}
                    aria-label="Next"
                    bg="var(--peach)"
                    color="white"
                    rounded="full"
                    colorScheme=''
                    size={'sm'}
                />
            </Box>
        </Box>
    );
};

export default Index;
