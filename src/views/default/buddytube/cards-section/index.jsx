// Import Chakra UI components
import { Box, Card, Flex, Grid, Image, Text } from '@chakra-ui/react';

// Import images
import bgwellness from "../../../../assets/new-images/images/bg-wellness.png";

const CardSection = ({ data }) => {


    return (
        <Box  bgRepeat={'no-repeat'} bgSize={'cover'}
            bgPosition={'center'} className='section-container' pb={16}>

            <Box mt={12}>


                <Grid justifyContent={'center'} alignItems={'center'} templateColumns={{
                    base: '1fr', // 1 column for base (smallest screens, mobile)
                    sm: '1fr 1fr', // 2 columns for small screens (tablets)
                    md: 'repeat(3,1fr)', // 3 columns for medium screens
                    lg: 'repeat(3,1fr)', // 3 columns for large screens
                }} gap={6}>
                    {data?.row1.map((item, index) => (
                        <Box p={{ base: 0, md: 1 }} key={index}>
                            <Card  p={{ base: 3, md: 3, lg: 5 }} rounded={20}
                                bgGradient={'linear-gradient(0deg, rgba(216,101,112,0.5237744756105567) 0%, rgba(255,255,255,1) 100%)'}
                            >
                                <Image borderRadius={'20px'} src={item.img}/>
                                <Text mt={5} textAlign={'left'} fontSize={'24px'} fontWeight={500} color={'#000000'}>{item.title}</Text>
                                <Text mt={'20px'} textAlign={'left'} noOfLines={6} fontSize={'20px'} fontWeight={'400'} color={'#454C52'}>{item.content}</Text>

                            </Card>
                        </Box>
                    ))}
                </Grid>

            </Box>
        </Box>
    )
}

export default CardSection;
