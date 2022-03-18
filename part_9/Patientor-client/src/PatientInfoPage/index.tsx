import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useStateValue } from "../state";
const PatientInfoPage = () => {
    const {id} = useParams<{id:string}>();
    const [{patients}, dispatch] = useStateValue();
    useEffect(()=>{
        
    },[]);
    return (
        <div>

        </div>
    )
}

export default PatientInfoPage