import { memo, useState } from 'react'
import { getRepoName } from '../functions/backendFunctions';
import { repoType, userType } from '../functions/interface_types';


function Home() {
    const [repoName, setRepoName] = useState("");
    const [error, setError] = useState("");
    const [repo, setRepo] = useState<repoType[]>([])
    const [searchedUser, setSearchedUser] = useState<userType | null>({
        bio: "MERN developer", followers: 3, id: "136670282", nodeId: "U_kgDOCCVsSg", Name: "Alan Nixon",
        profileImg: "https://avatars.githubusercontent.com/u/136670282?v=4", repoUrl: "https://github.com/Alan-Nixon"
    })

    const submitRepoName = () => {
        if (repoName.trim() !== "") {
            getRepoName(repoName).then((data) => {
                if (data.status) {
                    setSearchedUser(data.data.userRepo)
                    setRepo(data.data.repo ?? [])
                } else {
                    setError(data.message ?? "Error occured while fetching data")
                }
            })
        } else {
            setError("Please enter a valid repositary name")
        }
    }

    return (
        <div>
            <div className="topPortion">
                <h2 className='heading'>Welcome to Git Hub data picker</h2>
                {error && <p style={{ color: "red" }} >{error}</p>}
                <input type="text" onChange={(e) => {
                    setRepoName(e.target.value + "");
                    setError("")
                }} required placeholder='Enter repositary name' style={{ padding: "10px", width: "350px" }} />
                <button type='button' onClick={() => submitRepoName()} style={{ padding: "10px", marginLeft: "10px", color: "blue" }} >Search</button><br />
            </div>

            {searchedUser && <>
                <div className="userCard">
                    <img src={searchedUser.profileImg} className='profileImg' alt="" />
                    <div className="profileDetails">
                        <p>Name : {searchedUser.Name}</p>
                        <p>Bio : {searchedUser.bio}</p>
                        <p>Follower Count : {searchedUser.followers}</p>
                        <p>Total Repo count : {repo.length}</p>
                        <p>Link to repositary : <span className='repoLink' onClick={()=>{
                            window.open(searchedUser.repoUrl,"_blank")
                        }} >{searchedUser.repoUrl}</span> </p>
                    </div>
                </div>
            </>}


            <div className='cardContainer'>
                {repo.length > 0 && repo.map((item, idx) => {
                    return (
                        <div className='cardStyle' key={idx}>
                            <p style={{ fontWeight: "bold" }} >{item.repoName}</p>
                            <p>created by : {item.ownerName}</p>
                            <p>{item.description} </p>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default memo(Home)
