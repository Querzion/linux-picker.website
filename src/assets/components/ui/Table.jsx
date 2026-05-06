import React from "react";
import "../../../styles/components/ui/Tables.css";

const Table = ({
    columns = [],
    data = [],
    className = ""
}) => {
    return (
        <div className={`table-container ${className}`}>
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.header}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="table-empty">
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex}>
                                        {col.render
                                            ? col.render(row)
                                            : row[col.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;