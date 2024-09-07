import { memo, useState } from 'react'
import { deleteRepoGit, editDetails, getRepoName } from '../functions/backendFunctions';
import { editUserType, intialType, repoType, userType } from '../functions/interface_types';
import { useDispatch, useSelector } from 'react-redux';
import RepoExplain from './RepoExplain';
import { setUserRepo, setGitUserData } from '../redux/slice';
import FollowersSection from './FollowersSection';


function Home() {
    const dispatch = useDispatch();
    const userData = useSelector((state: { userData: intialType }) => state.userData)

    const [repoName, setRepoName] = useState("");
    const [error, setError] = useState("");
    const [selectedRepo, setSelectedRepo] = useState<repoType | null>(null)
    const [followers, setFollowers] = useState<userType | null>(null)
    const [editUserData, setEditUserData] = useState<editUserType>({ _id: "", location: "", bio: "", blog: "" })

    const submitRepoName = (repoName:string) => {
        if (repoName.trim() !== "") {
            getRepoName(repoName).then((data) => {
                if (data.status) {
                    dispatch(setGitUserData(data.data.userRepo))
                    dispatch(setUserRepo(data.data.repo))
                    setEditUserData({
                        _id: data.data.userRepo._id + "",
                        location: data.data.userRepo.location + "",
                        bio: data.data.userRepo.bio + "",
                        blog: data.data.userRepo.blog + ""
                    })
                } else {
                    setError(data.message ?? "Error occured while fetching data")
                }
            })
        } else {
            setError("Please enter a valid repositary name")
        }
    }

    const deleteRepo = (userRepoId: string) => {
        deleteRepoGit(userRepoId);
        dispatch(setGitUserData(null))
        dispatch(setUserRepo([]))
        setFollowers(null)
    }

    const changeUserDetails = (key: string, value: string) => {
        setEditUserData((rest) => ({ ...rest, [key]: value }))
    }

    const editUserDetails = async () => {
        const { data } = await editDetails(editUserData)
        dispatch(setGitUserData(data))
    }

    return (
        <div>
            <div className="topPortion">
                <h2 className='heading'>Welcome to Git Hub data picker</h2>
                {error && <p style={{ color: "red" }} >{error}</p>}
                <input type="text" value={repoName} onChange={(e) => {
                    setRepoName(e.target.value + "");
                    setError("")
                }} required placeholder='Enter repositary name' style={{ padding: "10px", width: "350px" }} />
                <button type='button' onClick={() => submitRepoName(repoName)} style={{ padding: "10px", marginLeft: "10px", color: "blue" }} >Search</button><br />
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
                        <p style={{ color: "#551A8B", cursor: "pointer" }} onClick={() => {
                            setFollowers(userData.gitUserData);
                            setTimeout(() => window.scrollTo({
                                top: document.body.scrollHeight,
                                behavior: "smooth"
                            }), 100)
                        }} >Show Followers</p>
                    </div>
                    <div style={{ marginTop: "60px", color: "white", fontWeight: "bolder" }}>
                        Location : <input type="text" onChange={(e) => changeUserDetails("location", e.target.value)} style={{ backgroundColor: "transparent", color: "white" }} defaultValue={userData.gitUserData.location} /><br />
                        Bio : <input type="text" onChange={(e) => changeUserDetails("bio", e.target.value)} style={{ backgroundColor: "transparent", color: "white", marginTop: "10px" }} defaultValue={userData.gitUserData.bio} /><br />
                        Blog : <input type="text" onChange={(e) => changeUserDetails("blog", e.target.value)} style={{ backgroundColor: "transparent", color: "white", marginTop: "10px" }} defaultValue={userData.gitUserData.blog} />
                    </div>
                    <div style={{ marginLeft: "auto", marginRight: "20px", marginTop: "20px" }}>
                        <button className='editButton' onClick={() => editUserDetails()} >Edit User</button>
                        <button className='deleteButton' onClick={() => deleteRepo(userData.gitUserData?._id + "")} >Delete This user</button>
                    </div>
                </div>
            </>}

            {selectedRepo && <RepoExplain data={selectedRepo} setSelectedRepo={setSelectedRepo} />}

            <div className='cardContainer'>
                {userData.repo.length > 0 && userData.repo.map((item, idx) => {
                    return (
                        <div className='cardStyle' key={idx} onClick={() => setSelectedRepo(item)} >
                            <div style={{ display: "flex" }}>
                                <div style={{ margin: "10px" }}>
                                    <img src={userData?.gitUserData?.profileImg + ""} alt="" style={{ width: "75px", borderRadius: "100%" }} />
                                </div>
                                <div style={{ marginLeft: "10px" }}>
                                    <div className="" style={{ display: "flex" }} >
                                        <p style={{ fontWeight: "bold" }} >{item.repoName} </p>
                                        <img style={{ width: "20px", height: "20px", marginTop: "15px", marginLeft: "5px" }} src="/check.png" alt="" />
                                    </div>
                                    <p>created by : {item.ownerName}</p>
                                    <p>{item.description} </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {followers && <FollowersSection owner={followers} setGitUser={submitRepoName} setName={setRepoName}  />}

        </div>
    )
}

export default memo(Home)
