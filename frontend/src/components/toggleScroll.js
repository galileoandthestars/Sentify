import { useState } from "react";

export const toggleScroll = () => {
    function toggle(toggleBool) {
        if (toggleBool) {
            document.body.style.overflow = "hidden";
            return false;
        } else {
            document.body.style.overflow = "scroll";
            document.body.style.overflowX = "hidden";
            return true;
        }
    }

    const [scroll, setScroll] = useState(toggle(false));

    return {
        scroll,
        setScroll: toggle
    }
}
