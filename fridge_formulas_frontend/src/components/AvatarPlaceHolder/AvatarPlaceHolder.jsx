import "./AvatarPlaceholder.css"


function AvatarPlaceholder({username}){

    return(
        <div className="avatar-placeholder">
            <p className="avatar-placeholder__letter">{ username?username[0] : ""}</p>
        </div>
    )
}

export default AvatarPlaceholder;