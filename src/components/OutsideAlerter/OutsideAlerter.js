import React, { useRef, useEffect } from "react";
/**
 * Hook that alerts clicks outside of the passed ref
 */

const OutsideAlerter = (props)=>{
    const wrapperRef = useRef(null);
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                // alert("You clicked outside of me!");
                props.cancelShowLogout();
            } else if (wrapperRef.current && wrapperRef.current.contains(event.target)){
                props.showLogout();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);   

    return(
        <div ref={wrapperRef}>{props.children}</div>
    )
}

// function useOutsideAlerter(ref,props) {
//     useEffect(() => {
//         /**
//          * Alert if clicked on outside of element
//          */
//         function handleClickOutside(event) {
//             if (ref.current && !ref.current.contains(event.target)) {
//                 // alert("You clicked outside of me!");
//                 props.cancelShowLogout();
//             }
//         }

//         // Bind the event listener
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             // Unbind the event listener on clean up
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [ref]);
// }

// /**
//  * Component that alerts if you click outside of it
//  */
// export default function OutsideAlerter(props) {
//     const wrapperRef = useRef(null);
//     useOutsideAlerter(wrapperRef, props);

//     return <div ref={wrapperRef}>{props.children}</div>;
// }

export default OutsideAlerter;