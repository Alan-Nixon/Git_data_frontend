import { memo, useState } from 'react'
import { getRepoName } from '../functions/backendFunctions';
import { intialType, repoType, userType } from '../functions/interface_types';
import { useDispatch, useSelector } from 'react-redux';
import RepoExplain from './RepoExplain';
import { setUserRepo, setGitUserData } from '../redux/slice';
import FollowersSection from './FollowersSection';


function Home() {
    const [repoName, setRepoName] = useState("");
    const [error, setError] = useState("");
    const [selectedRepo, setSelectedRepo] = useState<repoType | null>(null)
    const [followers, setFollowers] = useState<userType | null>(null)

    const dispatch = useDispatch();
    const userData = useSelector((state: { userData: intialType }) => state.userData)

    const submitRepoName = () => {
        if (repoName.trim() !== "") {
            getRepoName(repoName).then((data) => {
                if (data.status) {
                    dispatch(setGitUserData(data.data.userRepo))
                    dispatch(setUserRepo(data.data.repo))
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

            {userData.gitUserData && <>
                <div className="userCard">
                    <img src={userData.gitUserData.profileImg} className='profileImg' alt="" />
                    <div className="profileDetails">
                        <p>Name : {userData.gitUserData.Name}</p>
                        <p>Bio : {userData.gitUserData.bio}</p>
                        <p>Follower Count : {userData.gitUserData.followers}</p>
                        <p>Total Repo count : {userData.repo.length}</p>
                        <p>
                            Link to repositary : <span className='repoLink' onClick={() => {
                                window.open(userData.gitUserData?.repoUrl, "_blank")
                            }} >{userData.gitUserData.repoUrl}</span>
                        </p>
                        <p style={{ color: "#551A8B", cursor: "pointer" }} onClick={() => setFollowers(userData.gitUserData)} >Show Followers</p>
                    </div>
                </div>
            </>}

            {selectedRepo && <RepoExplain data={selectedRepo} setSelectedRepo={setSelectedRepo} />}

            <div className='cardContainer'>
                {userData.repo.length > 0 && userData.repo.map((item, idx) => {
                    return (
                        <div className='cardStyle' key={idx} onClick={() => setSelectedRepo(item)} >
                            <p style={{ fontWeight: "bold" }} >{item.repoName}</p>
                            <p>created by : {item.ownerName}</p>
                            <p>{item.description} </p>
                        </div>
                    )
                })}
            </div>

            {followers && <FollowersSection owner={followers} />}

        </div>
    )
}

export default memo(Home)
