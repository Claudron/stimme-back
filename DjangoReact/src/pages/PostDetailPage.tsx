import { useParams } from "react-router-dom";
import usePostDetail from "../hooks/usePostDetail";
import { GridItem, Heading, SimpleGrid, Text } from "@chakra-ui/react";

const PostDetailPage = () => {
  const { id } = useParams();
  const { data: post, error } = usePostDetail(id!);

  if (error || !id) throw error;

  return (
    <SimpleGrid>
      <GridItem>
        <Heading>{post?.title}</Heading>
      </GridItem>
      <GridItem>
        <Text fontSize={25}>{post?.body}</Text>
      </GridItem>
    </SimpleGrid>
  );
};

export default PostDetailPage;
