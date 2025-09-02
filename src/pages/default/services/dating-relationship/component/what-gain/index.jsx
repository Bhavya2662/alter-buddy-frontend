import { Box, Flex, Image, Text } from "@chakra-ui/react";

import { FaRegCircleCheck } from "react-icons/fa6";


const WhatYouGain = ({gainList, gainImg, heading, para1, para2, para3}) =>{
    return(
        <Box>
  <Box className="section-container" pt={{ base: 10, md: 16 }} pb={12}>
                <Flex gap={{base:6, md:10}} justifyContent={'space-between'} 
                alignItems={'center'}
                flexDirection={{base:'column-reverse', md:'row'}}>
                      <Box width={{base:'100%', md:'50%', lg:'40%'}}>
                        <Image src={gainImg} alt="sec2Img" w={'100%'} h={'100%'} maxH={'600px'}/>
                    </Box>
                    <Box width={{base:'100%', md:'50%'}}>
                      <Text  className='heading' color={'var(--peach)'}>{heading}</Text>
                   
                   <Box pt={4}>
                    {gainList.map((list, index)=>(
                        <Flex key={index} mt={4} alignItems={'start'} gap={4}>
                            <Box color={'var(--peach)'} pt={1}><FaRegCircleCheck/></Box>
                            <Text fontSize={'22px'} className="paragraph">{list}</Text>
                        </Flex>
                        
                    ))}
                   </Box>
                    <Text mt={6} fontSize={'21px'} className="paragraph">{para1}</Text>
                   <Text mt={4} fontSize={'21px'} className="paragraph">{para2}</Text>
                   <Text mt={4} fontSize={'21px'} className="paragraph">{para3}</Text> 

                    </Box>
                  
                </Flex>

            </Box>
        </Box>
    )
}
export default WhatYouGain;