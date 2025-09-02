// React & Hooks
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Chakra UI Components
import {
    Box,
    Flex,
    Button,
    IconButton,
    useDisclosure,
    VStack,
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    Image,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Grid,
    Popover,
    PopoverTrigger,
    Avatar,
    PopoverBody,
    Divider,
    PopoverContent,
    useToast
} from '@chakra-ui/react';

// Chakra UI Icons
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
} from '@chakra-ui/icons';

// Assets
import logo from "../../assets/final-image/icons/alter-logo.svg";
import serviceImg1 from "../../assets/final-image/icons/service-img1.png";
import serviceImg2 from "../../assets/final-image/icons/service-img2.png";
import serviceImg3 from "../../assets/final-image/icons/service-img3.png";
import serviceImg4 from "../../assets/final-image/icons/service-img4.png";
import serviceImg5 from "../../assets/final-image/icons/service-img5.png";
import serviceImg6 from "../../assets/final-image/icons/service-img6.png";
import serviceImg7 from "../../assets/final-image/icons/service-img7.png";

// External Icons
import { FaArrowRightLong, FaRegUser } from "react-icons/fa6";
import { RiLogoutCircleRLine, RiUserForbidLine } from 'react-icons/ri';
import { handleError, handleUserAuthentication, handleUserLogout, useAuthenticationSlice, useLayoutSlice } from '../../redux/features';
import { getUserToken, removeUserToken } from '../../utils';
import { useGetAllCategoryQuery, useLazyGetNotificationsQuery, useLazyProfileUserQuery, useLogoutUserMutation } from '../../redux/rtk-api';
import Aos from "aos";
import { useAppDispatch } from '../../redux';

