import { Box, Button, Card, Flex, Image, Text, Grid } from '@chakra-ui/react';

import serviceImg1 from "../../../assets/new-images/images/mudit.png";
import serviceImg2 from "../../../assets/new-images/images/ramandeep.png";
import serviceImg3 from "../../../assets/new-images/images/priyanka.png";
import { useNavigate } from 'react-router-dom';
import { useGetAllCategoryQuery, useGetMentorsListQuery } from '../../../redux/rtk-api';
import { useAppDispatch } from '../../../redux';
import { useEffect } from 'react';
import { handleError } from '../../../redux/features';

export const Coaches = ({ categoryId = null }) => {
    const navigate = useNavigate();
    const {
        data: category,
        isError: isCategoryError,
        error: categorError,
        isLoading: isCategoryLoading,
    } = useGetAllCategoryQuery();

    const {
        data: mentor,
        isError: isMentorError,
        isLoading: isMentorLoading,
        error: mentorError,
    } = useGetMentorsListQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isCategoryError) {
            if ((categorError).data) {
                dispatch(handleError((categorError).data.message));
            } else {
                console.log(categorError);
            }
        }
        if (isMentorError) {
            if ((mentorError).data) {
                dispatch(handleError((mentorError).data.message));
            } else {
                console.log(mentorError);
            }
        }
    }, [isCategoryError, categorError, isMentorError, mentorError, dispatch]);

    const services = [
        {
            img: serviceImg1,
            title: "Mudit Gambhir",
            education: "MSc in Clinical Psycology",
            specialization: "Specialization",
            location: "Anxiety, Stress, Depression, Relationship Issues, Couple Counseling , Sexual Issues, Suicidal Ideation, Sleep Issues",
            time: "March 24, 2025 5:00 PM",
        },
        {
            img: serviceImg3,
            title: "Ramandeep Kaur",
            education: "MSc in Clinical Psycology",
            specialization: "Specialization",
            location: "Anxiety, Stress, Depression, Relationship Issues, Couple Counseling , Sexual Issues, Suicidal Ideation, Sleep Issues",
            time: "March 24, 2025 5:00 PM",
        },
        {
            img: serviceImg2,
            title: "Priyanka Jaiswal",
            education: "MSc in Clinical Psycology",
            specialization: "Specialization",
            location: "Anxiety, Stress, Depression, Relationship Issues, Couple Counseling , Sexual Issues, Suicidal Ideation, Sleep Issues",
            time: "March 24, 2025 5:00 PM",
        },
        {
            img: serviceImg2,
            title: "Priyanka Jaiswal",
            education: "MSc in Clinical Psycology",
            specialization: "Specialization",
            location: "Anxiety, Stress, Depression, Relationship Issues, Couple Counseling , Sexual Issues, Suicidal Ideation, Sleep Issues",
            time: "March 24, 2025 5:00 PM",
        },
        {
            img: serviceImg2,
            title: "Priyanka Jaiswal",
            education: "MSc in Clinical Psycology",
            specialization: "Specialization",
            location: "Anxiety, Stress, Depression, Relationship Issues, Couple Counseling , Sexual Issues, Suicidal Ideation, Sleep Issues",
            time: "March 24, 2025 5:00 PM",
        },
        {
            img: serviceImg2,
            title: "Priyanka Jaiswal",
            education: "MSc in Clinical Psycology",
            specialization: "Specialization",
            location: "Anxiety, Stress, Depression, Relationship Issues, Couple Counseling , Sexual Issues, Suicidal Ideation, Sleep Issues",
            time: "March 24, 2025 5:00 PM",
        },

    ];

    return (
        <>
            {(mentor?.data.length) > 0 ?
                <Box paddingX={'70px'} paddingY={'40px'} width={'100%'}>


                    <Text textAlign={'center'} className='heading' mt={5} color={'black'}>Meet Mental Health Coaches</Text>
                    <Text fontSize={'18px'} fontWeight={400} width={{ base: '100%', md: '75%', lg: '55%' }} m={'auto'} textAlign={'center'} mt={4} color={'#636E88'}>
                        Talk to your buddy
                    </Text>
                    <Flex justifyContent={'end'}>
                        <Button border={'1px solid var(--peach)'} color={'black'} rounded={'full'} px={6} colorScheme='' onClick={() => navigate('/mentor/list')}>See all</Button>
                    </Flex>

                    <Box mt={8}>
                        <Grid templateColumns={{
                            base: '1fr', // 1 column for base (smallest screens, mobile)
                            sm: '1fr 1fr', // 2 columns for small screens (tablets)
                            md: '1fr 1fr', // 3 columns for medium screens
                            lg: '1fr 1fr 1fr ', // 3 columns for large screens
                        }} gap="6">
                            {mentor?.data.filter((item) => {
                                const matchesCategory = categoryId !== null && item.category.some((cat) => cat._id === categoryId);
                                return matchesCategory;
                            }).map((item, index) => (
                                <Box p={{ base: 0, md: 1 }} key={index}>
                                    <Card bgColor={'white'} border={'1px solid #CED2D6'} p={{ base: 3, md: 3, lg: 3 }} rounded={20}>
                                        <Flex flexDirection={{ base: 'column', md: 'row', lg: 'row' }}>
                                            <Image src={item.image} alt={item?.auth?.username} w={'60px'} h={'60px'} border={'2px solid #FE76A8'} rounded={'full'} />
                                            <Box marginLeft={{ base: '0px', md: '10px', lg: '10px' }} width={{ base: "full", md: "80%", lg: "80%" }}>
                                                <Text textAlign={'left'} fontSize={'22px'} fontWeight={500} color={'#000000'}>{item?.auth?.username}</Text>
                                                <Text textAlign={'left'} fontSize={'14px'} fontWeight={'400'} color={'#787887'}>{item.qualification}</Text>
                                                {
                                                    item?.specialists.length > 0 ?
                                                        <>
                                                            <Text fontSize={'14px'} fontWeight={'700'} marginTop={'8px'} color={'#414146'}>Specialization</Text>
                                                            <Text fontSize={'14px'} fontWeight={'400'} marginTop={'5px'} color={'#414146'}>{item?.specialists?.join(", ")}</Text>
                                                        </> : <></>
                                                }
                                                {
                                                    item?.languages.length > 0 ?
                                                        <>
                                                            <Text fontSize={'14px'} fontWeight={'700'} marginTop={'8px'} color={'#414146'}>Languages</Text>
                                                            <Text fontSize={'14px'} fontWeight={'400'} marginTop={'5px'} color={'#414146'}>{item?.languages?.join(", ")}</Text>

                                                        </> : <></>
                                                }

                                                <Flex gap={3} mt={4} flexDirection={{ base: 'column', md: 'column', lg: 'row' }} width={'100%'}>
                                                    <Button bg={'#EFF2F7'} color={'#000000'} fontWeight={'600'} colorScheme='' py={3} width={{ base: '100%', md: '100%', lg: '50%' }} px={7} rounded={'full'} onClick={() => navigate(`/user/mentor/details/${item._id}`)}>View Profile</Button>
                                                    <Button bg={'#D86570'} color={'white'} fontWeight={'600'} colorScheme='' py={3} width={{ base: '100%', md: '100%', lg: '50%' }} px={7} rounded={'full'} onClick={() => navigate(`/user/mentor/details/${item._id}`)}>Book Session</Button>
                                                </Flex>
                                            </Box>
                                        </Flex>
                                    </Card>
                                </Box>
                            ))}
                        </Grid>
                    </Box>
                </Box>
                : <></>
            }
        </>
    );
};
