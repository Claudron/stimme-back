import { SimpleGrid, Text } from "@chakra-ui/react";
import usePosts from "../hooks/usePosts";
import PostCard from "./PostCard";

const PostGrid = () => {
  const { posts, error } = usePosts();

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 2, md: 3, lg: 4, xl: 5 }}
        padding="10px"
        spacing={6}
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default PostGrid;
