// React & Libraries
import { useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Chakra UI Components
import {
  Box,
  Button,
  Card,
  Flex,
  Image,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

// Image Assets
import serviceImg1 from "../../../../../assets/final-image/images/service-img2.png";
import serviceImg2 from "../../../../../assets/final-image/images/service-img6.png";
import serviceImg3 from "../../../../../assets/final-image/images/service-img3.png";
import serviceImg4 from "../../../../../assets/final-image/images/service-img4.png";
import serviceImg5 from "../../../../../assets/final-image/images/serviceImg4.png";
import serviceImg6 from "../../../../../assets/final-image/images/service-img5.png";
import serviceImg7 from "../../../../../assets/final-image/images/service-img7.png";

import { useNavigate } from 'react-router-dom';


const Index = () => {
    const navigate = useNavigate();
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
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
            title: "Mental Health",
            desc: "Our psychologists (your buddies) help you overcome anxiety, stress, and confusion. They will help you gain clarity and confidence in your life's direction.",
            path: "services/mental-health",
        },
        {
            img: serviceImg2,
            title: "Manifestation",
            desc: "Our coaches (Your Genies) will guide you in manifesting your desires for love, relationships, success, money, and good health, helping you transform your reality and create the life you always desired.",
            path: "services/manifestation",
        },
        {
            img: serviceImg3,
            title: "Healing",
            desc: "Our compassionate healers offer emotional and spiritual healing to help you heal past traumas, find inner peace, and rediscover balance and harmony in your life.",
            path: "services/healing",
        },
        {
            img: serviceImg4,
            title: "Rant (Vent Out) Services",
            desc: "Feeling overwhelmed? Just Vent it out. We are here to listen. Our rant-out buddies provide a safe space for you to vent your frustrations and emotions without fear of judgment.",
            path: "services/rant",
        },
        {
            img: serviceImg5,
            title: "Dating and Relationships",
            desc: "We don’t teach you cheesy pickup lines, we help you become the one she can’t look away from. Because when you show up as your most grounded, confident self, connection becomes effortless",
            path: "services/dating-relationship",
        },
        {
            img: serviceImg6,
            title: "Energy work",
            desc: "We gently scan, clear, protect and realign your energy (DO A SOUL DETOX) so you can feel lighter and calmer from the inside. Because when your energy is aligned, everything else begins to fall into place.",
            path: "services/energy-work",
        },
        {
            img: serviceImg7,
            title: "ENERGY HEALING FOR PETS",
            desc: "Gentle, non-invasive healing for your pets. Whether they're anxious, in pain, or simply not themselves, our energy sessions help restore their calm, comfort, and vitality= because they deserve healing too.",
            path: "services/energy-pets",
        },
    ];

    return (
        <Box width={'100%'}>
            <center>
                <Button cursor={'default'} _hover={{bg:"var(--peach)"}} bg={'var(--peach)'} color={'white'} w={{ base: '60%', md: '270px' }} py={6} rounded={'full'} fontWeight={500} fontSize={'18px'}>
                    Our Services
                </Button>
            </center>

            <Text textAlign={'center'} className='heading' mt={5} color={'black'}>How do we help?</Text>
            {/* <Text className='paragraph' width={{ base: '100%', md: '70%' }} m={'auto'} textAlign={'center'} mt={4} color={'#64748B'}>
                The belief that celestial bodies influence human lives, revealing insights based on planetary positions at birth.
            </Text> */}

            <Box position="relative" mt={4}>
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
                        <Box p={{ base: 0, md: 2 }} key={index}>
                            <Card textAlign={'center'} p={{ base: 4, md: 4, lg: 6 }} rounded={20} height={'auto'}>
                                <center>
                                    <Image src={item.img} alt={item.title} w={'100%'} h={'250px'} maxHeight={'250px'} rounded={12} />
                                </center>
                                <Text fontSize={'24px'} fontWeight={600} color={'black'} mt={6}>{item.title}</Text>
                                <Text mt={4} noOfLines={3} className='paragraph' color={'#636E88'} >{item.desc}</Text>
                                <Flex justifyContent={'center'} mt={4}>
                                    <Button onClick={()=>navigate(item.path)} bg={'#F1F5F9'} color={'#636E88'} colorScheme='' py={6} width={'fit-content'} px={8} rounded={12}>
                                        Learn More...
                                    </Button>
                                </Flex>
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


