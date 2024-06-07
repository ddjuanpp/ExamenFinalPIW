import {PageProps} from "$fresh/server.ts";
import Header from "../components/Header.tsx"

type State = {
    email: string,
    name: string,
    id: string,
}

export default function Layout(props: PageProps){
    return(
        <>
        {props.route!=="/login" && props.route!=="/register" ?
        <div class="page-container">
            <Header user={`${props.state.name || "unknown"}`}/>
            <props.Component/>
        </div>:<props.Component/>}
        </>
    )
}