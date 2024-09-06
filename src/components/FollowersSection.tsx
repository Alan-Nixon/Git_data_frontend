import { useEffect, useState } from "react"
import { intialType, userType } from "../functions/interface_types"
import { getFollowersOfUser, isMutual } from "../functions/backendFunctions"
import { useSelector } from "react-redux"

function FollowersSection({ owner }: { owner: userType }) {

    const userData = useSelector((state: { userData: intialType }) => state.userData)
    const [followers, setFollowers] = useState<userType[]>([]);

    useEffect(() => {
        getFollowersOfUser(owner._id, owner.Name).then(async ({ data }) => {
            let foll = data
            isMutual(
                userData.gitUserData?._id + "",
                data.map((item: userType) => item._id),
                userData.gitUserData?.Name + ""
            ).then(({ data }) => {
                setFollowers(foll.map((item: userType, index: number) => ({ ...item, mutual: data[index] })))
            })
        })
    }, [])

    console.log(owner)
    return (
        <div className="followersSection">
            <div>
                <span>Followers Section</span>
                <span style={{ marginLeft: "150px" }} >Mutual Section</span>
                <span></span>
            </div>
            <div className="followerData">
                {followers.length > 0 && followers.map(item => {
                    return (
                        <div style={{ display: "flex" }}>
                            <div className="">
                                <img src={item.profileImg} className="folowerImg" alt="" />
                            </div>
                            <div className="descriptionFollowers">
                                <h3>{item.Name}</h3>
                                <p>{item.bio}</p>
                            </div>
                            <p className="mutualFriend">{item.mutual ? "mutual friend" : "not mutual"}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FollowersSection
