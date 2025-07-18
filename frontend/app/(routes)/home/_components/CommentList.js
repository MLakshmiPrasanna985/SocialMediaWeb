import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { MoreVertical, Trash } from 'lucide-react';
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useToast } from '@/hooks/use-toast';

function CommentList({ commentList,userDetail,updatePostList}) {
    console.log(userDetail)
    const {toast}=useToast();
    const {commentListData,setCommentListData}=useState(commentList)
    const onDeleteComment=(comment)=>{
        const result=commentListData.filter(item=>item._id!=comment._id)
        setCommentListData(result)
        GlobalApi.deleteComment(comment._id).then(resp=>{
            if(resp){
                toast({
                    title:'Deleted',
                    description:'Comment deleted successfully'
                })
            }
        })
        updatePostList()
        

    }
    return (
        <div>
            {commentListData.map((item, index) => (
                <div
                    className='flex p-3 border items-center justify-between rounded-lg m-2'>
                    <div className='flex items-center gap-3 w-full'>
                        <Image
                            src={item?.createdBy?.image}
                            alt='user-image'
                            width={30}
                            height={30}
                            className='rounded-full'
                        />
                        <h2 className='bg-slate-100 p-2 rounded-lg'>
                            {item?.commentText}
                        </h2>
                    </div>

                    {/* Show options only if the comment belongs to the current user */}
                    {item.createdBy?._id === userDetail?._id && (
                        <Popover>
                            <PopoverTrigger>
                                <MoreVertical className='h-5 w-5 cursor-pointer' />
                            </PopoverTrigger>
                            <PopoverContent className='p-2'>
                                <Button className='w-full flex gap-2' variant="outline" onClick={()=>onDeleteComment(item)}><Trash/>
                                    Delete
                                </Button>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            ))}
        </div>
    );
}

export default CommentList;