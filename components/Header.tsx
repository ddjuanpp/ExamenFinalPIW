import { FunctionComponent } from "preact"
import Logout from "../islands/Logout.tsx"

type Data = {
    user: string;
};

const Header: FunctionComponent<Data>=({user}) => {
    return(
        <header class= "header-container">
            <div class="header-content">
                <span class="user-name">{user}</span>
                <Logout/>
            </div>
        </header>
    )
};

export default Header;