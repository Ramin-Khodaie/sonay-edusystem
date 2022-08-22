import { Skeleton, SkeletonCircle, SkeletonText,Box,Flex, SimpleGrid , Grid, GridItem } from '@chakra-ui/react'
  function UserListSkleton(props) {

    const rows = 10

  
    return (




<>
<Grid
  h='50px'
  templateRows='repeat(1, 1fr)'
  templateColumns='repeat(10, 1fr)'
  gap={4}

  style={{direction:"rtl" }} my={"10px"}
>
  <GridItem rowSpan={1} colSpan={1}  >

  <SkeletonCircle size='50px' />
  </GridItem>
  <GridItem rowSpan={1} colSpan={3} >

  <Skeleton height={'50px'} />
  </GridItem>
  <GridItem rowSpan={1} colSpan={3}  >

<Skeleton height={'50px'} />
</GridItem>
<GridItem rowSpan={1} colSpan={3}  >

<Skeleton height={'50px'} />
</GridItem>
  

</Grid>

<Grid
  h='50px'
  templateRows='repeat(1, 1fr)'
  templateColumns='repeat(10, 1fr)'
  gap={4}

  style={{direction:"rtl" }} my={"10px"}
>
  <GridItem rowSpan={1} colSpan={1}  >

  <SkeletonCircle size='50px' />
  </GridItem>
  <GridItem rowSpan={1} colSpan={3} >

  <Skeleton height={'50px'} />
  </GridItem>
  <GridItem rowSpan={1} colSpan={3}  >

<Skeleton height={'50px'} />
</GridItem>
<GridItem rowSpan={1} colSpan={3}  >

<Skeleton height={'50px'} />
</GridItem>
  

</Grid>

<Grid
  h='50px'
  templateRows='repeat(1, 1fr)'
  templateColumns='repeat(10, 1fr)'
  gap={4}

  style={{direction:"rtl" }} my={"10px"}
>
  <GridItem rowSpan={1} colSpan={1}  >

  <SkeletonCircle size='50px' />
  </GridItem>
  <GridItem rowSpan={1} colSpan={3} >

  <Skeleton height={'50px'} />
  </GridItem>
  <GridItem rowSpan={1} colSpan={3}  >

<Skeleton height={'50px'} />
</GridItem>
<GridItem rowSpan={1} colSpan={3}  >

<Skeleton height={'50px'} />
</GridItem>
  

</Grid>


<Grid
  h='50px'
  templateRows='repeat(1, 1fr)'
  templateColumns='repeat(10, 1fr)'
  gap={4}

  style={{direction:"rtl" }} my={"10px"}
>
  <GridItem rowSpan={1} colSpan={1}  >

  <SkeletonCircle size='50px' />
  </GridItem>
  <GridItem rowSpan={1} colSpan={3} >

  <Skeleton height={'50px'} />
  </GridItem>
  <GridItem rowSpan={1} colSpan={3}  >

<Skeleton height={'50px'} />
</GridItem>
<GridItem rowSpan={1} colSpan={3}  >

<Skeleton height={'50px'} />
</GridItem>
  

</Grid>





</>
    

    );
  }
  
  export default UserListSkleton
  ;
  