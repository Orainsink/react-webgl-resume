import React, { useEffect, useRef } from "react";
import "../../styles/Heads.scss";
import { useMappedState } from "redux-react-hook";
import gsap from "gsap";

export default function Heads(props) {
  const heads = useRef(null)

  useEffect(()=>{
    gsap.to(heads.current, {...props.params} );
  },[props.params])

	return (
		<div className={"heads"} ref={heads}>
			{props.children}
		</div>
	);
}
