import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react"
import { useAuthenticationSlice } from "../../redux/features";
import { Link, useNavigate } from 'react-router-dom';
const Solution = ({tags, heading, paragraph,buttonContent}) =>{
    const navigate = useNavigate();
      const { authentication } = useAuthenticationSlice();
    return(
        <Box bgGradient={'linear-gradient(214.76deg, rgba(255, 255, 255, 0.6) 26.07%, rgba(216, 101, 112, 0.06) 79.52%)'}>
          <Box className="section-container" py={12}>
          <Text className="heading" color={'var(--peach)'}>{heading}</Text>
            <Text mt={4} fontSize={'19px'} className="paragraph">{paragraph}</Text> 
                <center>
                    <Button bg={'var(--peach)'} mt={6} color={'white'} w={'fit-content'} px={10} colorScheme='' py={6} rounded={6} fontWeight={500} fontSize={'18px'}>{buttonContent}</Button>
                </center>

                <Box mt={10}>
                    <Grid templateColumns={{base:'repeat(1, 1fr)', md:'repeat(5, 1fr)'}} gap={5} justifyContent={'center'}>
                        {tags.row1.map((list, index)=>(
                         <Button key={index} border={'2px solid var(--peach)'} rounded={'full'} py={{base:3, md:4}} bg={'var(--lightpeach)'} px={4}
                          whiteSpace={'wrap'} fontSize={'16px'} h={'auto'} colorScheme="" color={'var(--peach)'}>{list}</Button>
                        ))}
                    </Grid>
                    <Grid templateColumns={{base:'repeat(1, 1fr)', md:'repeat(4, 1fr)'}} gap={5}  w={{base:'100%', md:'80%'}} mx={'auto'} mt={6}>
                        {tags.row2.map((list, index)=>(
                         <Button key={index} border={'2px solid var(--peach)'}h={'auto'} colorScheme="" color={'var(--peach)'} rounded={'full'} py={4} bg={'var(--lightpeach)'} px={4} whiteSpace={'wrap'} fontSize={'16px'}>{list}</Button>
                        ))}
                    </Grid>
                    <Flex gap={5} justifyContent={'center'}  w={{base:'100%', md:'80%'}} mx={'auto'} mt={6} flexDirection={{base:'column', md:'row'}}>
                        {tags.row3.map((list, index)=>(
                         <Button key={index} border={'2px solid var(--peach)'} h={'auto'} colorScheme="" color={'var(--peach)'} rounded={'full'} py={4} bg={'var(--lightpeach)'} px={4} whiteSpace={'wrap'} fontSize={'16px'}>{list}</Button>
                        ))}
                    </Flex>
                </Box>
          </Box>
          <Flex justifyContent={'center'} alignItems={'center'}>
          <Button mb={{ base: 6, md: 4, lg: 10 }} bg={'var(--peach)'} color={'white'}
                     px={8}     py={{ base: 6, md: 6, lg: 7 }} rounded={'full'}
                          fontWeight={600} fontSize={{ base: '16px', md: '16px', lg: '18px' }} onClick={() => {
                            if(!authentication){
                              navigate('/sign-in')
          
                            }else{
                              navigate('/mentor/list')
          
                            }
                          }}   colorScheme=''>TALK TO US NOW</Button>
          </Flex>
        </Box>
    )
}
 export default Solution;