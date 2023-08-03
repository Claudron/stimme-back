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
} from "@chakra-ui/react";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import EmbedVideo from "../components/EmbedVideo";


const PostDetailPage = () => {
  const { id } = useParams();
  const { data: post, error } = usePostDetail(id!);

  if (error || !id) throw error;

  return (
    <SimpleGrid columns={1} spacing={10}>
      <EmbedVideo  embedUrl={post?.embed_video_url}/>
            <GridItem>
              <Heading>{post?.title}</Heading>
            </GridItem>
        <Text fontSize="sm" color="gray.600">
          Created: {post?.date_created}
        </Text>
            <HStack>
      <GridItem>
        <Text fontSize={25}>{post?.body}</Text>
      </GridItem>
      <Box mt={4}>
        <Image src={post?.content_image || noImage} alt="Content Image" />
      </Box>
      </HStack>
    </SimpleGrid>
  );
};

export default PostDetailPage;
