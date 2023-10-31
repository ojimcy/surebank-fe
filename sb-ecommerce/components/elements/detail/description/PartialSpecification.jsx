import React from 'react';

export default function PartialSpecification({ product }) {
    return (
        <div className="table-responsive">
            <table className="table table-bordered ps-table ps-table--specification">
                <tbody>
                    {product.specifications.map((s) => (
                        <tr key={s._id}>
                            <td>{s.name}</td>
                            <td>{s.values.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
