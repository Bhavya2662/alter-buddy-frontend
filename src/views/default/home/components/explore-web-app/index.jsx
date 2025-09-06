// Chakra UI Components
import { Box, Text, Flex, Heading, Image } from "@chakra-ui/react";

// Image Assets
import feetureImg1 from "../../../../../assets/final-image/images/feeture-img-1.png";
import feetureImg2 from "../../../../../assets/final-image/images/feeture-img-2.png";

// Icon Assets
import icon1 from "../../../../../assets/final-image/icons/feature-icon1.png";
import icon2 from "../../../../../assets/final-image/icons/feature-icon4.png";
import icon3 from "../../../../../assets/final-image/icons/feature-icon5.png";
import icon4 from "../../../../../assets/final-image/icons/feature-icon-4.png";


const Explolrewebapp = () => {
    return (
        <Box w="full"  >
            <Heading className="heading" textTransform="capitalize">
                Explore our web features.
            </Heading>
            <Text fontSize={{ base: "sm", md: "lg" }} color="gray.600" mt={2}>
                Explore our world for good reproductive health.
            </Text>

            <Flex direction={{ base: "column", lg: "row" }} gap={8} mt={6}>
                {/* Left Section */}
                <Box w={{ base: "full", lg: "60%" }}>
                    {/* Online Booking */}
                    <Flex
                        direction={{ base: "column", sm: "row" }}
                        gap={6}
                        bg="white"
                        // p={{ base: 0, md: '20px 0px 0px 25px' }}
                        borderRadius="20px"
                    >
                        <Box p={6}>
                            <Box borderRadius="full" p={3} w="fit-content">
                                <Image src={icon1} alt="mobileImg" width={'60px'} height={'60px'} />
                            </Box>
                            <Text className="subHeading" fontWeight="semibold" mt={6}>
                                Convenient Online Booking
                            </Text>
                            <Text className="paragraph" color="#64748B" mt={3} w={{ base: "100%", sm: "80%" }}>
                                Easily schedule consultations and meetings with healthcare professionals through our user-friendly online booking platform.
                            </Text>
                        </Box>
                        <Box w="100%">
                            <Image src={feetureImg1} alt="mobileImg" width="100%" height="100%" />
                        </Box>
                    </Flex>

                    {/* Two Sections */}
                    <Flex direction={{ base: "column", md: "row" }} mt={8} gap={6}>
                        {/* Records Management */}
                        <Box bg="white" p={6} borderRadius="20px" flex="1">
                            <Image src={icon4} alt="mobileImg" width={'60px'} height={'60px'} />
                            <Text className="subHeading" fontWeight="semibold" mt={6}>
                                Records Management
                            </Text>
                            <Text className="paragraph" color="#64748B" mt={3}>
                                Effortlessly store and access patient medical records, ensuring vital information is available for healthcare providers during appointments.
                            </Text>
                        </Box>

                        {/* Instant Confirmation */}
                        <Box bg="white" p={6} borderRadius="20px" flex="1">
                            <Image src={icon2} alt="mobileImg" width={'60px'} height={'60px'} />
                            <Text className="subHeading" fontWeight="semibold" mt={6}>
                                Instant Confirmation
                            </Text>
                            <Text className="paragraph" color="#64748B" mt={3}>
                                Receive instant confirmation of your booked appointments, along with timely reminders to ensure you never miss a meeting.
                            </Text>
                        </Box>
                    </Flex>
                </Box>

                {/* Right Section */}
                <Flex
                    w={{ base: "full", lg: "40%" }}
                    direction={{ base: "column", sm: "row", lg: "column" }}
                    bg="white"
                    justifyContent={'space-between'}
                    borderRadius="20px"
                    
                    alignItems="center"
                >
                    <Box p={6} pb={0}>
                        <Image src={icon3} alt="mobileImg" width={'60px'} height={'60px'} />
                        <Text className="subHeading" fontWeight={'semibold'} mt={4}>
                            Secure Virtual Meetings
                        </Text>
                        <Text className="paragraph" color="#64748B" mt={2} w={{ base: "100%", sm: "80%", lg: "100%" }}>
                            Experience secure and convenient virtual consultations from home. Our encrypted video conferencing guarantees confidential interactions, removing the need for in-person visits.
                        </Text>
                    </Box>
                    <Box w="100%">
                        <Image
                        
                            src={feetureImg2}
                            alt="mobileImg"
                            width="100%"
                            height={{ base: '250px', md: "360px" }}
                            roundedBottom={10}
                            maxHeight={{ base: '250px', md: "360px" }}
                        />
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Explolrewebapp;
