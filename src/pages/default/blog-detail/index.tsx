import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, Heading, Text, Image, Badge, Flex, Button, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { MainLayout } from "../../../layout";
import { useGetBlogByIdQuery } from "../../../redux/rtk-api";
import { useAppDispatch } from "../../../redux";
import { handleError } from "../../../redux/features";
import { FaArrowLeft, FaClock, FaUser } from "react-icons/fa";

export const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    data: blog,
    isError: isBlogError,
    isLoading: isBlogLoading,
    error: blogError,
  } = useGetBlogByIdQuery(id || "", {
    skip: !id
  });

  useEffect(() => {
    if (isBlogError) {
      dispatch(handleError((blogError as any)?.data?.message || "Failed to load blog"));
    }
  }, [isBlogError, blogError, dispatch]);

  if (isBlogLoading) {
    return (
      <MainLayout>
        <Container maxW="4xl" py={8}>
          <Flex justify="center" align="center" minH="50vh">
            <Spinner size="xl" color="var(--peach)" />
          </Flex>
        </Container>
      </MainLayout>
    );
  }

  if (isBlogError || !blog?.data) {
    return (
      <MainLayout>
        <Container maxW="4xl" py={8}>
          <Alert status="error">
            <AlertIcon />
            Blog not found or failed to load.
          </Alert>
          <Button
            mt={4}
            leftIcon={<FaArrowLeft />}
            onClick={() => navigate("/buddytube")}
            colorScheme="gray"
          >
            Back to Buddy Tube
          </Button>
        </Container>
      </MainLayout>
    );
  }

  const blogData = blog.data;

  return (
    <MainLayout>
      <Container maxW="4xl" py={8}>
        {/* Back Button */}
        <Button
          leftIcon={<FaArrowLeft />}
          onClick={() => navigate("/buddytube")}
          mb={6}
          variant="ghost"
          color="var(--peach)"
        >
          Back to Buddy Tube
        </Button>

        {/* Featured Image */}
        {blogData.featuredImage && (
          <Box mb={6}>
            <Image
              src={blogData.featuredImage}
              alt={blogData.label}
              w="100%"
              h={{ base: "200px", md: "400px" }}
              objectFit="cover"
              borderRadius="lg"
            />
          </Box>
        )}

        {/* Blog Header */}
        <Box mb={6}>
          <Heading as="h1" size="xl" mb={4} color="gray.800">
            {blogData.label}
          </Heading>
          
          {blogData.subLabel && (
            <Text fontSize="lg" color="gray.600" mb={4}>
              {blogData.subLabel}
            </Text>
          )}

          {/* Meta Information */}
          <Flex wrap="wrap" gap={4} align="center" mb={4}>
            {blogData.author && (
              <Flex align="center" gap={2}>
                <FaUser color="var(--peach)" />
                <Text fontSize="sm" color="gray.600">
                  {blogData.author}
                </Text>
              </Flex>
            )}
            
            {blogData.readTime && (
              <Flex align="center" gap={2}>
                <FaClock color="var(--peach)" />
                <Text fontSize="sm" color="gray.600">
                  {blogData.readTime} min read
                </Text>
              </Flex>
            )}
            
            {blogData.createdAt && (
              <Text fontSize="sm" color="gray.600">
                {new Date(blogData.createdAt).toLocaleDateString()}
              </Text>
            )}
          </Flex>

          {/* Tags */}
          {blogData.tags && blogData.tags.length > 0 && (
            <Flex wrap="wrap" gap={2} mb={4}>
              {blogData.tags.map((tag, index) => (
                <Badge key={index} colorScheme="pink" variant="subtle">
                  {tag}
                </Badge>
              ))}
            </Flex>
          )}
        </Box>

        {/* Blog Content */}
        <Box mb={8}>
          {blogData.htmlContent ? (
            <Box
              dangerouslySetInnerHTML={{ __html: blogData.htmlContent }}
              sx={{
                "& p": { mb: 4, lineHeight: 1.7 },
                "& h1, & h2, & h3, & h4, & h5, & h6": { mb: 3, mt: 6, fontWeight: "bold" },
                "& ul, & ol": { mb: 4, pl: 6 },
                "& li": { mb: 2 },
                "& img": { maxW: "100%", h: "auto", borderRadius: "md", my: 4 },
                "& blockquote": {
                  borderLeft: "4px solid var(--peach)",
                  pl: 4,
                  py: 2,
                  bg: "gray.50",
                  fontStyle: "italic",
                  my: 4
                },
                "& code": {
                  bg: "gray.100",
                  px: 2,
                  py: 1,
                  borderRadius: "sm",
                  fontSize: "sm"
                },
                "& pre": {
                  bg: "gray.900",
                  color: "white",
                  p: 4,
                  borderRadius: "md",
                  overflow: "auto",
                  my: 4
                }
              }}
            />
          ) : (
            <Text fontSize="lg" lineHeight={1.7} color="gray.700">
              {blogData.body}
            </Text>
          )}
        </Box>

        {/* External Link */}
        {blogData.blogLink && (
          <Box textAlign="center" py={6} borderTop="1px" borderColor="gray.200">
            <Button
              as="a"
              href={blogData.blogLink}
              target="_blank"
              rel="noopener noreferrer"
              bg="var(--peach)"
              color="white"
              size="lg"
              _hover={{ bg: "#c55a65" }}
            >
              Read Full Article
            </Button>
          </Box>
        )}
      </Container>
    </MainLayout>
  );
};
