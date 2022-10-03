import React, {useState} from 'react';
import styles from './Pagination.module.css'
import {UsersType} from "../../../types/types";

type PropsType = {
    currentPage: number,
    totalItemsCount: number,
    pageSize: number,
    onPageChanged: (pageNumber: number) => void,
    users?: Array<UsersType>
    portionSize?: number

}


const Pagination: React.FC<PropsType> = ({
                                             currentPage,
                                             totalItemsCount,
                                             pageSize,
                                             onPageChanged,
                                             portionSize = 10, ...props
                                         }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages: Array<number> = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1);


    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


    return <div className={styles.paginator}>


        <button disabled={portionNumber === 1} onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}> Prev
        </button>


        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span className={currentPage === p && styles.selectedPage}
                             onClick={() => {
                                 onPageChanged(p)
                             }}> {p} </span>

            })}

        {portionCount > portionNumber &&
        <button onClick={() => {
            setPortionNumber(portionNumber += 1)
        }}> Next </button>}


    </div>
};

export default Pagination;