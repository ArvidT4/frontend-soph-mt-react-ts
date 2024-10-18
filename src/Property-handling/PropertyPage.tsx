import React, { useEffect } from 'react';
import { useMyPropertiesContext } from '../Contexts/PropertyContext';
import {IProperty, IToken} from "../interfaces"
import Property from "./Property"
import H1Banner from '../Components/H1Banner';
import { useMyContext } from '../Contexts/TokenContext';
import { useNavigate } from 'react-router-dom';
import { getLocal } from '../Contexts/LocalStorage.';

const PropertyPage=()=> {
    const navigate = useNavigate();
    useEffect(() => {
        const token:IToken=getToken();
        
        if(token){
            const props:IProperty[]=getLocal("properties");
            if(props){
                setPropertiesFromLocal(props);
            }else{
                getProperties(token.token);
                console.log(token)
            }
            console.log(props)
        }
    }, []);
    const {properties,addBoiler,getProperties}=useMyPropertiesContext();
    const {token,getToken}=useMyContext();

    return (
        <div>
            <H1Banner header={"Properties"}></H1Banner>
            <div>
                <button className={"buttonAdd"} onClick={()=>navigate("/addProperty")}>Add property</button>
            </div>
            {properties && properties.length>0 ? (properties.map((object:IProperty,key)=>{
                return <Property key={key} property={object}></Property>
            })) : (<div>loading</div>)}

        </div>
    );
}

export default PropertyPage;

function setPropertiesFromLocal(props: IProperty[]) {
    throw new Error('Function not implemented.');
}
function getToken(): IToken {
    throw new Error('Function not implemented.');
}

