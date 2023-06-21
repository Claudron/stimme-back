import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import PostGrid from "../components/PostGrid";

const Posts = () => {
  // useEffect(() => {
  //   const url = "/apitest/content";
  //   axios.get(url).then((response) => {
  //     console.log(response.data);
  //   });
  // }, []);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="aside">Aside</GridItem>
      <GridItem area="main">
        <PostGrid />
      </GridItem>
    </Grid>
  );
};

export default Posts;
