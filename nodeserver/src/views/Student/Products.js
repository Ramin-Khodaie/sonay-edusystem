import { Flex, SimpleGrid } from "@chakra-ui/react"
import book1 from 'assets/img/books/book1.png'
import book2 from 'assets/img/books/book2.png'
import Book from "components/Book/Book"


const Products = () => {

    const books = [{
        title: "American file1",
        description: "this is amarican file1.",
        price: 250000,
        imageUrl: book1,
        isMain: false
    }, {
        title: "American file2",
        description: "this is amarican file2.",
        price: 250000,
        imageUrl: book2,
        isMain: false
    },
    ]

    
    return (
        <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
            <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px' mb='20px'>
                {
                    books.map((bookItem)=>(<Book item={bookItem}/>))
                }
            </SimpleGrid>

        </Flex>

    )
}

export default Products