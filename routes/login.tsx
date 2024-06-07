import {FreshContext, Handlers, PageProps} from "$fresh/server.ts";
import jwt from "jsonwebtoken";
import Login from "../components/Login.tsx";

export type Data = {
    message: string;
}

type State = {
    id: string,
    name: string,
    email: string
}

export const handler: Handlers<unknown, State> = {
    POST: async (_req: Request, ctx: FreshContext<State>) => {
        try{
        const form = await _req.formData();
        const email = form.get("email");
        const password = form.get("password");
        const response = await fetch("https://videoapp-api.deno.dev/checkuser",{
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({email, password}),    
        },);
        if(response.status!==200){
            return ctx.render({message: "Incorrect credentials or user does not exist",});
        }
        const user: State = await response.json();
        const token = jwt.sign(user, Deno.env.get("jwt"));
        const headers = new Headers();
        headers.append("location", `/videos`)
        headers.append("Set-Cookie", `auth=${token}`)
        return new Response("", {status: 302, headers,});
        }catch(error){
            return new Response(error.message,{
                status:500
            });
        }
    }
};

const Page = (props: PageProps<{message: string}, State>) => {
    return(
        <Login message = {props.data?.message}/>
    )
}

export default Page;