// Chakra UI Components
import {
     Box,
     Text,
     UnorderedList,
     ListItem,
     Divider,
     List,
     Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

// Custom Components
import Navbar from "../../../component/navbar";
import Footer from "../../../component/footer";
import { Link } from "react-router-dom";


const ShippingPolicy = () => {
     return (
          <Box className="main-container" >
            
               <Box className="section-container" pt={{ base: 14, md: 12, lg: 12 }}>
                    <Text
                         color={"var(--peach)"}
                         className="heading"
                    >
                         Shipping Policy
                    </Text>
                    <Text color={"black"} fontSize={"lg"} fontWeight={600} mt={2}>
                    Effective Date: 13th April, 2025
                    </Text>
                    <Text color={"black"} fontSize={"lg"} fontWeight={600} mt={2}>
                    Last Updated: 13th April, 2025
                    </Text>
                    <Divider mt={8} />
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                    Welcome to AlterBuddy! We’re delighted to offer a selection of merchandise designed to support your wellness journey alongside our professional mental health services. Please read our Shipping Policy carefully to understand how we process and deliver orders placed through our platform.
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
                         1. General Information
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                    All orders are subject to product availability. We make every effort to maintain accurate stock counts on our website, but there may be a rare occurrence of a stock discrepancy. In such cases, we will contact you to discuss alternative options or issue a refund for the unavailable item.
                    </Text>
               </Box>

               <Box mt={6} className="section-container">
               <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         2. Shipping Coverage
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                    Currently, we ship across India only. Orders cannot be shipped to international destinations at this time.
                    </Text>
               </Box>
               
               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         3. Order Processing Time
                    </Text>
                    <UnorderedList>
                         <ListItem>Processing Time: Orders are typically processed within 1-3 business days from the date of purchase.</ListItem>
                         <ListItem>Orders placed on weekends or public holidays will be processed on the next working day.</ListItem>
                         <ListItem>Once processed, the order is handed over to our delivery partners for shipment.</ListItem>
                    </UnorderedList>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                        4. Shipping Methods and Delivery Timelines
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                    We partner with reliable courier services to ensure timely and safe delivery. The estimated delivery time depends on your location:
                    </Text>
                    <Box width={{ base: "100%", md: "70%", lg:"50%" }} p={4}>
      <TableContainer border="1px" borderColor="gray.200" borderRadius="md">
        <Table variant="simple">
          <Thead bg={"#f3919b"}>
            <Tr>
              <Th>Location Type</Th>
              <Th>Estimated Delivery Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Metro Cities</Td>
              <Td>3 – 5 business days</Td>
            </Tr>
            <Tr>
              <Td>Tier 2 &amp; Tier 3 Cities</Td>
              <Td>4 – 7 business days</Td>
            </Tr>
            <Tr>
              <Td>Remote/Rural Areas</Td>
              <Td>5 – 10 business days</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
    Note: Delivery timelines are estimates and may vary due to external factors such as public holidays, weather conditions, courier delays, or unforeseen events.
                    </Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         5. Shipping Charges
                    </Text>
                    <UnorderedList>
                         <ListItem>Standard Shipping: We offer flat-rate shipping of ₹49 on all orders below ₹999.</ListItem>
                         <ListItem>Free Shipping: Available on orders worth ₹999 or more (cart value after applying discounts, if any).</ListItem>
                         <ListItem>Any promotional offers on shipping will be clearly mentioned on the website during the offer period.</ListItem>
                    </UnorderedList>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         6. Tracking Your Order
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">Once your order is shipped, you will receive an email and/or SMS with your tracking number and a link to track your shipment in real-time. You can also access your order status by logging into your AlterBuddy account.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         7. Order Delivery Issues
                    </Text>
                    <Text fontSize={'lg'} mt={2} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                    Delayed Deliveries:
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">If your order has not arrived within the estimated delivery time, please wait an additional 2 business days. If it still hasn’t arrived, reach out to us at cheer@alterbuddy.com with your order number and registered email/phone number.</Text>

                    <Text fontSize={'lg'} mt={2} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                    Incorrect Address:
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">If an incorrect or incomplete shipping address is provided, delivery may be delayed or fail. AlterBuddy is not responsible for undelivered packages due to incorrect address details. Please ensure all address and contact information is accurate at the time of checkout.</Text>
                    
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         8. Damaged or Missing Items
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">If your package arrives damaged or items are missing, please notify us within 48 hours of receiving your order by writing to cheer@alterbuddy.com with:</Text>
                    <UnorderedList>
                                             <ListItem>Order Number</ListItem>
                                             <ListItem>Photos of the damaged packaging and items</ListItem>
                                             <ListItem>Description of the issue</ListItem>
                                             
                                        </UnorderedList>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">We will review and offer a suitable resolution, which may include a replacement, store credit, or refund.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         9. Delivery Partners
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">We work with trusted third-party logistics partners such as Delhivery, Bluedart, Shiprocket, DTDC, and others for seamless delivery. However, in some locations, local couriers may be used for final-mile delivery.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         10. Shipping Restrictions
                    </Text>
                    <UnorderedList>
                         <ListItem>We do not currently support delivery to PO Boxes, Army Post Office (APO), or Fleet Post Office (FPO) addresses.</ListItem>
                         <ListItem>Perishable or restricted items (if any introduced in future) will be governed by applicable local and national regulations.</ListItem>
                    </UnorderedList>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         11. Change of Delivery Address
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">If you need to change the delivery address after placing your order, please contact us within 12 hours of placing the order. Once the order is shipped, address changes cannot be guaranteed.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                        12. Cancellation of Shipped Orders
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">Orders cannot be canceled once they are shipped. If you still wish to return the product after delivery, please refer to our Return & Refund Policy for detailed information on returns and eligibility.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         13. Contact Us
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">For any shipping-related queries, please contact us at:</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">Email: cheer@alterbuddy.com</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="1.5">Address: </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="1.5">AlterBuddy </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="1.5">F-801/02, Whispering Palms xx_clusive, Lokhandwala Complex, Kandivali East, Mumbai - 400101, Maharashtra, India</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">Website: <a href="https://alterbuddy.com/"><Box as="span" color={'blue.600'}>https://alterbuddy.com/</Box></a></Text>
                    <Divider mt={8} />
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">We appreciate your support and understanding as we strive to deliver a smooth and satisfying experience to you. Your well-being is at the heart of everything we do.</Text>
               </Box>
             
          </Box>
     );
}

export default ShippingPolicy;

