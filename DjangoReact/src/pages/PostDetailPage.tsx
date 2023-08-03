import { useParams } from "react-router-dom";
import usePostDetail from "../hooks/usePostDetail";
import {
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  Image,
  Box,
  HStack,
  Container,
} from "@chakra-ui/react";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import EmbedVideo from "../components/EmbedVideo";

const PostDetailPage = () => {
  const { id } = useParams();
  const { data: post, error } = usePostDetail(id!);

  if (error || !id) throw error;

  return (
    <Container maxW="860">
      <Box marginBottom={5}>
        <EmbedVideo embedUrl={post?.embed_video_url} />
      </Box>
      <Heading>{post?.title}</Heading>
      <SimpleGrid columns={1}>
        <Text fontSize="sm" color="gray.600">
          {post?.date_created &&
            new Date(post.date_created)
              .toISOString()
              .split("T")[0]
              .replace(/-/g, ".")}
        </Text>
        <HStack>
          <GridItem>
            <Text fontSize={25}>{post?.body}</Text>
          </GridItem>
        </HStack>
          <Box mt={4}>
            <Image src={post?.content_image || noImage} alt="Content Image" />
          </Box>
      </SimpleGrid>
    </Container>
  );
};

export default PostDetailPage;
