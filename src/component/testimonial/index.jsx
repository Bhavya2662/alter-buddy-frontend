import { useState } from "react";
import Slider from "react-slick";
import { Box, Button, Heading, Text, Flex, Image } from "@chakra-ui/react";

// Import styles for Slick Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import assets
import clientImg1 from "../../assets/final-image/images/testimonial-img.png";
import clientImg2 from "../../assets/final-image/images/testimonial-img2.png";
import clientImg3 from "../../assets/final-image/images/testimonial-img3.png";
import clientImg4 from "../../assets/final-image/images/testimonial-img4.png";
import clientImg5 from "../../assets/final-image/images/testimonial-img5.png";
import prev from "../../assets/final-image/icons/prev-arrow.png";
import next from "../../assets/final-image/icons/next-arrow.png";


const testimonials = [
    {
        name: "Meera Kapoor",
        position: "Wellness Coach & Entrepreneur",
        image: clientImg2,
        quote:
            "AlterBuddy has completely transformed the way I approach wellness. From daily self-care routines to guided support, it's like having a personal wellness companion in my pocket.",
    },
    {
        name: "Rajiv Menon",
        position: "Marketing Manager at GreenEarth",
        image: clientImg1,
        quote:
            "I’ve tried many wellness apps, but AlterBuddy stands out. It’s intuitive, beautifully designed, and genuinely supportive. I feel more balanced and in control every day.",
    },
    {
        name: "Tanisha Verma",
        position: "Yoga Instructor & Content Creator",
        image: clientImg3,
        quote:
            "AlterBuddy is more than just an app—it’s a mindset shift. It keeps me accountable, grounded, and continuously inspired to live a healthier, more mindful life.",
    },
    {
        name: "Arjun Rathi",
        position: "Product Designer",
        image: clientImg5,
        quote:
            "Work-life balance felt like a myth until I started using AlterBuddy. The check-ins and wellness reminders keep me sane and centered even on the busiest days.",
    },
    {
        name: "Sanya Bhatia",
        position: "Student & Mental Health Advocate",
        image: clientImg4,
        quote:
            "As a student juggling academics and anxiety, AlterBuddy has been a blessing. The mindfulness tools and daily mood tracker have helped me build emotional resilience.",
    },
];


const CustomNext = (props) => {
    const { onClick } = props;
    return (
        <Box position="absolute" bottom={-50} left="52%" onClick={onClick} cursor="pointer" >
            <Image src={next} alt="Next" width={{ base: '30px', md: '50px' }} height={{ base: '30px', md: '50px' }} />
        </Box>
    );
};

const CustomPrev = (props) => {
    const { onClick } = props;
    return (
        <Box position="absolute" bottom={-50} left={{ base: "42%", md: "42%", lg: '46%' }} onClick={onClick} cursor="pointer">
            <Image src={prev} alt="Prev" width={{ base: '30px', md: '50px' }} height={{ base: '30px', md: '50px' }} />
        </Box>
    );
};

const Index = () => {
    const centerSlide = Math.floor(testimonials.length / 2);
    const [activeIndex, setActiveIndex] = useState(centerSlide);

    const settings = {
        centerMode: true,
        centerPadding: "10px",
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        initialSlide: centerSlide, // Start from center slide
        beforeChange: (oldIndex, newIndex) => setActiveIndex(newIndex),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
        prevArrow: <CustomPrev />,
        nextArrow: <CustomNext />,
    };

    return (
        <Box width="100%" margin="auto" >
            <Flex justify="center" width="full">
                <Button bg="var(--lightpeach)" color="var(--peach)" fontWeight="semibold" px={8} rounded="full" py={6}>
                    TESTIMONIAL
                </Button>
            </Flex>
            <Heading textAlign="center" mt={6} size="lg">
                Client Testimonial
            </Heading>
            <Text textAlign="center" mt={2} color="var(--grey)" className="paragraph">
                Have a look at how professionals view us.
            </Text>
            <Box mt={10} mb={8}>
                <Slider {...settings}>
                    {testimonials.map((testimonial, index) => (
                        <Box
                            key={index}
                            className={`testimonial-card ${index === activeIndex ? "active" : ""}`}
                            transition="all 0.5s ease-in-out"
                            transform={index === activeIndex ? "scale(1.1)" : "scale(0.9)"} // Center card bigger
                            opacity={index === activeIndex ? "1" : "0.5"}
                            mb={8}
                        >
                            <Box textAlign="center" p={{ base: 6, md: 2, lg: 6 }} bg="white" borderRadius={10} >
                                <Box
                                    border="2px solid white"
                                    borderRadius="full"
                                    boxShadow="0px 8px 16px #125FB752"
                                    width={100}
                                    height={100}
                                    position="absolute"
                                    top={-10}
                                    left="50%"
                                    transform="translateX(-50%)"
                                >
                                    <Image src={testimonial.image} alt={testimonial.name} width={100} height={100} style={{ borderRadius: "50%" }} />
                                </Box>
                                <Text mt={12} color="gray.600" fontSize="md">
                                    {testimonial.quote}
                                </Text>
                                <Heading size="md" mt={4} fontWeight="semibold">
                                    {testimonial.name}
                                </Heading>
                                <Text color="gray.500" fontSize="sm" mt={2}>
                                    {testimonial.position}
                                </Text>
                            </Box>
                        </Box>
                    ))}
                </Slider>
            </Box>
            <style jsx>{`
            .testimonial-main-card{
                width: 100%;
                max-width: 100%;
                position: relative;
                margin-bottom: 30px;
            }
            .testimonial-card {
                opacity: 0.5;
                transform: scale(0.9);
                transition: all 0.3s ease;
                padding: 10px;
                text-align: center; /* Centering content */
                border-radius: 10px;
                background: #fff;
                margin-top: 60px;
            }
            .testimonial-card.active {
            opacity: 1;
            transform: scale(1);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            border: 1px solid var(--pink);
            padding: 15px;
        }
        .testimonial-content {
          text-align: center; 
        }
        .testimonial-img {
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0px 8px 16px #125FB752;
            width: 100px;
            height: 100px;
            position: absolute;
            top: -50px; /* Adjust to move the image upwards */
            left: 50%;
            transform: translateX(-50%); /* Center horizontally */
            z-index: 9;
        }
    `}
            </style>
        </Box>
    );
};

export default Index;
