// Import Chakra UI components
import { Box, Card, Flex, Grid, Text } from '@chakra-ui/react';

// Import images
import bgwellness from "../../../../../../assets/new-images/images/bg-wellness.png";

const Index = ({ Mainheading, Mainpara, data }) => {


    return (
        <Box backgroundImage={bgwellness} bgRepeat={'no-repeat'} bgSize={'cover'}
            bgPosition={'center'} className='section-container' py={16}>
            <Flex justifyContent={'center'} flexDirection={{ base: 'column', md: 'column', lg: 'row' }} gap={6}>
                <Text width={{ base: '100%', md: '100%', lg: '50%' }} color={'#D86570'} className='heading'>{Mainheading}</Text>
                <Text width={{ base: '100%', md: '100%', lg: '50%' }} fontSize={'20px'} fontWeight={'400'} className='paragraph'>{Mainpara}</Text>
            </Flex>

            <Box mt={12}>

<Text fontSize={'25px'} mb={8} fontWeight={700} >OUR METHODOLOGIES:</Text>
                <Grid justifyContent={'center'} alignItems={'center'} templateColumns={{
                    base: '1fr', // 1 column for base (smallest screens, mobile)
                    sm: '1fr 1fr', // 2 columns for small screens (tablets)
                    md: 'repeat(3,1fr)', // 3 columns for medium screens
                    lg: 'repeat(3,1fr)', // 3 columns for large screens
                }} gap={6}>
                    {data?.row1.map((item, index) => (
                        <Box p={{ base: 0, md: 1 }} key={index}>
                            <Card height={'300px'} p={{ base: 3, md: 3, lg: 7 }} rounded={20}
                                bgGradient={'linear-gradient(0deg, rgba(216,101,112,0.5237744756105567) 0%, rgba(255,255,255,1) 100%)'}
                            >
                                <Text textAlign={'left'} fontSize={'24px'} fontWeight={500} color={'#000000'}>{item.title}</Text>
                                <Text mt={'20px'} textAlign={'left'} noOfLines={6} fontSize={'20px'} fontWeight={'400'} color={'#454C52'}>{item.content}</Text>

                            </Card>
                        </Box>
                    ))}
                </Grid>

                <Flex flexDirection={{ base: 'column', md: 'row' }} gap={6} justifyContent={'center'} mt={6}>
                    {data?.row2 && data?.row2.map((item, index) => (
                        <Box p={{ base: 0, md: 1 }} key={index} width={{ base: '100%', md: "250px", lg: '450px' }}>
                            <Card height={'300px'} p={{ base: 3, md: 3, lg: 7 }} rounded={20}
                                bgGradient={'linear-gradient(0deg, rgba(216,101,112,0.5237744756105567) 0%, rgba(255,255,255,1) 100%)'}
                            >
                                <Text textAlign={'left'} fontSize={'22px'} fontWeight={500} color={'#000000'}>{item.title}</Text>
                                <Text mt={'20px'} textAlign={'left'} noOfLines={6} fontSize={'20px'} fontWeight={'400'} color={'#454C52'}>{item.content}</Text>

                            </Card>
                        </Box>
                    ))}
                </Flex>
            </Box>
        </Box>
    )
}

export default Index
