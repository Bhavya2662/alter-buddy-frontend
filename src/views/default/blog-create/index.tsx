import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Switch,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  useToast,
  Alert,
  AlertIcon,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { MainLayout } from '../../../layout';
import { RichTextEditor } from '../../../component';
import { IBlogProps } from '../../../interface';
import { useCreateBlogMutation, useUpdateBlogMutation, useGetBlogByIdQuery } from '../../../redux/rtk-api/blogs.api';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

// Validation schema
const blogValidationSchema = Yup.object().shape({
  label: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  subLabel: Yup.string().required('Subtitle is required').min(3, 'Subtitle must be at least 3 characters'),
  body: Yup.string().required('Content is required').min(10, 'Content must be at least 10 characters'),
  blogLink: Yup.string().url('Must be a valid URL').required('Blog link is required'),
  author: Yup.string().required('Author name is required'),
  readTime: Yup.number().min(1, 'Read time must be at least 1 minute').required('Read time is required'),
});

interface BlogFormValues extends Omit<IBlogProps, '_id' | 'createdAt' | 'updatedAt'> {
  tagInput: string;
}

export const BlogCreatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const toast = useToast();
  const isEditMode = Boolean(id);
  
  // API hooks
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const { data: existingBlogData, isLoading: isLoadingBlog } = useGetBlogByIdQuery(id || '', {
    skip: !isEditMode || !id,
  });

  // Initial form values
  const initialValues: BlogFormValues = {
    label: '',
    subLabel: '',
    body: '',
    blogLink: '',
    htmlContent: '',
    featuredImage: '',
    images: [],
    author: '',
    authorId: '',
    tags: [],
    isPublished: true,
    readTime: 5,
    tagInput: '',
  };

  // Get existing blog data for edit mode
  const existingBlog = existingBlogData?.data;

  const handleImageUpload = async (file: File): Promise<string> => {
    // TODO: Implement actual image upload to server
    // For now, return a placeholder URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (values: BlogFormValues) => {
    try {
      // Remove tagInput from the payload
      const { tagInput, ...blogData } = values;
      
      if (isEditMode && id) {
        await updateBlog({ ...blogData, _id: id }).unwrap();
        toast({
          title: 'Blog updated',
          description: 'Blog has been updated successfully',
          status: 'success',
          duration: 3000,
        });
      } else {
        await createBlog(blogData).unwrap();
        toast({
          title: 'Blog created',
          description: 'Blog has been created successfully',
          status: 'success',
          duration: 3000,
        });
      }
      
      navigate('/buddytube');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} blog`,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const addTag = (tag: string, setFieldValue: any, currentTags: string[]) => {
    if (tag.trim() && !currentTags.includes(tag.trim())) {
      const newTags = [...currentTags, tag.trim()];
      setFieldValue('tags', newTags);
      setFieldValue('tagInput', '');
    }
  };

  const removeTag = (tagToRemove: string, setFieldValue: any, currentTags: string[]) => {
    const newTags = currentTags.filter(tag => tag !== tagToRemove);
    setFieldValue('tags', newTags);
  };

  // Show loading spinner while fetching blog data for edit mode
  if (isEditMode && isLoadingBlog) {
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

  return (
    <MainLayout>
      <Container maxW="4xl" py={8}>
        {/* Header */}
        <Flex justify="space-between" align="center" mb={6}>
          <Button
            leftIcon={<FaArrowLeft />}
            onClick={() => navigate('/buddytube')}
            variant="ghost"
          >
            Back to Buddy Tube
          </Button>
          <Box fontSize="2xl" fontWeight="bold">
            {isEditMode ? 'Edit Blog' : 'Create New Blog'}
          </Box>
        </Flex>

        <Formik
          initialValues={existingBlog ? { ...existingBlog, tagInput: '' } : initialValues}
          validationSchema={blogValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => (
            <Form>
              <VStack spacing={6} align="stretch">
                {/* Title and Subtitle */}
                <HStack spacing={4} align="start">
                  <Field name="label">
                    {({ field, meta }: any) => (
                      <FormControl isInvalid={meta.error && meta.touched} flex={1}>
                        <FormLabel>Title</FormLabel>
                        <Input {...field} placeholder="Enter blog title" />
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  
                  <Field name="subLabel">
                    {({ field, meta }: any) => (
                      <FormControl isInvalid={meta.error && meta.touched} flex={1}>
                        <FormLabel>Subtitle</FormLabel>
                        <Input {...field} placeholder="Enter blog subtitle" />
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </HStack>

                {/* Author and Read Time */}
                <HStack spacing={4} align="start">
                  <Field name="author">
                    {({ field, meta }: any) => (
                      <FormControl isInvalid={meta.error && meta.touched} flex={1}>
                        <FormLabel>Author</FormLabel>
                        <Input {...field} placeholder="Enter author name" />
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  
                  <Field name="readTime">
                    {({ field, meta }: any) => (
                      <FormControl isInvalid={meta.error && meta.touched} w="200px">
                        <FormLabel>Read Time (minutes)</FormLabel>
                        <NumberInput {...field} min={1} max={60}>
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </HStack>

                {/* Blog Link and Featured Image */}
                <HStack spacing={4} align="start">
                  <Field name="blogLink">
                    {({ field, meta }: any) => (
                      <FormControl isInvalid={meta.error && meta.touched} flex={1}>
                        <FormLabel>Blog Link</FormLabel>
                        <Input {...field} placeholder="https://example.com" />
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  
                  <Field name="featuredImage">
                    {({ field, meta }: any) => (
                      <FormControl flex={1}>
                        <FormLabel>Featured Image URL</FormLabel>
                        <Input {...field} placeholder="https://example.com/image.jpg" />
                      </FormControl>
                    )}
                  </Field>
                </HStack>

                {/* Tags */}
                <FormControl>
                  <FormLabel>Tags</FormLabel>
                  <HStack spacing={2} mb={2}>
                    <Input
                      value={values.tagInput}
                      onChange={(e) => setFieldValue('tagInput', e.target.value)}
                      placeholder="Add a tag and press Enter"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag(values.tagInput, setFieldValue, values.tags || []);
                        }
                      }}
                      flex={1}
                    />
                    <Button
                      onClick={() => addTag(values.tagInput, setFieldValue, values.tags || [])}
                      size="sm"
                      bg="var(--peach)"
                      color="white"
                      _hover={{ bg: "#c55a65" }}
                    >
                      Add Tag
                    </Button>
                  </HStack>
                  
                  {values.tags && values.tags.length > 0 && (
                    <Wrap>
                      {values.tags.map((tag, index) => (
                        <WrapItem key={index}>
                          <Tag size="md" colorScheme="pink" variant="solid">
                            <TagLabel>{tag}</TagLabel>
                            <TagCloseButton
                              onClick={() => removeTag(tag, setFieldValue, values.tags || [])}
                            />
                          </Tag>
                        </WrapItem>
                      ))}
                    </Wrap>
                  )}
                </FormControl>

                {/* Content Editor */}
                <Field name="body">
                  {({ field, meta }: any) => (
                    <FormControl isInvalid={meta.error && meta.touched}>
                      <FormLabel>Content</FormLabel>
                      <RichTextEditor
                        value={field.value}
                        onChange={(value) => {
                          setFieldValue('body', value);
                          setFieldValue('htmlContent', value);
                        }}
                        placeholder="Start writing your blog content..."
                        height="500px"
                        onImageUpload={handleImageUpload}
                      />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/* Publish Settings */}
                <HStack spacing={4}>
                  <Field name="isPublished">
                    {({ field }: any) => (
                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb={0}>Publish immediately</FormLabel>
                        <Switch
                          {...field}
                          isChecked={field.value}
                          colorScheme="pink"
                        />
                      </FormControl>
                    )}
                  </Field>
                </HStack>

                {/* Submit Button */}
                <Flex justify="flex-end" pt={4}>
                  <Button
                    type="submit"
                    leftIcon={<FaSave />}
                    bg="var(--peach)"
                    color="white"
                    _hover={{ bg: "#c55a65" }}
                    isLoading={isSubmitting || isCreating || isUpdating}
                    loadingText={isEditMode ? 'Updating...' : 'Creating...'}
                    size="lg"
                  >
                    {isEditMode ? 'Update Blog' : 'Create Blog'}
                  </Button>
                </Flex>
              </VStack>
            </Form>
          )}
        </Formik>
      </Container>
    </MainLayout>
  );
};

export default BlogCreatePage;