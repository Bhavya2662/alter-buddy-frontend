import { Box } from '@chakra-ui/react';
import React from 'react'
import HeroSectionBuddy from './herosection';
import Sec1BuddyTube from './section1-buddytube';
import CardSection from './cards-section';
import buddyCard1 from '../../../assets/final-image/images/buddy-card-img1.png'
import buddyCard2 from '../../../assets/final-image/images/buddy-card-img2.png'
import buddyCard3 from '../../../assets/final-image/images/buddy-card-img3.png'
import buddyCard4 from '../../../assets/final-image/images/buddy-card-img4.png'
import buddyCard5 from '../../../assets/final-image/images/buddy-card-img5.png'
import buddyCard6 from '../../../assets/final-image/images/buddy-card-img6.png'

const data = {
  row1: [
      {
          title: "Emotional Check-ins",
          img: buddyCard1,
          content: "Take a few minutes daily to pause, breathe, and ask yourself how you're really feeling. Awareness is the first step toward healing."
      },
      {
          title: "Talk It Out",
          img: buddyCard2,
          content: "Don’t bottle it up. Whether with a friend, therapist, or journal, expressing emotions helps reduce mental strain and gain clarity."
      },
      {
          title: "Practice Self-Compassion",
          img: buddyCard3,
          content: "Be kind to yourself during tough times. Progress isn't always linear, and you're doing better than you think."
      },
      {
          title: "Ground Yourself Mindfully",
          img: buddyCard4,
          content: "Engage in mindfulness exercises like deep breathing, guided meditations, or grounding techniques to reduce anxiety and stay present."
      },
      {
          title: "Move Your Body",
          img: buddyCard5,
          content: "Regular physical activity, even a short walk, can boost mood, reduce stress, and support your emotional balance."
      },
      {
          title: "Take Digital Breaks",
          img: buddyCard6,
          content: "Set healthy boundaries with screens. Step away to recharge your mind, reconnect with nature, or enjoy simple offline moments."
      },
  ],
  
}

const BuddyTube = () => {
  return (
    <Box className='main-container'>
      <HeroSectionBuddy/>
      <Sec1BuddyTube/>
    </Box>
  )
}

export default BuddyTube;
