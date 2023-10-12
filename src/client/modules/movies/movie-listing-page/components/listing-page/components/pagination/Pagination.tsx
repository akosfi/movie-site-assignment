import { FC } from 'react';

import { useSelector } from 'react-redux';
import selectors from 'client/modules/movies/movie-listing-page/redux/selectors';

import css from './Pagination.module.scss';

type PaginationProps = {
    onPageChangeRequested: (newPage: number) => void;
};

const Pagination: FC<PaginationProps> = ({ onPageChangeRequested }) => {
    const totalPages = useSelector(selectors.getTotalPages);
    const currentPage = useSelector(selectors.getPage);

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
