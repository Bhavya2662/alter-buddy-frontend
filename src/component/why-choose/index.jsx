// Chakra UI Components
import { Box, Card, Text, Grid } from '@chakra-ui/react';
const Index = () => {
    const data = [
        {
            title: "Personalised Support",
            desc: "Our team offers 1 on 1 tailored guidance and support to address your unique needs and goals.",
            color: 'yellow',
        },
        {
            title: "Holistic Approach",
            desc: "From mental wellness to manifestation and healing, we provide comprehensive services to nurture your mind, body, and spirit",
            color: 'almond',
        },
        {
            title: "Your Safe Space",
            desc: "Feel heard, understood, and supported in a judgment-free environment where you can explore, heal, and transform.",
            color: 'green',
        },
    ]
    return (
        <Box width={'100%'} >

            <Text textAlign={'center'} className='heading' mt={4} color={'black'}>Why choose us?</Text>
            <Text className='paragraph' width={{ base: '100%', md: '70%' }} m={'auto'} textAlign={'center'} mt={4} color={'#64748B'}>
                At AlterBuddy, we recognize the significance of fostering a positive mindset and nurturing mental well-being. That's why we offer trusted buddies who are equipped to navigate through any obstacles with you
            </Text>

            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={6} mt={10}>
                {data.map((item, index) => (
                    <Card key={index} p={5} rounded={12} bgColor={
                        item.color === "yellow"
                            ? "#FEF0C3"
                            : item.color === "green"
                                ? "#DFF7EA"
                                : item.color === "almond"
                                    ? "#FEE6DC"
                                    : "white"
                    }>
                        <Text fontSize={{ base: '18px', md: '24px' }} fontWeight={600} color={'#1D2B4F'}>{item.title}</Text>
                        <Text mt={4} className='paragraph' color={'#636E88'}>{item.desc}</Text>
                    </Card>
                ))}
            </Grid>
        </Box>
    );
};
export default Index;
