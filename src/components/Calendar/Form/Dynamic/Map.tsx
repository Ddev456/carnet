import { VectorMap } from "@south-paw/react-vector-maps"
import franceMap from "./france-departments.svg.json"
import { useState } from "react";
import { useFormContext } from "react-hook-form";
// import '../../../../styles/map.css'

export const Map = () => {
    const [clicked, setClicked] = useState({id: '', name: ''});
    const oceanic = ["fr-62", "fr-80", "fr-76", "fr-27", "fr-14", "fr-50", "fr-61", "fr-35", "fr-22", "fr-56", "fr-29", "fr-44", "fr-85", "fr-17", "fr-33", "fr-40", "fr-64"]
    const mediter = ["fr-06","fr-83","fr-13","fr-84","fr-26","fr-07","fr-30","fr-34","fr-11","fr-66","fr-2a","fr-2b"]
    const mountain = ["fr-65","fr-09","fr-88","fr-25","fr-39","fr-74","fr-73","fr-05","fr-01","fr-38","fr-05","fr-04","fr-63","fr-15","fr-43","fr-48","fr-12","fr-81"]
    const halfOceanic = ["fr-32", "fr-31", "fr-47", "fr-82", "fr-46", "fr-24", "fr-16", "fr-79", "fr-86", "fr-36", "fr-18", "fr-45", "fr-41", "fr-37", "fr-91", "fr-77", "fr-78", "fr-95", "fr-60", "fr-02", "fr-87", "fr-23", "fr-19", "fr-53", "fr-49", "fr-72", "fr-28", "fr-59", "fr-92", "fr-93", "fr-94", "fr-75"]
    const continent = ["fr-08", "fr-51", "fr-10", "fr-52", "fr-55", "fr-54", "fr-57", "fr-67", "fr-68", "fr-90", "fr-70", "fr-21", "fr-71", "fr-89", "fr-21", "fr-58", "fr-71", "fr-03", "fr-42", "fr-69"]
    console.log(clicked)
    const { setValue } = useFormContext()
    const handleClimate  = (id: string) => {
        if(mediter.includes(id)){ setValue('climateIndex', 0) }
        if(oceanic.includes(id)){ setValue('climateIndex', 1) }
        if(halfOceanic.includes(id)){ setValue('climateIndex', 2) }
        if(continent.includes(id)){ setValue('climateIndex', 3) }
        if(mountain.includes(id)){ setValue('climateIndex', 4) }
    }
    const layerProps = {
      onClick: ({ target }:any) => { setClicked({id: target.attributes.id.value, name: target.attributes.name.value}); handleClimate(target.attributes.id.value) }
    };

  return (
    <div className="map">
        <VectorMap {...franceMap} layerProps={layerProps} currentLayers={[clicked.id]} />
        <span className="font-bold text-lg">{ clicked.name }</span>
        <span className={oceanic.includes(clicked.id) ? "block font-bold text-lg" : "hidden"}>Climat Océanique</span>
        <span className={mediter.includes(clicked.id) ? "block font-bold text-lg" : "hidden"}>Climat Méditérannéen</span>
        <span className={mountain.includes(clicked.id) ? "block font-bold text-lg" : "hidden"}>Climat Montagnard</span>
        <span className={halfOceanic.includes(clicked.id) ? "block font-bold text-lg" : "hidden"}>Climat Semi-Océanique</span>
        <span className={continent.includes(clicked.id) ? "block font-bold text-lg" : "hidden"}>Climat Continental</span>
    </div>
  )
}