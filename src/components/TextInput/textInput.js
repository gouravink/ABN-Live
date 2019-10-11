import React from "react";
import "./textInput.css"

const TextInput = React.forwardRef((props, ref) => {
   return (
      <div className="col-12 mb-4 px-4 inp-pre-owned-col">
         <label className="inp inp-pre-owned">
            <input
               {...props}
               ref={ref}
               // type={props.type}
               // name={props.name}
               placeholder="&nbsp;"
            // value={props.value}
            // onChange={props.onChange}
            // onBlur={props.onBlur}
            // style={props.style}
            />
            <span className="label">{props.title}</span>
            <span className="border"></span>
         </label>
      </div>
   )
})

export default TextInput