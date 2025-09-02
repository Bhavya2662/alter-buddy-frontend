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


const RefundPolicy = () => {
     return (
          <Box className="main-container" >
            
               <Box className="section-container" pt={{ base: 14, md: 12, lg: 12 }}>
                    <Text
                         color={"var(--peach)"}
                         className="heading"
                    >
                         Refund Policy
                    </Text>
                    <Text color={"black"} fontSize={"lg"} fontWeight={600} mt={2}>
                    Last Updated: 13th April, 2025
                    </Text>
                    <Divider mt={8} />
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                    Welcome to AlterBuddy. We value your experience on our platform and strive to provide a fair and transparent process in all our dealings, including refunds. This Refund Policy outlines the terms and conditions under which refunds may be issued for our services and merchandise.
                    </Text>
               </Box>

          
               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         1. General Information
                    </Text>
                    <UnorderedList>
                         <ListItem>Company Name: AlterBuddy</ListItem>
                         <ListItem>Website: <a href="https://alterbuddy.com/"><Box as="span" color={'blue.600'}>https://alterbuddy.com/</Box></a>
                         </ListItem>
                         <ListItem>Address: F-801/02, Whispering Palms xx_clusive, Lokhandwala Complex, Kandivali East, Mumbai - 400101, Maharashtra, India</ListItem>
                         <ListItem>Contact Email: cheer@alterbuddy.com</ListItem>
                    </UnorderedList>
               </Box>

               <Box mt={6} className="section-container">
               <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                        2. Scope of the Policy
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                    This Refund Policy applies to the following services and offerings on the AlterBuddy platform:
                    </Text>
                    <UnorderedList>
                         <ListItem>Consultations with Certified Psychologists, Coaches, Counsellors, Dating Coaches, etc.</ListItem>
                         <ListItem>Sessions with Self-Claimed Practitioners</ListItem>
                         <ListItem>Subscription plans for accessing professionals</ListItem>
                         <ListItem>One-time services like “Vent it Out” and Manifestation sessions</ListItem>
                         <ListItem>Merchandise purchases from our online store</ListItem>
                    </UnorderedList> 
               </Box>
               
               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         3. Refund Policy for Services
                    </Text>
                    <Text fontSize={'lg'} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                    3.1 Consultations & Sessions (Psychologists, Coaches, Counsellors, Self-Claimed Practitioners, Dating Coaches)
                    </Text>
                    <UnorderedList>
                         <ListItem>Session Not Delivered: If a session was booked and paid for but not delivered due to the non-availability of professional or technical issues from AlterBuddy’s end, a full refund will be issued upon request.</ListItem>
                         <ListItem>Late or Missed Sessions: If the practitioner fails to join the session within 5 minutes of the scheduled time and the session does not proceed, a full refund or reschedule option will be provided.</ListItem>
                         <ListItem>User Cancellations:
                            <Text>○ Before 24 Hours: Full refund if the session is cancelled by the user at least 24 hours before the scheduled time.</Text>
                            <Text>○ Within 24 Hours: No refund. However, one rescheduling attempt may be allowed (subject to practitioner availability).</Text>
                         </ListItem>
                         <ListItem>Practitioner Cancellations: If the practitioner cancels the session for any reason, users will have the option to either reschedule or receive a full refund.</ListItem>
                         <ListItem>Unsatisfactory Experience: If you are dissatisfied with your first session and believe that the service quality was poor, you may raise a refund request within 24 hours of the session's completion. AlterBuddy will evaluate such requests on a case-by-case basis. You can also select another coach/consultant as per your need.</ListItem>
                    </UnorderedList>
                    <Text fontSize={'lg'} mt={2} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                    3.2 Subscription Plans
                    </Text>
                    <UnorderedList>
                         <ListItem>Subscription fees for accessing professionals on the platform are non-refundable once the subscription begins.</ListItem>
                         <ListItem>In case of any billing error or accidental charge, please contact us within 7 days of the transaction.</ListItem>
                         <ListItem>Users may cancel future renewals of subscriptions anytime, but ongoing or current subscription cycles will not be refunded.</ListItem>
                    </UnorderedList>
                    <Text fontSize={'lg'} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                    3.3 Special Services (e.g., “Vent it Out”, Manifestation, Healing)
                    </Text>
                    <UnorderedList>
                         <ListItem>Due to the subjective and experience-based nature of these services, no refunds will be processed once the service is rendered.</ListItem>
                         <ListItem>If the service was not delivered due to a technical error or non-availability of the facilitator, users will be eligible for a reschedule or refund.</ListItem>
                    </UnorderedList>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         4. Refund Policy for Merchandise
                    </Text>
                    <UnorderedList>
                    <ListItem>Returns Eligibility:
                            <Text>○ Users may initiate a return request within 7 days of receiving the merchandise if the product is damaged, defective, or not as described.</Text>
                            <Text>○ Products must be unused, in original packaging, and accompanied by proof of purchase.</Text>
                         </ListItem>
                         <ListItem>Refund Process:
                            <Text>○ Once the returned product is received and inspected, the refund will be processed to the original payment method within 7–10 business days.</Text>
                            <Text>○ Refunds are not applicable for items that are used, damaged after delivery, or without a valid reason for return.</Text>
                         </ListItem>
                         <ListItem>Shipping Charges:
                            <Text>○ Refunds will not include original shipping charges unless the return is due to a mistake on our part (e.g., wrong or defective item).</Text>
                         </ListItem>
                         <ListItem>Non-Returnable Items:
                            <Text>○ Certain items such as intimate goods, customized products, or items marked as "Final Sale" are not eligible for return or refund.</Text>
                            
                         </ListItem>
                         </UnorderedList>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         5. Refund Processing Timeline
                    </Text>
                    <UnorderedList>
                         <ListItem>Approved refunds will be initiated within 5–7 business days of confirmation.</ListItem>
                         <ListItem>The amount may take 7–10 additional business days to reflect in your account depending on your bank or payment provider.</ListItem>
                    </UnorderedList>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         6. How to Request a Refund
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">To request a refund, please email us at cheer@alterbuddy.com with the following details:</Text>
                    <UnorderedList>
                         <ListItem>Full Name</ListItem>
                         <ListItem>Registered Email Address / Mobile Number</ListItem>
                         <ListItem>Order ID or Booking ID</ListItem>
                         <ListItem>Date of Transaction</ListItem>
                         <ListItem>Reason for Refund Request</ListItem>
                         <ListItem>Any Supporting Evidence (Screenshots, Payment Receipts, Screenshots of UPI payment, etc.)</ListItem>
                    </UnorderedList>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         7. Dispute Resolution
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">In the event of a dispute related to services or payments, AlterBuddy reserves the right to investigate and make a final decision on refund eligibility. We encourage all users to maintain respectful communication throughout this process.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         8. Policy Updates
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">AlterBuddy reserves the right to modify this Refund Policy at any time. Any changes will be posted on this page with an updated effective date.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">We recommend users to review this page periodically to stay informed about our refund practices.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         9. Need Help?
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">For questions about refunds, please write to us at cheer@alterbuddy.com and our support team will be happy to assist you.</Text>
               </Box>
             
          </Box>
     );
}

export default RefundPolicy;

