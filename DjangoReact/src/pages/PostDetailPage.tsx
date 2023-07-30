import { useParams } from "react-router-dom";
import usePostDetail from "../hooks/usePostDetail";
import { GridItem, Heading, SimpleGrid, Text, Image, Box } from "@chakra-ui/react";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";

const PostDetailPage = () => {
  const { id } = useParams();
  const { data: post, error } = usePostDetail(id!);

  if (error || !id) throw error;

  return (
    <SimpleGrid columns={1} spacing={10}>
      <GridItem>
        <Heading>{post?.title}</Heading>
      </GridItem>
      <Box mt={4}>
        <Image src={post?.content_image || noImage} alt="Content Image" />
      </Box>
      <GridItem>
        <Text fontSize={25}>{post?.body}</Text>
      </GridItem>
      <GridItem>
        <Text fontSize="sm" color="gray.600">
          Created: {post?.date_created}
        </Text>
        <Text fontSize="sm" color="gray.600">
          Updated: {post?.date_update}
        </Text>
      </GridItem>
    </SimpleGrid>
  );
};

export default PostDetailPage;
