import { useRef } from "react";

const useRenderCount = (page) => {
    let renderCount = useRef(0);
    console.log(`${page} render`, renderCount.current++)
}
export default useRenderCount