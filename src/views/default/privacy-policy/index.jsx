// Chakra UI Components
import {
     Box,
     Text,
     UnorderedList,
     ListItem,
     Divider,
     List,
} from "@chakra-ui/react";

// Custom Components
import Navbar from "../../../component/navbar";
import Footer from "../../../component/footer";
import { Link } from "react-router-dom";


const PrivacyPolicy = () => {
     return (
          <Box className="main-container" >
            
               <Box className="section-container" pt={{ base: 14, md: 12, lg: 12 }}>
                    <Text
                         color={"var(--peach)"}
                         className="heading"
                    >
                         Privacy Policy
                    </Text>
                    <Text color={"black"} fontSize={"lg"} fontWeight={600} mt={2}>
                    Effective Date: March 25th, 2025
                    </Text>
                    <Divider mt={8} />
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                    Welcome to AlterBuddy ("Company," "we," "our," or "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, <a href="https://alterbuddy.com/"><Box as="span" color={'blue.600'}>https://alterbuddy.com/</Box></a>  (the "Platform"), and any related services (the "Services").
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                    By using the Platform, you confirm that you are at least 18 years of age and agree to the collection and use of information in accordance with this Privacy Policy. If you are under 18 years of age or do not agree with this Privacy Policy, please do not use our Platform.
                    </Text>
               </Box>

               {/* Collection of Personal Information Section */}
               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         1. Information We Collect
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                    We collect several types of information to provide and improve our Services, including:
                    </Text>
                    <Text fontSize={'lg'} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                    1.1 Personal Information
                    </Text>
                    <UnorderedList>
                         <ListItem>Name</ListItem>
                         <ListItem>Email address</ListItem>
                         <ListItem>Phone number</ListItem>
                         <ListItem>Gender</ListItem>
                         <ListItem>Date of birth</ListItem>
                         <ListItem>Payment details for subscription services</ListItem>
                         <ListItem>Profile information (for Practitioners and Users)</ListItem>
                    </UnorderedList>
                    <Text fontSize={'lg'} mt={2} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                    1.2 Sensitive Information
                    </Text>
                    <UnorderedList>
                         <ListItem>Any health-related information you provide when using our mental health, healing, or counseling services.</ListItem>
                         <ListItem>Conversations between Users and Practitioners may be recorded by AlterBuddy to ensure quality and compliance.</ListItem>
                    </UnorderedList>
                    <Text fontSize={'lg'} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                    1.3 Non-Personal Information
                    </Text>
                    <UnorderedList>
                         <ListItem>Browser type and version</ListItem>
                         <ListItem>IP address</ListItem>
                         <ListItem>Device type and operating system</ListItem>
                         <ListItem>Usage data such as pages visited, session duration, and interactions with the Platform</ListItem>
                    </UnorderedList>
                    <Text fontSize={'lg'} mt={2} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                    1.4 Cookies and Tracking Technologies
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">We use cookies and similar tracking technologies to enhance your experience. You can control or disable cookies through your browser settings.</Text>
                   

               </Box>
               <Box mt={6} className="section-container">
               <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         2. How We Use Your Information
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                    We use your information for various purposes, including:
                    </Text>
                    <UnorderedList>
                         <ListItem>To provide and maintain our Services.</ListItem>
                         <ListItem>To connect Users with Certified Psychologists, Coaches, and Counsellors.</ListItem>
                         <ListItem>To process payments for subscriptions.</ListItem>
                         <ListItem>To personalize user experience.</ListItem>
                         <ListItem>To record and analyze conversations for quality improvement.</ListItem>
                         <ListItem>To send important service-related communications.</ListItem>
                         <ListItem>To detect, prevent, and address technical issues, fraud, and abuse.</ListItem>
                         <ListItem>To comply with legal obligations.</ListItem>
                    </UnorderedList> 
               </Box>
               
               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         3. How We Share Your Information
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                    We may share your information in the following circumstances:
                    </Text>
                    <Text fontSize={'lg'} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                    3.1 With Practitioners
                    </Text>
                    <UnorderedList>
                         <ListItem>When you choose to connect with a Practitioner, they may receive access to necessary details to assist you.</ListItem>
                    </UnorderedList>
                    <Text fontSize={'lg'} mt={2} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                    3.2 With Service Providers
                    </Text>
                    <UnorderedList>
                         <ListItem>We may share information with third-party service providers who assist us in payment processing, hosting, analytics, or customer support.</ListItem>
                    </UnorderedList>
                    <Text fontSize={'lg'} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                    3.3 Legal Obligations
                    </Text>
                    <UnorderedList>
                         <ListItem>If required by law, we may disclose your personal information in response to legal requests by public authorities.</ListItem>
                    </UnorderedList>
                    <Text fontSize={'lg'} mt={2} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                    3.4 Business Transfers
                    </Text>
                    <UnorderedList>
                         <ListItem>In case of a merger, acquisition, or asset sale, your personal data may be transferred to the new entity.</ListItem>
                    </UnorderedList>
                   

               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         4. Your Rights and Choices
                    </Text>
                    <Text fontSize={'lg'} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                    4.1 Access and Update
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">You may access and update your personal information through your account settings.</Text>
                    <Text fontSize={'lg'} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                    4.2 Opt-Out
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">You can opt out of marketing communications by following the unsubscribe instructions in our emails.</Text>
                    <Text fontSize={'lg'} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                    4.3 Data Deletion
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">You may request the deletion of your account and personal data by contacting us at cheer@alterbuddy.com. Some data may be retained for legal and operational purposes.</Text>
                    <Text fontSize={'lg'} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                    4.4 Restriction of Processing
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">You can request to restrict the processing of your personal data in certain circumstances.</Text>
                    
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         5. Data Security
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">We implement industry-standard security measures to protect your information. However, no transmission over the internet is 100% secure, and we cannot guarantee absolute security.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         6. Retention of Data
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">We retain your personal data only for as long as necessary to provide you with the Services or comply with legal obligations.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         7. Third-Party Links
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">Our Platform may contain links to third-party websites. We are not responsible for the privacy practices of those websites.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         8. Children's Privacy
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">Our Services are not intended for individuals under 18. If we discover that a minor has provided us with personal information, we will delete it promptly.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         9. Changes to This Privacy Policy
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         10. Contact Us
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">If you have any questions or concerns about this Privacy Policy, please contact us at: AlterBuddy</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">F-801/02, Whispering Palms xx_clusive, Lokhandwala Complex, Kandivali East, Mumbai - 400101, Maharashtra, India</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">Email: cheer@alterbuddy.com</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">Website: <a href="https://alterbuddy.com/"><Box as="span" color={'blue.600'}>https://alterbuddy.com/</Box></a></Text>
               </Box>
             
          </Box>
     );
}

export default PrivacyPolicy;

