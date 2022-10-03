import React, {FC} from 'react'
import Pagination from '../Common/Pagination/Pagination'
import User from './User'
import {UsersType} from "../../types/types";

type PropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UsersType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}


const Users: FC<PropsType> = ({
                                  currentPage,
                                  totalUsersCount,
                                  pageSize,
                                  onPageChanged,
                                  users,
                                  followingInProgress,
                                  follow,
                                  unfollow,
                                  ...Props
                              }) => {

    return <div>
        <div>
            <Pagination currentPage={currentPage} totalItemsCount={totalUsersCount} pageSize={pageSize}
                        onPageChanged={onPageChanged}/>

            {
                users.map(u => <User user={u}
                                     followingInProgress={followingInProgress}
                                     unfollow={unfollow}
                                     follow={follow}
                                     key={u.id}/>)
            }
        </div>
    </div>
};

export default Users;