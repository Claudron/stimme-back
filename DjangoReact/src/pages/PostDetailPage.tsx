import { useParams } from "react-router-dom";
import usePostDetail from "../hooks/usePostDetail";
import {
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";


const PostDetailPage = () => {
  const { id } = useParams();
  const { data: post, error } = usePostDetail(id!);


  const getEmbedContent = (url: string) => {
    if (url) {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
  
      if (hostname.includes("youtube.com")) {
        const youtubeId = parsedUrl.searchParams.get("v");
        return {
          type: 'youtube',
          embedUrl: `https://www.youtube.com/embed/${youtubeId}`
        };
      } else if (hostname.includes("vimeo.com")) {
        const vimeoId = parsedUrl.pathname.split('/').pop();
        return {
          type: 'vimeo',
          embedUrl: `https://player.vimeo.com/video/${vimeoId}`
        };
      }
    }
    return null;
  };


  const embedContent = post?.embed_video_url ? getEmbedContent(post.embed_video_url) : null;



  if (error || !id) throw error;

  return (
    <SimpleGrid columns={1} spacing={10}>
      <GridItem>
        <Heading>{post?.title}</Heading>
      </GridItem>
      {embedContent && (
        <GridItem>
          <iframe
            src={embedContent.embedUrl}
            width="640"
            height="360"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            title={`${embedContent.type} Video`}
          ></iframe>
        </GridItem>
      )}
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
