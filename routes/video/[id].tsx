import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import VideoDetail from "../../components/VideoDetail.tsx";
import { Video } from "../../types.ts";

type State = {
    id: string,
    name: string,
    email: string
}

type Data = {
    video: Video,
    userid: string
}

export const handler: Handlers<Data, State> = {
    GET: async (_req: Request, ctx: FreshContext<State, Data>) =>{
        try{
            const userid = ctx.state.id;
            const id = ctx.params.id
            const response = await fetch(`https://videoapp-api.deno.dev/video/${userid}/${id}`);
            const video = await response.json();
            return ctx.render({video, userid})
        }catch(error){
            return new Response(error.message,{
                status:500
            });
        }
    }
}

const Page = (props: PageProps<Data>) =>{
    return(
        <VideoDetail video={props.data.video} userid={props.data.userid}/>
    )
}

export default Page;