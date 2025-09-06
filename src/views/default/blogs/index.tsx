import React, { useEffect } from "react";
import { MainLayout } from "../../../layout";
import { useGetAllBlogQuery } from "../../../redux/rtk-api";
import { useAppDispatch } from "../../../redux";
import { handleError, useAuthenticationSlice } from "../../../redux/features";
import { AppButton, BlogCard } from "../../../component";
import CardSection from "../buddytube/cards-section";
import { Link, useNavigate } from "react-router-dom";
import { Box, Grid } from "@chakra-ui/react";


export const BuddyTubePage = () => {
  const {
    data: blogs,
    isError: isBlogError,
    isLoading: isBlogLoading,
    error: blogError,
  } = useGetAllBlogQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isBlogError) {
      dispatch(handleError((blogError as any).data.message));
    }
  }, [isBlogError, blogError, dispatch]);

  const navigate = useNavigate();
    const { authentication } = useAuthenticationSlice();

  return (
    <MainLayout loading={isBlogLoading}>
      <div className="bg-gradient-to-t from-white to-primary-300 xl:px-0 px-5 pt-20 pb-16">
        <div className="border border-primary-500 pt-20 pb-16 px-10 xl:w-[80%] mx-auto bg-white rounded-md flex flex-col gap-5">
          <h1 className="text-3xl">
            Read articles for basic brain development
          </h1>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis,
            debitis reprehenderit veniam eligendi neque fugiat quibusdam aut
            consequuntur, nemo corporis minima totam dicta eaque inventore,
            distinctio expedita earum laboriosam recusandae!
          </p>
          <div className="flex gap-4 flex-wrap">
            <AppButton onClick={() => {
                  if(!authentication){
                    navigate('/sign-in')

                  }else{
                    navigate('/mentor/list')

                  }
                }
                  
                } filled>Get in touch with mentor</AppButton>
            
            <AppButton 
              onClick={() => {
                if(!authentication){
                  navigate('/sign-in')
                }else{
                  navigate('/blog-create')
                }
              }}
              outlined
            >
              Create Blog
            </AppButton>
          </div>
        </div>
         <input
              type="text"
              placeholder="Search by name, specialty, or condition..."
              className="bg-transparent w-full py-1 text-gray-700 placeholder-gray-500 focus:outline-none"
            />
                       <Box className="section-container" pb={16} mt={12}>
                       <Grid justifyContent={'center'} alignItems={'center'} templateColumns={{
                            base: '1fr', // 1 column for base (smallest screens, mobile)
                            sm: '1fr 1fr', // 2 columns for small screens (tablets)
                            md: 'repeat(3,1fr)', // 3 columns for medium screens
                            lg: 'repeat(3,1fr)', // 3 columns for large screens
                        }} gap={6}>
          {blogs?.data.map(
            ({ body, label, subLabel, _id, createdAt, blogLink, featuredImage, author, readTime, tags }) => (
              
                <BlogCard
                  key={_id}
                  _id={_id}
                  body={body}
                  label={label}
                  subLabel={subLabel}
                  blogLink={blogLink}
                  createdAt={createdAt as string}
                  featuredImage={featuredImage}
                  author={author}
                  readTime={readTime}
                  tags={tags}
                />
             
            )
          )}
        </Grid>
                       </Box>
      </div>
      {/* <CardSection data={data}/> */}
    </MainLayout>
  );
};
