import { memo } from 'react'
import { repoType } from '../functions/interface_types'

function RepoExplain({ data, setSelectedRepo }: { data: repoType, setSelectedRepo: (val: null) => void }) {
    console.log(data)
    return (
        <div className='repoParent'>
            <div className='descriptionGivenDiv'>
                <h3>{data.ownerName} - {data.repoName}</h3>
                <p>Description : {data.description}</p>
                <p>Visiblity : {data.visibility}</p>
                <p>Default Branch : {data.defaultBranch}</p>
                <p>Repositary Url : <span className='repoLink' onClick={() => window.open(data.repoUrl, "_blank")} >{data.repoUrl}</span></p>
                <p>Forked : {data.forked + ""}</p>
            </div>
            <div className='cancelDiv' >
                <button type='button' onClick={() => setSelectedRepo(null)} className='cancelButton'>Cancel</button>
            </div>
        </div>
    )
}

export default memo(RepoExplain)
