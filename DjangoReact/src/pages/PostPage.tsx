import { Box, Grid, GridItem } from "@chakra-ui/react";
import PostGrid from "../components/PostGrid";
import SearchInput from "../components/SearchInput";

const Posts = () => {
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
        <Box marginBottom={5}>
          <SearchInput />
        </Box>
        <PostGrid />
      </GridItem>
    </Grid>
  );
};

export default Posts;
