import React, { FC } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { AppButton } from "../../UI";
import { toast } from "react-toastify";
import { Box, Card, Image, Text, Badge, Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaUser, FaEdit } from "react-icons/fa";
import { useAuthenticationSlice } from "../../../redux/features";

// import buddyCard1 from '../../../assets/final-image/images/buddy-card-img1.png'
const buddyCard1 = '/src/assets/final-image/images/buddy-card-img1.png';

interface BlogCardProps {
  _id?: string;
  label: string;
  body: string;
  subLabel: string;
  createdAt: string;
  blogLink: string;
  featuredImage?: string;
  author?: string;
  readTime?: number;
  tags?: string[];
}

export const BlogCard: FC<BlogCardProps> = ({ 
  _id, 
  label, 
  subLabel, 
  blogLink, 
  featuredImage, 
  author, 
  readTime, 
  tags, 
  createdAt 
}) => {
  const navigate = useNavigate();
  const { authentication } = useAuthenticationSlice();
  return (
    // <div className="group flex flex-col items-start bg-white rounded-md hover:shadow-lg">
    //   <div className="w-full flex-1 p-3 rounded-b-lg">
    //     <div className="flex-row flex items-start justify-between">
    //       <div>
    //         <h5 className="group-hover:text-primary-500 text-xl capitalize  truncate">
    //           {label}
    //         </h5>
    //         <h6 className="text-gray-500 text-sm truncate">{subLabel}</h6>
    //       </div>
    //     </div>
    //     <div className="pt-3 flex items-center justify-end">
    //       <a href={blogLink} target="_blank" rel="noreferrer">
    //         <AppButton outlined>Read article</AppButton>
    //       </a>
    //       <button
    //         onClick={() => {
    //           const text = navigator.clipboard.writeText(blogLink);
    //           text
    //             .then(() => {
    //               toast.success("Link copied to clipboard");
    //             })
    //             .catch((err) => {
    //               toast.error("Something went wrong! please try again");
    //               console.log(err);
    //             });
    //         }}
    //         className="p-2"
    //       >
    //         <AiOutlineShareAlt size={30} />
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <Box p={{ base: 0, md: 1 }}>
      <Card 
        p={{ base: 3, md: 3, lg: 5 }} 
        rounded={20}
        bgGradient={'linear-gradient(0deg, rgba(216,101,112,0.5237744756105567) 0%, rgba(255,255,255,1) 100%)'}
        cursor="pointer"
        _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
        transition="all 0.2s"
        onClick={() => _id && navigate(`/blog/${_id}`)}
      >
        <Image 
          borderRadius={'20px'} 
          src={featuredImage || buddyCard1}
          alt={label}
          w="100%"
          h="200px"
          objectFit="cover"
        />
        
        <Text mt={5} textAlign={'left'} fontSize={'24px'} fontWeight={500} color={'#000000'}>
          {label}
        </Text>
        
        <Text mt={'20px'} textAlign={'left'} noOfLines={3} fontSize={'18px'} fontWeight={'400'} color={'#454C52'}>
          {subLabel}
        </Text>

        {/* Meta Information */}
        <Flex mt={3} gap={3} align="center" fontSize="sm" color="gray.600">
          {author && (
            <Flex align="center" gap={1}>
              <FaUser size={12} />
              <Text>{author}</Text>
            </Flex>
          )}
          {readTime && (
            <Flex align="center" gap={1}>
              <FaClock size={12} />
              <Text>{readTime} min</Text>
            </Flex>
          )}
          {createdAt && (
            <Text>{new Date(createdAt).toLocaleDateString()}</Text>
          )}
        </Flex>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <Flex mt={3} wrap="wrap" gap={1}>
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} size="sm" colorScheme="pink" variant="subtle">
                {tag}
              </Badge>
            ))}
          </Flex>
        )}

        {/* Action Buttons */}
        <Flex mt={4} gap={2} justify="space-between" align="center">
          <Button
            size="sm"
            bg="var(--peach)"
            color="white"
            _hover={{ bg: "#c55a65" }}
            onClick={(e) => {
              e.stopPropagation();
              _id && navigate(`/blog/${_id}`);
            }}
          >
            Read More
          </Button>
          
          <Flex gap={1}>
            {authentication && (
              <Button
                size="sm"
                variant="outline"
                colorScheme="blue"
                onClick={(e) => {
                  e.stopPropagation();
                  _id && navigate(`/blog-edit/${_id}`);
                }}
              >
                <FaEdit />
              </Button>
            )}
            
            <Button
              size="sm"
              variant="outline"
              as="a"
              href={blogLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              External Link
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(blogLink)
                  .then(() => toast.success("Link copied to clipboard"))
                  .catch(() => toast.error("Failed to copy link"));
              }}
            >
              <AiOutlineShareAlt />
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
};
