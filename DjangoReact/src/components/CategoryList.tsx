import { List, ListItem } from '@chakra-ui/react';
import useCategory from '../hooks/useCategories';

const CategoryList = () => {
    const {data} = useCategory();

  return (
    <List>
        {data?.map((categories) => 
        (<ListItem key={categories.id}>{categories.name}</ListItem>)
        )}
    </List>
  )
}

export default CategoryList

