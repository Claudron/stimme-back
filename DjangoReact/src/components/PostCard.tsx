import { Post } from "../hooks/usePosts";
import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import { Link } from "react-router-dom";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <Card borderEndRadius={10} overflow={"hidden"}>
      <Image src={noImage} />
      <CardBody>
        <Heading fontSize="2xl">
          <Link to={"/posts/" + post.id}>{post.title}</Link>
        </Heading>
      </CardBody>
    </Card>
  );
};

export default PostCard;
