import React from 'react';

const mockData = [
	{
		type: 'Insignia™(746)',
		checked: false,
	},
	{
		type: 'Samsung(633)',
		checked: false,
	},
	{
		type: 'Metra(591)',
		checked: false,
	},
	{
		type: 'HP(530)',
		checked: false,
	},
	{
		type: 'Apple(442)',
		checked: true,
	},
];

function FilterBrand() {
	const mapListBrand = (data) => {
		return data.map((dataItem, index) => {
			return (
				<div className='block-brand__list' key={index}>
					<input
						className='mr-2'
						type='checkbox'
						defaultChecked={dataItem.checked}
					/>
					{dataItem.type}
				</div>
			);
		});
	};

	return <div className='block-brand'>{mapListBrand(mockData)}</div>;
}

export default FilterBrand;
