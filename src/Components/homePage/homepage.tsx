import React, {  } from "react";
import { Link } from "react-router-dom";
import { TodosList } from "../todoList";

const Homepage = (): JSX.Element => {
    return(
        <div>
            <div>
                <Link to="/login">Youtube Render</Link>
            </div>
            <div>
                <TodosList />
            </div>
        </div>
    )
}

export default Homepage;