const Navbar = () => {
    const toast = useToast();

    const initRef = useRef();
    const { isOpen, onToggle, onClose } = useDisclosure();
    const location = useLocation(); // Get current path
    const [activeLink, setActiveLink] = useState('');
    const dispatch = useAppDispatch();
    const { authentication } = useAuthenticationSlice();
    const localStore = getUserToken();
    const { mobileMenu, error } = useLayoutSlice();

    const {
        data: category,
        isError: isCategoryError,
        isLoading: isCategoryLoading,
        error: categoryError,
    } = useGetAllCategoryQuery();
    const [
        LogoutApi,
        {
            isError: isLogoutError,
            isLoading: isLogoutLoading,
            isSuccess: isLogoutSuccess,
            error: logoutError,
        },
    ] = useLogoutUserMutation();

    const [
        GetNotification,
        {
            isError: isNotificationError,
            error: notificationError,
            data: notificationData,
            isLoading: isNotificationLoading,
        },
    ] = useLazyGetNotificationsQuery();

    const [GetProfile, { data: profile }] = useLazyProfileUserQuery();

    useEffect(() => {
        Aos.init({});
        if (authentication) {
            (async () => {
                await GetProfile();
            })();
        }
    }, [authentication, GetProfile]);

    const navigate = useNavigate();

    useEffect(() => {

        if (isNotificationError) {
            console.log("Error", error);
            return;
        }

        if (authentication) {
            (async () => {
                await GetNotification();
            })();
        }

        if (isCategoryError) {
            if ((categoryError)?.data) {
                dispatch(handleError((categoryError).data.message));
            }
        }
        if (isLogoutError) {
            if ((logoutError)?.data) {
                dispatch(handleError((logoutError).data.message));
            } else {
                console.log(logoutError);
            }
        }
        if (isNotificationError) {
            if ((notificationError)?.data) {
                dispatch(handleError((notificationError).data.message));
            }
        }

        if (isLogoutSuccess) {
            dispatch(handleUserLogout());
            dispatch(handleError(null));
            removeUserToken();
            navigate("/", { replace: true });
        }
        if (localStorage?.getItem("USER_TOKEN")) {
            dispatch(
                handleUserAuthentication({
                    token: localStore,
                })
            );
        }
        window.scrollTo(0, 0);
    }, [
        dispatch,
        localStore,
        isLogoutError,
        logoutError,
        isLogoutSuccess,
        isCategoryError,
        categoryError,
        navigate,
        isNotificationError,
        notificationError,
        // isNotificationSuccess,
        notificationData?.data,
        GetNotification,
        authentication,
        error,
    ]);

    const LogoutFunc = async () => {
        toast({
            title: 'Logged out successfully.',
            description: 'You have been logged out of your account.',
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top',
        });
        return LogoutApi();
    };

    console.log("category", profile);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const links = [
        { item: 'Home', path: '/' },
        { item: 'About Us', path: '/about-us' },
        { item: 'Services', path: '/service' },
        { item: 'Mentors', path: '/mentor/list' },
        { item: 'Contact Us', path: '/contact-us' },
    ];

    const serviceOptions = [
        { label: 'Mental Health', path: 'services/mental-health', img: serviceImg1 },
        {
            label: 'RANT (VENT OUT)', path: `https://rant.alterbuddy.com/rant?appToken=${localStorage.getItem("USER_TOKEN")}`
            , img: serviceImg4
        },
        { label: 'Manifestation', path: 'services/manifestation', img: serviceImg2 },
        { label: 'Energy work ⍟', path: 'services/energy-work', img: serviceImg6 },
        { label: 'Healing', path: 'services/healing', img: serviceImg3 },
        { label: 'Energy Healing for Pets', path: 'services/energy-pets', img: serviceImg7 },
        { label: 'Dating and Relationships', path: 'services/dating-relationship', img: serviceImg5 },
    ];

    // Update active link on path change
    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const [showModal, setShowModal] = useState(false);

    const handleLogout = () => {
        setShowModal(false);
        console.log("User logged out");
        // Add your logout logic here (e.g., API call, redirect)
    };

    return (
        <Box bg="white" boxShadow="0px 0px 4px 0px var(--peach)" px={{ base: 2, md: 2, lg: 12 }}
            position="fixed" top={0} width="100%" left={0} zIndex={999}>
            <Flex h={{ base: '75px', md: 20 }} alignItems="center" justifyContent="space-between" maxWidth={'1600px'} m={'auto'}>
                {/* Logo */}
                <Box>
                    <Link to="/">
                        <Image onClick={scrollToTop} src={logo} alt="logo" width={{ base: '150px', md: '100px', lg: 'auto' }} h={{ base: '150px', md: '120px', lg: 'auto' }} />

                    </Link>
                </Box>

                {/* Desktop Menu */}
                <Flex display={{ base: 'none', md: 'flex' }} alignItems="center" gap={{ base: 12, md: 3, lg: 10 }}>
                    <Link to="/services/rant">
                        <Button onClick={scrollToTop} bgColor={'var(--peach)'} color={'white'} colorScheme='' rounded={'full'} fontSize={'15px'} px={{ base: 8, md: 4, lg: 8 }}>RANT</Button>
                    </Link>

                    {links.map(({ item, path }) => (
                        item === 'Services' ? (
                            <Menu onClick={scrollToTop} key={item} isOpen={dropdownOpen} onClose={() => setDropdownOpen(false)}>
                                <MenuButton

                                    as={Text}
                                    bgColor={'var(--peach)'} rounded={'full'} fontSize={'17px'} px={{ base: 8, md: 4, lg: 8 }}
                                    onMouseEnter={() => setDropdownOpen(true)}
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    py={2}
                                    cursor="pointer"
                                    color={serviceOptions.some(({ path }) => location.pathname.includes(path))
                                        ? 'white'
                                        : 'white'}
                                    _hover={{ color: 'white' }}
                                    fontWeight={location.pathname.includes('/service') ? '700' : '700'}
                                >
                                    {item} <ChevronDownIcon />
                                </MenuButton>

                                <MenuList onMouseLeave={() => setDropdownOpen(false)}
                                    width={{ base: '100%', md: '650px', lg: "1000px" }}
                                    //  minW="700px" // Ensure it maintains its width
                                    left="50%"
                                    transform="translateX(-50%) !important"
                                    position="absolute !important"
                                    zIndex="10"
                                    p={5}
                                    border={'none'}
                                >
                                    <Flex gap={6}>
                                        <Text className='paragraph' color={'var(--grey)'} fontWeight={'400'} w={'45%'}>
                                            Alter Buddy is more than a platform — it's a movement to normalize mental wellness in modern India. We provide safe, inclusive, and empowering experiences that connect you with licensed therapists, healers, and guides to help you thrive emotionally, mentally, and spiritually.                                        </Text>

                                        <Grid templateColumns={'repeat(2, 1fr)'} gap={5}>
                                            {serviceOptions.map(({ label, path, img }) => (
                                                <Flex key={label} alignItems={'center'} justifyContent={'space-between'} gap={6}>
                                                    <Flex onClick={() => navigate(path)} alignItems={'center'} gap={1}>
                                                        <Image src={img} alt='icon' width={'40px'} h={'40px'} />
                                                        <MenuItem onClick={scrollToTop} _hover={{ background: 'none' }} background={'white'} fontSize={{ md: '15px', lg: '16px' }}>
                                                            {label}
                                                        </MenuItem></Flex>
                                                    <div><FaArrowRightLong color='var(--peach)' />
                                                    </div>
                                                </Flex>
                                            ))}
                                        </Grid>
                                    </Flex>

                                </MenuList>
                            </Menu>
                        ) :
                            item === 'Mentors' ? (
                                <Link key={item} to={authentication ? path : 'sign-in'}>
                                    <Text color={location.pathname === path ? 'var(--peach)' : 'black'} fontWeight={location.pathname === path ? '500' : 'normal'} onClick={() => {
                                        scrollToTop();
                                    }} _hover={{ color: 'var(--peach)' }}>{item}</Text>
                                </Link>
                            )
                                : (
                                    <Link key={item} to={path}>
                                        <Text color={location.pathname === path ? 'var(--peach)' : 'black'} fontWeight={location.pathname === path ? '500' : 'normal'} onClick={scrollToTop} _hover={{ color: 'var(--peach)' }}>{item}</Text>
                                    </Link>
                                )
                    ))}

                </Flex>

                <Flex display={{ base: 'none', md: 'flex' }} alignItems={'center'} gap={{ base: 12, md: 4, lg: 10 }}>
                    <Link onClick={scrollToTop} to="/buddytube">
                        <Text color={location.pathname === '/buddytube' ? 'var(--peach)' : 'black'}
                            fontWeight={location.pathname === '/buddytube' ? '500' : 'normal'}
                            _hover={{ color: 'var(--peach)' }}
                        >BuddyTube</Text>
                    </Link>
                    {
                        !localStore ? <Button bg="#FDE8E8" color="var(--peach)"
                            px={{ base: 10, md: 4, lg: 10 }} py={{ base: 6, md: 4, lg: 6 }}
                            fontWeight={600}
                            onClick={(e) => navigate("/sign-in")}
                            colorScheme=''
                            rounded={'full'}
                        >
                            Get started
                        </Button> :
                            <Popover placement='bottom' initialFocusRef={initRef}>
                                {({ isOpen, onClose }) => (
                                    <>
                                        <PopoverTrigger>
                                            <Button bg="#FDE8E8" color="var(--peach)"
                                                px={{ base: 4, md: 4, lg: 4 }} py={{ base: 6, md: 4, lg: 6 }}
                                                fontWeight={600}
                                                colorScheme=''
                                                rounded={'full'}
                                            >
                                                <Flex alignItems={'center'} gap={2}>
                                                    <Avatar bg="var(--peach)" size={{ base: "xs", md: "sm", lg: "sm" }} />
                                                    <Box>
                                                        <Text fontSize={'18px'} fontWeight={600} lineHeight={'22px'}>
                                                            {profile?.data?.name?.firstName} {profile?.data?.name?.lastName}
                                                        </Text>
                                                    </Box>
                                                </Flex>
                                            </Button>

                                        </PopoverTrigger>
                                        <PopoverContent className='mx-5'>
                                            <PopoverBody className='shadow-2xl' p={5}>
                                                <Flex alignItems={'center'} gap={4}>
                                                    <Avatar bg="gray.500" size={{ base: "xs", md: "sm", lg: "md" }} />
                                                    <Box>
                                                        <Text fontSize={'18px'} fontWeight={600} lineHeight={'22px'}>
                                                            {profile?.data?.name?.firstName} {profile?.data?.name?.lastName}
                                                        </Text>
                                                        <Text color={'#48616ee3'} fontWeight={500}>
                                                            {profile?.data?.email}
                                                        </Text>
                                                    </Box>
                                                </Flex>
                                                <Divider mt={6} mb={4} />
                                                <Link to="user/my-profile">
                                                    <Flex alignItems={'center'} gap={4} cursor={'pointer'} onClick={onClose}><FaRegUser fontSize={'22px'} color="#48616ee3"

                                                    /> <Text fontSize={'18px'} className='hover:text-[#D86570]' fontWeight={'600'}>Profile</Text></Flex>
                                                </Link>
                                                <Divider my={4} />
                                                <Flex alignItems={'center'} gap={4}
                                                    onClick={() => setShowModal(true)}
                                                    cursor={'pointer'}
                                                ><RiLogoutCircleRLine fontSize={'22px'} color="#48616ee3" /> <Text fontSize={'18px'} fontWeight={'600'} className='hover:text-[#D86570]'>Logout</Text></Flex>

                                            </PopoverBody>
                                        </PopoverContent>
                                        {showModal && (
                                            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                                                <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
                                                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Confirm Logout</h2>
                                                    <p className="text-gray-600 text-lg mb-6">Are you sure you want to log out?</p>
                                                    <div className="flex justify-end space-x-3">
                                                        <button
                                                            onClick={() => setShowModal(false)}
                                                            className="px-4 py-2 rounded-lg text-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            onClick={LogoutFunc}
                                                            className="px-4 py-2 text-lg rounded-lg bg-primary-500 text-white hover:bg-primary-700 transition"
                                                        >
                                                            Log Out
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </>
                                )}
                            </Popover>
                    }


                </Flex>

                {/* Mobile Menu Toggle */}
                <IconButton
                    display={{ base: 'flex', md: 'none' }}
                    icon={<HamburgerIcon fontSize={'24px'} />}
                    onClick={onToggle}
                    variant="ghost"
                    aria-label="Open Menu"
                />
            </Flex>

            {/* Mobile Drawer */}
            <Drawer placement="left" onClose={onClose} isOpen={isOpen} >
                <DrawerOverlay />
                <DrawerContent w="50vw" maxW="280px" h="100vh" bg="white" zIndex={99999} >
                    <DrawerBody pr={0} >
                        <Flex justify={'end'}>
                            <IconButton
                                display={{ base: 'flex', md: 'none' }}
                                icon={<CloseIcon fontSize={'18px'} />}
                                onClick={onToggle}
                                variant="ghost"
                                aria-label="Open Menu"
                                padding={0}
                            />
                        </Flex>
                        <center>
                            <Link to="/" onClick={onClose}>
                                <Image src={logo} alt="logo" width={{ base: '150px', md: '150px', lg: 'auto' }} h={{ base: 'auto', md: '150px', lg: 'auto' }} />
                            </Link>
                        </center>
                        <VStack spacing={4} alignItems="start" color="#AF4C4C" pt={6}>
                            <Link to="/services/rant" >
                                <Button bgColor={'var(--peach)'} color={'white'} colorScheme='' w="80%" fontSize={'14px'} px={6}>RANT</Button>
                            </Link>
                            {/* {links.map(({ item, path }) => (
                <Link
                  key={item}
                  to={path}
                
                  onClick={onClose}
                >
                  <Text   color={location.pathname === path ? 'var(--peach)' : '#D86570BA'}
                  fontWeight={location.pathname === path ? 'bold' : 'normal'}>

                  {item}
                  </Text>
                </Link>
              ))} */}

                            {links.map(({ item, path }) => (
                                item === 'Services' ? (
                                    <Menu key={item} isOpen={dropdownOpen} onClose={() => setDropdownOpen(false)}>
                                        <MenuButton
                                            as={Text}
                                            onMouseEnter={() => setDropdownOpen(true)}
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                            cursor="pointer"
                                            color={serviceOptions.some(({ path }) => location.pathname.includes(path))
                                                ? 'var(--peach)'
                                                : 'black'}
                                            _hover={{ color: 'var(--peach)' }}
                                            fontWeight={location.pathname.includes('/service') ? '500' : 'normal'}
                                        >
                                            {item} <ChevronDownIcon />
                                        </MenuButton>

                                        <MenuList onMouseLeave={() => setDropdownOpen(false)}>
                                            {serviceOptions.map(({ label, path }) => (
                                                <MenuItem key={label} onClick={() => {
                                                    navigate(path);
                                                    onClose();
                                                }}>
                                                    {label}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </Menu>
                                )
                                    : (
                                        <Link key={item} to={path}>
                                            <Text color={location.pathname === path ? 'var(--peach)' : 'black'} fontWeight={location.pathname === path ? '500' : 'normal'} _hover={{ color: 'var(--peach)' }}>{item}</Text>
                                        </Link>
                                    )
                            ))}


                            <Link to="/buddytube">
                                <Text color={location.pathname === '/buddytube' ? 'var(--peach)' : 'black'}
                                    fontWeight={location.pathname === '/buddytube' ? '500' : 'normal'}
                                    _hover={{ color: 'var(--peach)' }}
                                >BuddyTube</Text>
                            </Link>
                            <Button bg="#FDE8E8" color="#D9534F" w="80%" _hover={{ bg: '#FAD4D4' }} onClick={() => {
                                navigate("/sign-in");
                                onClose()
                            }} rounded={'full'}>
                                Get started
                            </Button>

                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>


        </Box>
    );
};

export default Navbar;
