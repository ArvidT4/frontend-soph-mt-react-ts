import H1Banner from "../Components/H1Banner";

const PathError=()=>{

    return(
        <div>
            <H1Banner header={"Path error"}></H1Banner>
            <div>
                Looks like you have reached a path that does not exist.
            </div>
        </div>
    )
}
export default PathError