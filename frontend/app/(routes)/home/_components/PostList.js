import GlobalApi from '@/app/_utils/GlobalApi';
import React from 'react'
import PostItem from './Postitem';

function PostList(postList) {
    
  return (
    <div>
        {postList?postList.map((item,index)=>(
            <div key={index}>
                <PostItem post={item} updatePostList={()=>updatePostList()}/>
            </div>
        ))
            :<div>
            {[1,2,3].map((item,index)=>{
                <div className='h-[200px w-full bg-slate-200 animate-pulse my-5 rounded-lg'>

                </div>
            })}    
            </div>
        }  
    </div> 
  )
}

export default PostList