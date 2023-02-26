import { VectorMap } from "@south-paw/react-vector-maps"
import franceMap from "./france-departments.svg.json"
import { useState } from "react";
// import '../../../../styles/map.css'

export const Map = () => {
    const [clicked, setClicked] = useState({id: '', name: ''});
  console.log(clicked)
    const layerProps = {
      onClick: ({ target }:any) => setClicked({id: target.attributes.id.value, name: target.attributes.name.value}),
    };


  return (
    <div className="map">
        <VectorMap {...franceMap} layerProps={layerProps} currentLayers={[clicked.id]} />
        <span className="font-bold text-lg">{ clicked.name }</span>
    </div>
  )
}