import React from "react";
import { useParams } from "react-router-dom";

const PostDetailPage = () => {
  const { id } = useParams();

  return <div>PostDetailPage</div>;
};

export default PostDetailPage;
