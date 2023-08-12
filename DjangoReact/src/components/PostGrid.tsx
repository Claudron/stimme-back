import { SimpleGrid, Text } from "@chakra-ui/react";
import usePosts from "../hooks/usePosts";
import PostCard from "./PostCard";
import React from "react";
import PostCardContainer from "./PostCardContainer";

const PostGrid = () => {
  const { data, error } = usePosts();

  return (
    <>
      {error && <Text>{error.message}</Text>}
      <SimpleGrid
        columns={{ sm: 2, md: 3, lg: 4, xl: 5 }}
        padding="10px"
        spacing={6}
      >
        {data?.pages.map((page, index) => 
        <React.Fragment key={index}>
        {page.results.map((post)=> 
        
         <PostCardContainer >
           <PostCard key={post.id} post={post} />
         </PostCardContainer>
        )}
        </React.Fragment>
        )}
      </SimpleGrid>
    </>
  );
};

export default PostGrid;
