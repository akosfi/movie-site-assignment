import { FC } from 'react';

import css from './Pagination.module.scss';
import useMoviesContext from 'modules/movies/context/useMoviesContext';

type PaginationProps = {
    onPageChangeRequested: (newPage: number) => void;
};

const Pagination: FC<PaginationProps> = ({ onPageChangeRequested }) => {
    const { totalPages, page: currentPage } = useMoviesContext();

    return (
        <div className={css['pagination']}>
            {Array(totalPages)
                .fill(0)
                .map((_, i) => i + 1)
                .map((page) => {
                    if (page === currentPage) {
                        return (
                            <span key={page} className={css['page']}>
                                <b>{page}</b>
                            </span>
                        );
                    }

                    return (
                        <span
                            onClick={() => onPageChangeRequested(page)}
                            className={css['page']}
                            key={page}
                        >
                            {page}
                        </span>
                    );
                })}
        </div>
    );
};

export default Pagination;
