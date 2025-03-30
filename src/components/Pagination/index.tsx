type Props = {
    pagination: {
        page: number;
        total: number;
        totalCount: number;
        totalPages: number;
    };
    onPageChange: (page: number) => void;
};

export default function Pagination({ onPageChange, pagination }: Props) {
    const { page, totalCount, totalPages } = pagination;

    const handlePageClick = (newPage: number) => {
        console.log({ newPage, page, totalCount, totalPages });

        if (newPage >= 1 && newPage <= +totalPages) {
            onPageChange(newPage);
        }
    };
    return (
        <div className="flex items-center justify-between py-4 px-6 bg-gray-50 rounded-md">
            {/* Selected Rows Info */}
            <p className="text-gray-500 text-sm">{`0 of ${totalCount} row(s) selected.`}</p>

            {/* Pagination Controls */}
            <div className="flex space-x-2">
                {/* Important Pagination Buttons */}
                <div className="flex space-x-2">
                    {/* First Page Button */}
                    {page > 1 && (
                        <button className="px-3 py-1 border rounded text-purple-600 border-purple-300 hover:bg-purple-100" onClick={() => handlePageClick(1)}>
                            First
                        </button>
                    )}

                    {/* Second Page Button */}
                    {page > 2 && (
                        <button className="px-3 py-1 border rounded text-purple-600 border-purple-300 hover:bg-purple-100" onClick={() => handlePageClick(2)}>
                            {2}
                        </button>
                    )}

                    {/* Previous Page Button */}
                    {page > 1 && (
                        <button className="px-3 py-1 border rounded text-purple-600 border-purple-300 hover:bg-purple-100" onClick={() => handlePageClick(+page - 1)}>
                            &lt;
                        </button>
                    )}

                    {/* Current Page */}
                    <button className="px-3 py-1 border rounded bg-purple-500 text-white" disabled>
                        {page}
                    </button>

                    {/* Next Page Button */}
                    {page < totalPages && (
                        <button className="px-3 py-1 border rounded text-purple-600 border-purple-300 hover:bg-purple-100" onClick={() => handlePageClick(+page + 1)}>
                            &gt;
                        </button>
                    )}

                    {page < totalPages - 1 && (
                        <button className="px-3 py-1 border rounded text-purple-600 border-purple-300 hover:bg-purple-100" onClick={() => handlePageClick(totalPages - 1)}>
                            {totalPages - 1}
                        </button>
                    )}

                    {/* Last Page Button */}
                    {page < totalPages && (
                        <button className="px-3 py-1 border rounded text-purple-600 border-purple-300 hover:bg-purple-100" onClick={() => handlePageClick(+totalPages)}>
                            Last ({totalPages})
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
