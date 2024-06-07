import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import VideoList from "../components/VideoList.tsx";
import { Video } from "../types.ts";

type State = {
    id: string,
    userName: string,
    email: string
}

type Data = {
    videos: Video[],
    userid: string
}

export const handler: Handlers<Data, State> = {
    GET: async (_req: Request, ctx: FreshContext<State, Data>) =>{
        try{
            const userid = ctx.state.id;
            const response = await fetch(`https://videoapp-api.deno.dev/videos/${userid}`);
            if(response.status !== 200 ){
                return ctx.render({videos: [], userid: ""})
            }
            const videos: Video[] = await response.json();
            return ctx.render({videos, userid})
        }catch(error){
            return new Response(error.message,{
                status:500
            });
        }
    }
}

const Page = (props: PageProps<Data>) =>{
    return(
        <VideoList videos = {props.data.videos} userid={props.data.userid}/>
    )
}

export default Page;