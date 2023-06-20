import React from "react";

export const getHighlightedText=(text, higlight)=> {
  // Split text on higlight term, include term itself into parts, ignore case
  var parts = text.split(new RegExp(`(${higlight})`, "gi"));
  return parts.map((part, index) => (
    <React.Fragment key={index}>
      {part.toLowerCase() === higlight.toLowerCase() ? (
        <b style={{ backgroundColor: "#e8bb49" }}>{part}</b>
      ) : (
        part
      )}
    </React.Fragment>
  ));
}
