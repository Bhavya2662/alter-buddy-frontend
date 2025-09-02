// Chakra UI Components
import {
    Box,
    Flex,
    Image,
    Text
  } from '@chakra-ui/react';
  
  // Assets
  import aboutImg from "../../../../../assets/new-images/images/about-2.png";
  import aboutImg2 from "../../../../../assets/new-images/images/about-3.png";
  import aboutImg3 from "../../../../../assets/new-images/images/about-4.png";
  

const AboutUsTeam = () => {
    const aboutData = ["Better relationships", "Better health", "Better career", "Better inflow of money", "Anxiety", "Depression", "Stress"]

    return (
        <Box >
            {/* first */}
            <Flex py={20} alignItems={'center'} justifyContent={'space-between'} gap={10} 
                direction={{ base: 'column-reverse', md: 'row' }}
            >
                <Box width={{ base: '100%', md: '45%' }}>
                    <Image src={aboutImg} alt='heroImage' width={'90%'} h={'60%'} maxWidth={'600px'} />
                </Box>
                <Box width={{ base: '100%', md: '55%' }} mb={2}>

                    <Text mt={{ base: 6, md: 6, lg: 6 }} color={'black'} className='heading' >
                        Thought That <span style={{ color: 'var(--peach)' }}>Started It</span>
                    </Text>
                    <Text mt={{ base: 6, md: 6, lg: 8 }} width={{ base: '100%', md: '90%' }} className='paragraph' color={'var(--grey)'}>
                        In all human history, we have never lived better in terms of creature comforts, medical care, connectivity tools, human rights and world peace. However, never, have we been so devoid of close-knit relationships, human to human connection and deep immersive experiences. The bane of our existence today is that as our physical existence has steadily improved, our mental existence has not been able to keep pace.
                    </Text>
                    <Text mt={{ base: 4, md: 4, lg: 4 }} width={{ base: '100%', md: '90%' }} className='paragraph' color={'var(--grey)'}>
                        In all human history, we have never lived better in terms of creature comforts, medical care, connectivity tools, human rights and world peace. However, never, have we been so devoid of close-knit relationships, human to human connection and deep immersive experiences. The bane of our existence today is that as our physical existence has steadily improved, our mental existence has not been able to keep pace.                                      </Text>


                </Box>


            </Flex>

            {/* second */}

            <Flex py={20} alignItems={'center'} justifyContent={'space-between'} gap={10}
                direction={{ base: 'column', md: 'row' }}
            >

                <Box width={{ base: '100%', md: '55%' }} mb={2}>

                    <Text mt={{ base: 6, md: 6, lg: 6 }} color={'black'} className='heading' >
                        Problems That  <span style={{ color: 'var(--peach)' }}>We Want To Solve</span>
                    </Text>
                    <Text mt={{ base: 6, md: 6, lg: 8 }} width={{ base: '100%', md: '90%' }} className='paragraph' color={'var(--grey)'}>
                        Lack of Awareness – mental health is not synonymous with labelled psychiatric illnesses. Feeling lonely, empty, frustrated, overwhelmed and unhappy without a reason are also mental health issues that can be resolved with talk therapy.
                    </Text>
                    <Text mt={{ base: 4, md: 4, lg: 4 }} width={{ base: '100%', md: '90%' }} className='paragraph' color={'var(--grey)'}>
                        Unstructured Ecosystem – system does not emphasize enough on the potential benefits of talk therapy. No platform is able connect enough trained counsellors to all the people in need of therapy.
                        <br />
                        Lack of Access – affordable talk therapy in a safe environment is not available everywhere.
                    </Text>

                </Box>
                <Box width={{ base: '100%', md: '45%' }}>
                    <Image src={aboutImg2} alt='heroImage' width={'90%'} h={'55%'} maxWidth={'600px'} />
                </Box>

            </Flex>

            {/* third */}
            <Flex py={20} alignItems={'center'} justifyContent={'space-between'} gap={10}
                direction={{ base: 'column-reverse', md: 'row' }}
            >
                <Box rounded={'20px'} width={{ base: '100%', md: '45%' }}>
                    <Image rounded={'30px'} src={aboutImg3} alt='heroImage' width={'90%'} h={'60%'} maxWidth={'600px'} />
                </Box>
                <Box width={{ base: '100%', md: '55%' }} mb={2}>

                    <Text mt={{ base: 6, md: 6, lg: 6 }} color={'black'} className='heading' >
                        Solution That  <span style={{ color: 'var(--peach)' }}>We Have Designed</span>
                    </Text>
                    <Text mt={{ base: 6, md: 6, lg: 8 }} width={{ base: '100%', md: '90%' }} className='paragraph' color={'var(--grey)'}>
                        In all human history, we have never lived better in terms of creature comforts, medical care, connectivity tools, human rights and world peace. However, never, have we been so devoid of close-knit relationships, human to human connection and deep immersive experiences. The bane of our existence today is that as our physical existence has steadily improved, our mental existence has not been able to keep pace.
                    </Text>
                    <Text mt={{ base: 4, md: 4, lg: 4 }} width={{ base: '100%', md: '90%' }} className='paragraph' color={'var(--grey)'}>
                        Our flight or fight mechanisms and tribal orientation evolved to survive the Savannah – not the metropolitan life. Rat race, sensory overload and emotional isolation wreak havoc on our mental health. While longer life spans and physically comfortable lives are being focused on in the world, we want to optimise for enhanced mental wellbeing for maximum people.
                    </Text>

                </Box>


            </Flex>
        </Box>
    )
}
export default AboutUsTeam;