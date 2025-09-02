// React
import React from "react";

// Chakra UI Components
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Divider,
} from "@chakra-ui/react";

// Components - Shared
import Navbar from '../../../component/navbar';
import Footer from '../../../component/footer';

const Index = () => {
  return (
    <>
    <Box className="main-container" >
            
            <Box className="section-container" pt={{ base: 14, md: 12, lg: 12 }}>
                 <Text
                      color={"var(--peach)"}
                      className="heading"
                 >
                      Terms & Conditions
                 </Text>
                 <Text color={"black"} fontSize={"lg"} fontWeight={600} mt={2}>
                  Last Updated: March 25th, 2025
                 </Text>
                 <Divider mt={8} />
                 <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                 Welcome to AlterBuddy! These Terms & Conditions ("Terms") govern your use of the AlterBuddy platform ("Platform") operated by AlterBuddy ("Company," "we," "us," or "our"). By accessing or using the Platform, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not use our services.
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
                      1. Definitions
                 </Text>
                 
                 <UnorderedList>
                      <ListItem>"Platform" refers to the AlterBuddy website, mobile applications, and related services.</ListItem>
                      <ListItem>"User" refers to any individual accessing or using the Platform, including individuals seeking professional guidance. Users must be at least 18 years of age.</ListItem>
                      <ListItem>"Professional" refers to certified psychologists, coaches, counselors, and self-claimed practitioners who offer services on the Platform.</ListItem>
                      <ListItem>"Services" refer to the offerings provided through the Platform, including but not limited to manifestation, mental health support, healing, venting, and relationship advice.</ListItem>
                      <ListItem>"Subscription" refers to any paid plans that allow users or professionals to access certain features.</ListItem>
                      <ListItem>"Account" refers to a registered profile created by a User or Professional to access the Platform's services.</ListItem>
                      <ListItem>"AlterBuddy Content" refers to any text, graphics, images, software, and other materials provided through the Platform.</ListItem>
                 </UnorderedList>
            </Box>
            <Box mt={6} className="section-container">
            <Text
                      fontSize={"xl"}
                      color={"var(--peach)"}
                      fontWeight={"semibold"}
                      lineHeight="2.5"
                 >
                      2. Acceptance of Terms
                 </Text>
                 <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                 By using the Platform, you affirm that:
                 </Text>
                 <UnorderedList>
                 <ListItem>You are at least 18 years old or have parental/guardian consent to use the Platform. However, to access services independently, Users and Professionals must be at least 18 years of age.</ListItem>
                      <ListItem>You have read, understood, and agree to abide by these Terms.</ListItem>
                      <ListItem>Your continued use of the Platform signifies your acceptance of these Terms.</ListItem>
                 </UnorderedList> 
            </Box>
            
            <Box mt={6} className="section-container">
                 <Text
                      fontSize={"xl"}
                      color={"var(--peach)"}
                      fontWeight={"semibold"}
                      lineHeight="2.5"
                 >
                      3. Services Provided
                 </Text>
                 <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                 AlterBuddy offers a range of services aimed at personal development and mental well-being, including:
                 </Text>
                 <UnorderedList>
                      <ListItem>Manifestation: Guidance on manifestation techniques for achieving personal and professional goals.</ListItem>
                      <ListItem>Mental Health: Support from mental health professionals and self-claimed practitioners.</ListItem>
                      <ListItem>Healing: Various healing techniques, including alternative and holistic therapies.</ListItem>
                      <ListItem>Vent it out (Rant): A safe space for Users to express their thoughts and emotions.</ListItem>
                      <ListItem>Relationship & Dating Advice: Guidance from Professionals on relationships and dating matters.</ListItem>
                 </UnorderedList>
                 <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                      We do not guarantee the effectiveness or outcomes of any services offered by Professionals.
                 </Text>
            </Box>

            <Box mt={6} className="section-container">
                 <Text
                      fontSize={"xl"}
                      color={"var(--peach)"}
                      fontWeight={"semibold"}
                      lineHeight="2.5"
                 >
                      4. Registration & Account
                 </Text>
                 <UnorderedList>
                      <ListItem>Users and Professionals must register on the Platform to access services. Only individuals who are at least 18 years of age may create an account.</ListItem>
                      <ListItem>You agree to provide accurate, current, and complete information during registration.</ListItem>
                      <ListItem>You are responsible for maintaining the confidentiality of your login credentials.</ListItem>
                      <ListItem>We reserve the right to suspend or terminate accounts at our discretion if fraudulent, misleading, or harmful activity is detected.</ListItem>
                 </UnorderedList> 

                 <Box ml={4}>
                 <Text fontSize={'lg'} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                 Account Termination
                    </Text>         
                    <UnorderedList>
                      <ListItem>Users may request account deletion at any time by contacting cheer@alterbuddy.com.</ListItem>
                      <ListItem>AlterBuddy reserves the right to terminate accounts for violations of these Terms or any fraudulent behavior.</ListItem>
                      </UnorderedList>   </Box>  
            </Box>

            <Box mt={6} className="section-container">
                 <Text
                      fontSize={"xl"}
                      color={"var(--peach)"}
                      fontWeight={"semibold"}
                      lineHeight="2.5"
                 >
                      5. Subscription & Payment
                 </Text>
                 <UnorderedList>
                      <ListItem>The Platform may offer subscription plans for Users to connect with Professionals.</ListItem>
                      <ListItem>Fees and payment terms are provided at the time of purchase.</ListItem>
                      <ListItem>Payments are non-refundable unless otherwise stated.</ListItem>
                      <ListItem>We use third-party payment processors, and we are not liable for any issues arising from their services.</ListItem>
                 </UnorderedList>

                 <Box ml={4}>
                 <Text fontSize={'lg'} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                 Auto-Renewal & Cancellation
                    </Text>         
                    <UnorderedList>
                      <ListItem>Some subscriptions may automatically renew unless canceled before the renewal date.</ListItem>
                      <ListItem>Users can manage subscriptions through their account settings.</ListItem>
                      <ListItem>No partial refunds are offered for unused portions of a subscription period.</ListItem>
                      </UnorderedList> 
                 </Box>
            </Box>

            <Box mt={6} className="section-container">
                 <Text
                      fontSize={"xl"}
                      color={"var(--peach)"}
                      fontWeight={"semibold"}
                      lineHeight="2.5"
                 >
                      6. Recording of Conversations
                 </Text>
                 <UnorderedList>
                      <ListItem>AlterBuddy may record conversations between Users and Professionals for quality assurance, training, and safety purposes.</ListItem>
                      <ListItem>By using the Platform, you consent to such recordings.</ListItem>
                      <ListItem>Recordings will be stored securely and handled in compliance with applicable laws.</ListItem>
                      <ListItem>Users are prohibited from recording conversations without the consent of all parties involved.</ListItem>
                      </UnorderedList> 
            </Box>

            <Box mt={6} className="section-container">
                 <Text
                      fontSize={"xl"}
                      color={"var(--peach)"}
                      fontWeight={"semibold"}
                      lineHeight="2.5"
                 >
                      7. User Conduct
                 </Text>
                 <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                 Users agree not to:
                 </Text>
                 <UnorderedList>
                      <ListItem>Post false, misleading, or harmful content.</ListItem>
                      <ListItem>Harass, threaten, or harm other Users or Professionals.</ListItem>
                      <ListItem>Use the Platform for illegal or unauthorized purposes.</ListItem>
                      <ListItem>Engage in any activity that disrupts the operation of the Platform.</ListItem>
                      <ListItem>Attempt to access unauthorized accounts or interfere with Platform security.</ListItem>
                      
                 </UnorderedList>
            </Box>

            <Box mt={6} className="section-container">
                 <Text
                      fontSize={"xl"}
                      color={"var(--peach)"}
                      fontWeight={"semibold"}
                      lineHeight="2.5"
                 >
                      8. Professional Conduct
                 </Text>
                 <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                 Professionals using the Platform must:
                 </Text>
                 <UnorderedList>
                      <ListItem>Provide accurate information about their qualifications and experience.</ListItem>
                      <ListItem>Maintain confidentiality of user interactions unless legally required to disclose.</ListItem>
                      <ListItem>Adhere to ethical guidelines and professional standards in their respective fields.</ListItem>
                      <ListItem>Refrain from making medical diagnoses or prescribing medications unless properly licensed to do so.</ListItem>
                 </UnorderedList>
            </Box>

            <Box mt={6} className="section-container">
                 <Text
                      fontSize={"xl"}
                      color={"var(--peach)"}
                      fontWeight={"semibold"}
                      lineHeight="2.5"
                 >
                      9. Disclaimers & Limitation of Liability
                 </Text>
                 <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                 Users agree not to:
                 </Text>
                 <UnorderedList>
                      <ListItem>No Medical Advice: The Platform does not provide medical or psychiatric advice. Any interactions are for informational and support purposes only.</ListItem>
                      <ListItem>No Guarantees: We do not guarantee any specific outcomes from the use of our Services.</ListItem>
                      <ListItem>Limitation of Liability: We are not liable for any damages resulting from the use of the Platform, including but not limited to personal harm, financial loss, or misuse of information.</ListItem>
                      <ListItem>Third-Party Services: We are not responsible for any third-party services linked to or integrated with the Platform.</ListItem>
                 </UnorderedList>
            </Box>

            <Box mt={6} className="section-container">
                 <Text
                      fontSize={"xl"}
                      color={"var(--peach)"}
                      fontWeight={"semibold"}
                      lineHeight="2.5"
                 >
                      10. Privacy Policy
                 </Text>
                 <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">Your use of the Platform is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information.</Text>
            </Box>

            <Box mt={6} className="section-container">
                 <Text
                      fontSize={"xl"}
                      color={"var(--peach)"}
                      fontWeight={"semibold"}
                      lineHeight="2.5"
                 >
                      11. Third-Party Links
                 </Text>
                 <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">The Platform may contain links to third-party websites or services. We are not responsible for the content, policies, or practices of these third-party entities</Text>
            </Box>

            <Box mt={6} className="section-container">
                 <Text
                      fontSize={"xl"}
                      color={"var(--peach)"}
                      fontWeight={"semibold"}
                      lineHeight="2.5"
                 >
                      12. Intellectual Property Rights
                 </Text>
                 <UnorderedList>
                      <ListItem>AlterBuddy retains all intellectual property rights over the Platform and its content.</ListItem>
                      <ListItem>Users may not copy, modify, distribute, or use any content from the Platform without prior written consent.</ListItem>
                      <ListItem>Any feedback or suggestions submitted by Users become the property of AlterBuddy.</ListItem>
                 </UnorderedList>
            </Box>

            <Box mt={6} className="section-container">
                 <Text
                      fontSize={"xl"}
                      color={"var(--peach)"}
                      fontWeight={"semibold"}
                      lineHeight="2.5"
                 >
                      13. Termination
                 </Text>
                 <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                 We reserve the right to suspend or terminate your access to the Platform at any time if you:
                 </Text>
                 <UnorderedList>
                      <ListItem>Violate these Terms.</ListItem>
                      <ListItem>Engage in conduct that we determine to be inappropriate or harmful.</ListItem>
                      <ListItem>Attempt to misuse or exploit any Platform features.</ListItem>
                 </UnorderedList>
            </Box>

            <Box mt={6} className="section-container">
                 <Text
                      fontSize={"xl"}
                      color={"var(--peach)"}
                      fontWeight={"semibold"}
                      lineHeight="2.5"
                 >
                      14. Governing Law & Dispute Resolution
                 </Text>
                 <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.</Text>
            </Box>

            <Box mt={6} className="section-container">
                 <Text
                      fontSize={"xl"}
                      color={"var(--peach)"}
                      fontWeight={"semibold"}
                      lineHeight="2.5"
                 >
                      15. Changes to These Terms
                 </Text>
                 <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">We may update these Terms from time to time. Continued use of the Platform after any modifications signifies acceptance of the revised Terms. Users are encouraged to review these Terms periodically.</Text>
            </Box>

            <Box mt={6} className="section-container">
                 <Text
                      fontSize={"xl"}
                      color={"var(--peach)"}
                      fontWeight={"semibold"}
                      lineHeight="2.5"
                 >
                      16. Contact Us
                 </Text>
                 <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">For any questions or concerns regarding these Terms, please contact us at: AlterBuddy</Text>
                 <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">F-801/02, Whispering Palms xx_clusive, Lokhandwala Complex, Kandivali East, Mumbai - 400101, Maharashtra, India</Text>
                 <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">Email: cheer@alterbuddy.com</Text>
                 <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">Website: <a href="https://alterbuddy.com/"><Box as="span" color={'blue.600'}>https://alterbuddy.com/</Box></a></Text>
            </Box>
          
       </Box>
    </>
  );
}

export default Index;
