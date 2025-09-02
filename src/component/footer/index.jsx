// Chakra UI Components
import {
    AbsoluteCenter,
    Box,
    Flex,
    Grid,
    GridItem,
    Image,
    ListItem,
    Text,
    UnorderedList
} from '@chakra-ui/react';

// React Router
import { Link } from 'react-router-dom';

// Logo and Icon Assets
import logo from '../../assets/final-image/icons/alter-logo.svg';
import linkedInLogo from '../../assets/final-image/icons/linkedin-logo.svg';
import facebookLogo from '../../assets/final-image/icons/facebook-logo.svg';
import instaLogo from '../../assets/final-image/icons/instalogo.svg';
import twitterLogo from '../../assets/final-image/icons/twitter-logo.svg';



const Footer = () => {


    const quickLinks = [
        { name: "Home", path: "/" },
        { name: "About us", path: "/about-us" },
        { name: "FAQs", path: "/faqs" },
        { name: "Contact us", path: "/contact-us" },
        { name: "Blogs", path: "/blogs" },
        { name: "Careers", path: "/careers" }
    ]
    const serviceLinks = [
        { name: "Mental Health", path: "/services/mental-health" },
        { name: "Manifestation", path: "/services/manifestation" },
        { name: "Healing", path: "/services/healing" },
        { name: "Energy Work", path: "/services/energy-work" },
        {
            name: "RANT (VENT IT OUT)",
            path: `https://rant.alterbuddy.com/rant?appToken=${localStorage.getItem("USER_TOKEN")}`
        },
        { name: "Relationship & Dating", path: "/services/dating-relationship" },
    ]
    const policies = [
        { name: "Terms & Conditions", path: "/terms-and-condition" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Refund Policy", path: "/refund-policy" },
        { name: "Shipping Policy", path: "/shipping-policy" },

    ]

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Box w={'full'} bgColor={'var(--lightpeach)'} mt={4}>
            <Box className='section-container' pt={12} pb={4}>
                <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }} gap={6}>
                    <GridItem width={{ base: '100%', md: '320px', lg: '380px' }}>
                        <Link to="/">
                            <Image ml={'-18px'} onClick={scrollToTop} src={logo} alt="logo" w={'250px'} />
                        </Link>
                        {/* <Text fontSize={'18px'} fontWeight={500} color={'black'} mt={2}>Your Alternate buddy to Alter <br />Your Life</Text> */}
                        <Text className='paragraph' color={'gray.600'} fontSize={'16px'} w={'90%'} mt={3}>
                            At times we are lost and filled with negativity all around us, drowning in the challenges and uncertainties of life.
                            Our relationships, careers, health, and money all are at stake.
                            We feel nothing is working for us and we are living the most miserable life one can ever have.
                        </Text>


                        <Flex alignItems={'center'} gap={5} mt={6}>
                            <a href='https://www.facebook.com/profile.php?id=61554826193607&mibextid=LQQJ4d' target='_blank'>
                                <Image src={facebookLogo} alt='fb' />
                            </a>
                            <a href='https://www.instagram.com/alter.buddy?igsh=ZTFoaTdyOGhxM2Qx' target='_blank'>
                                <Image src={instaLogo} alt='instagram' />
                            </a>
                            <a href='https://x.com/alterbuddy_?s=21' target='_blank'>
                                <Image src={twitterLogo} alt='twitter' />
                            </a>
                            <a href='https://www.linkedin.com/company/alterbuddy/' target='_blank'>
                                <Image src={linkedInLogo} alt='linkedIn' />
                            </a>
                        </Flex>
                    </GridItem>

                    <GridItem>
                        <Text color={'var(--peach)'} fontSize={'18px'} fontWeight={600}>Quick links</Text>
                        <UnorderedList p={0} m={0} mt={3} spacing={3}>
                            {quickLinks.map((link, index) => (
                                <ListItem
                                    onClick={scrollToTop}
                                    key={index}
                                    listStyleType={'none'}
                                    p={0}
                                    color={'black'}
                                    fontSize={'16px'}
                                    fontWeight={400}
                                >
                                    <Link to={link.path}>{link.name}</Link>
                                </ListItem>))}
                        </UnorderedList>
                    </GridItem>
                    <GridItem>
                        <Text color={'var(--peach)'} fontSize={'18px'} fontWeight={600}>Services</Text>
                        <UnorderedList p={0} m={0} mt={3} spacing={3}>
                            {serviceLinks.map((link, index) => (
                                <ListItem
                                    onClick={scrollToTop}
                                    key={`services${index}`}
                                    listStyleType={'none'}
                                    p={0}
                                    color={'black'}
                                    fontSize={'16px'}
                                    fontWeight={400}
                                >
                                    <Link to={link.path}>{link.name}</Link>
                                </ListItem>))}
                        </UnorderedList>
                    </GridItem>
                    <GridItem>
                        <Text color={'var(--peach)'} fontSize={'18px'} fontWeight={600}>Policies</Text>
                        <UnorderedList p={0} m={0} mt={3} spacing={3}>
                            {policies.map((link, index) => (
                                <ListItem onClick={scrollToTop} key={`policies${index}`} listStyleType={'none'} color={'black'} fontSize={'16px'} fontWeight={400}>
                                    <Link to={link.path} >
                                        {link.name}
                                    </Link>
                                </ListItem>
                            ))}
                        </UnorderedList>
                    </GridItem>
                    <GridItem>
                        <Text color={'var(--peach)'} fontSize={'18px'} fontWeight={600}>Contact Us</Text>
                        <UnorderedList p={0} m={0} mt={3} spacing={3} listStyleType={'none'} color={'black'} fontSize={'16px'} fontWeight={400} whiteSpace={'nowrap'}>

                            <ListItem>Phone - <span>77188 45776</span></ListItem>
                            <ListItem>Email - <span>cheer@alterbuddy.com</span></ListItem>
                            <ListItem>Address - <span>Whispering Palms xx_clusive,<br />  Lokhandwala Complex, Kandivali East,<br /> Mumbai - 400101, Maharashtra</span></ListItem>

                        </UnorderedList>
                    </GridItem>
                </Grid>
                <Box bgColor={'white'} p={3} px={{ base: 4, md: 12 }} rounded={10}
                    textAlign={'center'} className='paragraph'
                    width={{ base: '100%', md: '85%' }} m={'auto'} mt={5} color={'var(--peach)'}
                >
                    ⓘ AlterBuddy is not a crisis or suicide helpline. If you or anyone you know requires immediate help, please reach out to the nearest emergency services. You can find professional help in your country
                    &nbsp;<a href="http://iasp.info/crisis-centres-helplines/" style={{ textDecoration: "underline" }} target='_blank'>here</a>.
                </Box>


            </Box>
            <Box bg={'black'} mt={2} position='relative' padding={5}>

                <AbsoluteCenter bg={'black'} px='4' color={'white'} fontSize={{ base: '10px', md: '15px' }}>
                    © Alter Buddy 2025. All Right Reserved.
                </AbsoluteCenter>
            </Box>
        </Box>
    )
}
export default Footer;
