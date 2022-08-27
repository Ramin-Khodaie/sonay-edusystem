import { useContext } from "react";
import { ScrollContext } from "./ScrollContext";


const useScroll = () => {
    const context = useContext(ScrollContext)


    function left(scroll, amount) {

        context.scrollLeft(scroll, amount)
    }

    function right(scroll, amount) {

        context.scrollRight(scroll, amount)
    }
    return left, right
}

export default useScroll