import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import PostGrid from "../components/PostGrid";
import SearchInput from "../components/SearchInput";
import CategoryList from "../components/CategoryList";

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
      <GridItem area="aside">
        <Heading as='h3' size='lg' marginBottom={3}>
          Categories
        </Heading>
        <CategoryList />
      </GridItem>
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
