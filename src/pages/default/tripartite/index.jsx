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


const TripartiteService = () => {
     return (
          <Box className="main-container" >
            
               <Box className="section-container" pt={{ base: 14, md: 12, lg: 12 }}>
                    <Text
                         color={"var(--peach)"}
                         className="heading"
                    >
                        TRI-PARTITE SERVICE AGREEMENT

                    </Text>
                    
                    <Divider my={8} />
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                    This Tri-Partite Agreement is entered between AlterBuddy,Consultant and its user hereinafter referred to as 'Client'.
                    </Text>
                   
               </Box>

               <Box mt={10} className="section-container">
               <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
               1. <Box as="span" fontWeight={600}>AlterBuddy</Box>, a firm having its principal place of business at F-801/802, Whispering Palms Xclusive, Lokhandwala Complex, Kandivali East, Mumbai – 400101, India (hereinafter referred to as the “Platform Provider” or “AlterBuddy”), which expression shall include its successors and permitted assigns; and
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                    2. <Box as="span" fontWeight={600}>CONSULTANT</Box>, an individual providing services across wellness, dating, relationship, finance, career, or any kind of guidance that is available on AlterBuddy Platform, registered with the Platform Provider, hereinafter referred to as the “Consultant” or “the Mentor”, which term shall include his/her legal representatives and assigns; and
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                    3. <Box as="span" fontWeight={600}>CLIENT</Box>, an individual availing services through the AlterBuddy platform, having email [Emaid Id], hereinafter referred to as the “Client”, which term shall include his/her legal heirs, successors, and assigns.
                    </Text>
                    <Text mt={10} color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                    Collectively referred to as the “Parties” and individually as a “Party”.
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
                         1. DEFINITIONS
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                    For the purpose of this Agreement, unless the context otherwise requires:
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">1.1 “Platform” shall mean the AlterBuddy digital ecosystem including its website, mobile applications, communication tools, client interface, back-end administration systems, and associated services.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">1.2 “Consultant Services” refers to any and all services including counseling, relationship & dating advice, healing, energy sessions, manifestation, and similar wellness services offered by the Consultant via the Platform.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">1.3 “Client” refers to the person availing the services via AlterBuddy, who acknowledges that such services are alternative, holistic in nature, and not a substitute for medical treatment.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">1.3A “Minimum Age Requirement” refers to the mandatory condition that any person registering as a Client on the Platform must be <Box as="span" fontWeight={600}>18 years of age or older</Box> on the date of registration or agreement execution. Persons under 18 are strictly prohibited from using the Platform.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">1.4 “Session” means any paid or complimentary interaction facilitated between a Consultant and Client, conducted via video, audio, chat, or physical medium.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">1.5 “Confidential Information” means all non-public, personal, business, technical, and sensitive information disclosed in the course of this Agreement.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">1.6 “Applicable Law” includes all statutes, rules, regulations, ordinances, notifications, orders, treaties, judgments having the force of law in India or any other jurisdiction as may apply to the Parties.</Text>
                   

               </Box>
               <Box mt={6} className="section-container">
               <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         2. PURPOSE AND OBJECT
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                    The Platform Provider facilitates a service interface to connect Clients with qualified and empanelled Consultants. This Agreement governs the terms, responsibilities, disclaimers, and liabilities among the three Parties for the service engagement.
                    </Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">
                    All parties mutually acknowledge that the Platform is not a healthcare provider or clinical service and assumes no liability for clinical or therapeutic outcomes.
                    </Text>
                    
               </Box>
               
               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         3. ROLES AND RESPONSIBILITIES
                    </Text>
                    
                    <Text fontSize={'lg'} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                    3.1 The Consultant shall:
                    </Text>
                    <UnorderedList styleType="lower-alpha">
                         <ListItem>Render services as listed in the Services Schedule with skill, integrity, and confidentiality.</ListItem>
                         <ListItem>Refrain from providing any diagnosis or medical treatment unless lawfully licensed.</ListItem>
                         <ListItem>Ensure technical readiness (e.g., audio/video, internet) and maintain professional decorum.</ListItem>
                         <ListItem>Refrain from offering guarantees or misleading claims.</ListItem>
                         <ListItem> Disclose all third-party affiliations and conflicts of interest.</ListItem>
                    </UnorderedList>

                    <Text fontSize={'lg'} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                    3.2 The Client shall:
                    </Text>
                    <UnorderedList styleType="lower-alpha">
                         <ListItem> Provide accurate information about their needs and confirm that they are 18 years of age or older at the time of registration.</ListItem>
                         <ListItem>Acknowledge and accept that the services are not a substitute for medical care.</ListItem>
                         <ListItem> Avoid soliciting the Consultant outside the Platform.</ListItem>
                         <ListItem>Raise any disputes or dissatisfaction through formal grievance channels only.</ListItem>
                    </UnorderedList>

                    <Text fontSize={'lg'} color={"var(--peach)"} lineHeight="2.5" fontWeight={"semibold"}>
                    3.3 The Platform Provider shall:
                    </Text>
                    <UnorderedList styleType="lower-alpha">
                         <ListItem> Offer a secure and moderated digital interface.</ListItem>
                         <ListItem>Enable scheduling, payment, and service recording.</ListItem>
                         <ListItem>Withhold any liability for service results or personal dissatisfaction.</ListItem>
                         <ListItem>Protect data and maintain compliance with applicable privacy laws.</ListItem>
                    </UnorderedList>
                   
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         4. SERVICE TERMS AND RECORDINGS
                    </Text>
                    
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">4.1 All services must be scheduled via the Platform and must comply with the quality and timing protocols notified by AlterBuddy.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">4.2 Sessions may be recorded (audio, video, chat) by AlterBuddy for quality assurance, legal compliance, dispute resolution, and training. Consent to such recording is deemed granted upon execution of this Agreement.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">4.3 Recorded content remains the sole property of AlterBuddy. The Consultant and Client shall not request, reuse, or circulate recorded sessions unless permitted in writing.</Text>
                    
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         5. FEES, PAYMENTS, AND TAXATION
                    </Text>
                    
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">5.1 Clients shall pay applicable service fees directly to AlterBuddy’s platform, as displayed during booking.</Text>
                    {/* <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">5.2 AlterBuddy shall retain 30% of total fees as facilitation and administrative charges, and remit the balance 70% to the Consultant on a monthly cycle subject to valid invoices, completed sessions, and tax compliance.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">5.3 All payments shall be made in INR or such currency as determined by AlterBuddy and subject to applicable taxation including GST, TDS, or foreign remittance tax.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">5.4 AlterBuddy may amend the fee structure or share ratio upon providing 30 days’ notice to the Consultant. The Notice for the same may be served to the Consultant in writing or communicated via mail.</Text> */}
                    
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         6. CONFIDENTIALITY AND PRIVACY
                    </Text>
                    
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">6.1 Each Party agrees to maintain strict confidentiality of all personal and sensitive information shared during or in connection with this Agreement.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">6.2 The Consultant shall not disclose any Client information for promotion, academic, commercial, or professional gain. Any breach will be deemed a material breach of contract.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">6.3 AlterBuddy shall use commercially reasonable efforts to protect Client and Consultant data under applicable Indian data privacy rules and global best practices.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">6.4 These obligations shall survive for 5 years post termination.</Text>
                    
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                         7. INTELLECTUAL PROPERTY
                    </Text>
                    
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">7.1 All content, techniques, documentation, session formats, and technological processes created or used on the Platform shall remain the intellectual property of AlterBuddy.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">7.2 Any IP created by the Consultant under this Agreement shall vest solely in AlterBuddy unless agreed otherwise in writing</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">7.3 Unauthorized use or replication of AlterBuddy’s methods, branding, platform structure, or session styles shall constitute infringement and trigger civil and criminal remedies.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                        8. NON-SOLICITATION AND NON-CIRCUMVENTION
                    </Text>
                    
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">8.1 The Consultant agrees not to approach, solicit, or deliver services to any Client of AlterBuddy outside the Platform, during the term and for 3 years after termination.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">8.2 The Client agrees not to engage or solicit services from any Consultant outside the Platform during the term and for 3 years thereafter.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">8.3 Any circumvention will lead to immediate legal action, Account Deletion, forfeiture of payments, and liability for damages including lost business, reputational loss, and legal fees for any of the parties committing it.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                        9. DISCLAIMERS AND LIMITATION OF LIABILITY
                    </Text>
                    
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">9.1 The services provided are alternative wellness techniques and do not constitute medical, psychological, or legal advice.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">9.2 AlterBuddy makes no warranties regarding the effectiveness or success of the services. Clients are encouraged to seek professional, licensed intervention for clinical conditions.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">9.3 AlterBuddy shall not be held liable for direct, indirect, consequential, emotional, reputational, or financial damages arising from services provided.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">9.4 This clause shall override any conflicting interpretation and survive termination.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">9.5 Any direct or indirect engagement between the Client and the Consultant (including but not limited to Buddies, Genies, Healers, Dating & Relationship Coach or any other service provider) outside the AlterBuddy platform is strictly prohibited. Such conduct shall be considered a material breach of this Agreement and may attract legal action, including but not limited to termination, blacklisting, and claims for damages. AlterBuddy shall bear no responsibility or liability for any outcomes arising from such off-platform interactions.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                        10. INDEMNITY
                    </Text>
                    
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">10.1 The Consultant shall indemnify and hold harmless AlterBuddy and the Client from and against all losses, damages, liabilities, costs, or claims arising from negligence, breach, misconduct, or violation of this Agreement.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">10.2 The Client shall indemnify and hold harmless AlterBuddy and the Consultant against damages or reputational loss due to misuse of services or false complaints.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">10.3 AlterBuddy shall not indemnify either Party under any circumstances except where legally mandated under non-excludable statutory law.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                        11. TERMINATION
                    </Text>
                    
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">11.1 This Agreement may be terminated by AlterBuddy immediately in the event of a material breach, misconduct, reputational damage, or any act that undermines the purpose or integrity of the Platform.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">11.2 The Client or Consultant may terminate this Agreement with 30 days' written notice to AlterBuddy. All dues and service records shall be reconciled before termination becomes effective.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">11.3 Termination shall not affect obligations related to confidentiality, indemnity, IP rights, and non-circumvention which shall survive for a period of 5 years post termination.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                        12. POST-TERMINATION DUTIES
                    </Text>
                    
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">12.1 Upon termination, the Consultant shall discontinue any representation or communication implying association with AlterBuddy.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">12.2 The Client shall refrain from making defamatory or disparaging remarks against the Platform, Consultant, or associated personnel.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">12.3 Both Parties shall return or delete any non-public data or proprietary content belonging to AlterBuddy.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                        13. FORCE MAJEURE
                    </Text>
                    
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">13.1 None of the Parties shall be liable for failure or delay in performance due to causes beyond their reasonable control including but not limited to acts of God, cyber attacks, government restrictions, epidemic, pandemic, or internet failure.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">13.2 The affected Party shall notify the others in writing within 7 days of such event and make reasonable efforts to resume normal obligations.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                        14. DISPUTE RESOLUTION AND GOVERNING LAW
                    </Text>
                    
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">14.1 This Agreement shall be governed by and construed in accordance with the laws of India.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">14.2 Any dispute shall be first attempted to be resolved through mutual negotiation. If unresolved within 15 days, the matter shall be referred to arbitration in accordance with the Arbitration and Conciliation Act, 1996. Seat of arbitration shall be Mumbai, India, and proceedings shall be in English.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">14.3 Where Clients or Consultant reside or operate from outside India, Indian law shall prevail to the fullest extent permissible, and jurisdiction shall remain with Mumbai courts.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                        15. ENTIRE AGREEMENT AND AMENDMENTS
                    </Text>
                    
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">15.1 This Agreement represents the entire understanding between the Parties and supersedes all prior discussions, representations or communications.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">15.2 No amendment shall be valid unless made in writing and signed by all three Parties.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">15.3 If any provision of this Agreement is held invalid or unenforceable, the remainder shall remain in full force.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                        16. EXECUTION AND SIGNATURES
                    </Text>
                    
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">IN WITNESS WHEREOF, the undersigned Parties have duly executed this Agreement on the day and year first above written.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                        17. CODE OF CONDUCT POLICY
                    </Text>
                    
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">17.1 The Consultant agrees to maintain a high standard of ethics and professionalism, including but not limited to:</Text>
                    <UnorderedList styleType="lower-alpha">
                         <ListItem>Punctuality and preparedness for scheduled sessions.</ListItem>
                         <ListItem>Respectful communication and non-discriminatory behavior toward Clients and the Platform Team.</ListItem>
                         <ListItem>Proper attire, neutral backgrounds, and a disturbance-free environment during sessions.</ListItem>
                         <ListItem>Refraining from providing any personal opinions or making inappropriate promises or guarantees.</ListItem>
                    </UnorderedList>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">17.2 AlterBuddy reserves the right to suspend or permanently de-list the Consultant upon receiving complaints or evidence of violation of this Code.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">17.3 If Client and Consultant build any kind of association outside the platform, then AlterBuddy will not be liable or responsible in a direct or indirect way for any kind of illegal or unethical losses.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                        18. CLIENT SATISFACTION AND REALLOCATION
                    </Text>
                    
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">18.1 In the event of a Client expressing dissatisfaction in good faith, AlterBuddy may conduct an internal review and reassign the Client to another Consultant without prejudice.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">18.2 The Consultant agrees to cooperate during such reviews and acknowledges that session recordings and feedback shall form the basis of resolution.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">18.3 Repeated Client complaints (3 or more) may result in suspension or termination of the Consultant’s association with AlterBuddy.</Text>
               </Box>

               <Box mt={6} className="section-container">
                    <Text
                         fontSize={"xl"}
                         color={"var(--peach)"}
                         fontWeight={"semibold"}
                         lineHeight="2.5"
                    >
                        19. LANGUAGE OF SERVICE
                    </Text>
                    
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">19.1 The Parties agree that the official language of this Agreement and related services shall be English.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">19.2 Services between the Consultant and Client shall be conducted in their preferred language.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">19.3 Any disputes or escalations shall be handled in English unless otherwise agreed in writing by all Parties.</Text>
                    <Text color={"#3A3F51"} fontSize={"md"} lineHeight="2.5">This Agreement may be executed in counterparts, each of which shall be deemed an original, and all of which together shall constitute one and the same instrument.</Text>
               </Box>
             
          </Box>
     );
}

export default TripartiteService;

