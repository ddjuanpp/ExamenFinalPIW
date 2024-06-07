import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";

type Props = {
    id: string,
    fav: boolean,
    userid: string
}

const Fav: FunctionComponent<Props> = ({userid, id, fav}) => {
    const [favo, setFavo] = useState<boolean>(fav);

    const cambioFav = async (userid: string, id: string) => {
        const response = await fetch(`https://videoapp-api.deno.dev/fav/${userid}/${id}`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"}
            }
        )
        if(response.status === 200) {
            setFavo(!favo);
        }else{
            console.error("Error toggling fav")
        }
    }
    return ( 
        <button class="fav-button" onClick={() => cambioFav(userid, id)}>
            {favo ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
        </button>
    )
}
export default Fav;